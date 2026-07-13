import { getImage } from "@/lib/images";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const img = await getImage(id);
  if (!img) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(new Uint8Array(img.buffer), {
    headers: {
      "Content-Type": img.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
