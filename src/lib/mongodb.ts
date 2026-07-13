import "server-only";
import dns from "node:dns";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

// `mongodb+srv://` needs a DNS SRV lookup. On some machines (notably Windows
// with an IPv6 link-local resolver like fe80::1) Node's resolver refuses the
// SRV query with `querySrv ECONNREFUSED`, which makes every write to Atlas
// fail. Point the resolver at reliable public DNS servers so the SRV lookup
// succeeds. Override with DNS_SERVERS="1.2.3.4,5.6.7.8" if needed.
if (uri.startsWith("mongodb+srv://")) {
  const servers = (process.env.DNS_SERVERS || "8.8.8.8,1.1.1.1")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  // Keep any system resolvers that are actually usable, but drop link-local
  // IPv6 entries (e.g. "fe80::1") that have no scope id — those make
  // dns.setServers throw and, worse, refuse the SRV lookup at runtime.
  const existing = dns
    .getServers()
    .filter((s) => !/^fe80:/i.test(s) && !s.startsWith("::"));
  try {
    dns.setServers([...new Set([...servers, ...existing])]);
  } catch {
    // As a last resort, use just the reliable public resolvers.
    try {
      dns.setServers(servers);
    } catch {
      // Give up and fall back to system defaults.
    }
  }
}

// Reuse the client across hot-reloads in dev and across invocations in prod.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function connect(): Promise<MongoClient> {
  const promise = new MongoClient(uri as string).connect();
  // Don't cache a rejected promise forever — if the first connect fails
  // (e.g. transient DNS/network error) clear the cache so the next request
  // retries instead of being stuck on the original failure.
  promise.catch(() => {
    if (globalForMongo._mongoClientPromise === promise) {
      globalForMongo._mongoClientPromise = undefined;
    }
  });
  return promise;
}

// A function keeps each caller resilient: a cleared cache triggers a fresh
// connection attempt on the next database operation.
const clientPromise: Promise<MongoClient> = new Proxy({} as Promise<MongoClient>, {
  get(_t, prop) {
    const p = (globalForMongo._mongoClientPromise ??= connect());
    const val = p[prop as keyof Promise<MongoClient>];
    return typeof val === "function" ? val.bind(p) : val;
  },
}) as Promise<MongoClient>;

export default clientPromise;
