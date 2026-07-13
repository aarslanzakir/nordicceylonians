import "server-only";
import { cookies } from "next/headers";

export const AUTH_COOKIE = "nc_auth";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "nordic2026";
export const AUTH_SECRET = process.env.ADMIN_SECRET || "nc-admin-session-secret";

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return store.get(AUTH_COOKIE)?.value === AUTH_SECRET;
}
