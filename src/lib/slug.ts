// Shared slug helper — safe to import from both server and client components.
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// The slug a service is reachable at: an explicit slug wins, otherwise it is
// derived from the title.
export function serviceSlug(s: { slug?: string; title: string }): string {
  return (s.slug && s.slug.trim()) ? slugify(s.slug) : slugify(s.title);
}
