import "server-only";
import { promises as fs } from "fs";
import path from "path";
import clientPromise from "./mongodb";

export type Stat = { value: string; label: string };
export type Hero = {
  eyebrow: string;
  titleLead: string;
  titleHighlight: string;
  lead: string;
  stats: Stat[];
};
export type Service = {
  title: string;
  text: string;
  // Optional rich fields powering the per-service detail page. Older documents
  // may not have these, so every consumer must treat them as optional.
  slug?: string;
  tagline?: string;
  details?: string;
  features?: string[];
};
export type Program = {
  tag: string;
  title: string;
  text: string;
  duration: string;
  intake: string;
};
export type Story = {
  initial: string;
  name: string;
  role: string;
  quote: string;
};
export type Contact = { email: string; phone: string[]; office: string };
export type Images = { hero: string; why: string };

export type SiteContent = {
  hero: Hero;
  services: Service[];
  programs: Program[];
  stories: Story[];
  contact: Contact;
  images: Images;
};

const DEFAULT_IMAGES: Images = {
  hero: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  why: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
};

const DOC_ID = "site";
const COLLECTION = "content";
const SEED_PATH = path.join(process.cwd(), "src", "content", "site.json");

async function getCollection() {
  const client = await clientPromise;
  // db name comes from the connection string (…/nordic)
  return client.db().collection<{ _id: string } & SiteContent>(COLLECTION);
}

async function readSeed(): Promise<SiteContent> {
  const raw = await fs.readFile(SEED_PATH, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

// Older documents stored `phone` as a single string; coerce to an array so
// the UI can always map over it.
function normalize(content: SiteContent): SiteContent {
  const phone = content.contact?.phone;
  if (!Array.isArray(phone)) {
    content.contact.phone = phone ? [phone as unknown as string] : [];
  }
  if (!content.images) {
    content.images = { ...DEFAULT_IMAGES };
  } else {
    content.images = { ...DEFAULT_IMAGES, ...content.images };
  }
  // Ensure the optional service fields always exist so the UI can rely on them.
  if (Array.isArray(content.services)) {
    content.services = content.services.map((s) => ({
      ...s,
      features: Array.isArray(s.features) ? s.features : [],
    }));
  }
  return content;
}

export async function getContent(): Promise<SiteContent> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ _id: DOC_ID });
    if (doc) {
      const { _id, ...content } = doc;
      void _id;
      return normalize(content as SiteContent);
    }
    // First run: seed the database from the default JSON.
    const seed = await readSeed();
    await col.updateOne(
      { _id: DOC_ID },
      { $set: { ...seed } },
      { upsert: true }
    );
    return seed;
  } catch (err) {
    // If the database is unreachable, fall back to the bundled defaults
    // so the public site still renders.
    console.error("getContent: falling back to seed —", err);
    return readSeed();
  }
}

export async function saveContent(data: SiteContent): Promise<void> {
  const col = await getCollection();
  await col.updateOne({ _id: DOC_ID }, { $set: { ...data } }, { upsert: true });
}
