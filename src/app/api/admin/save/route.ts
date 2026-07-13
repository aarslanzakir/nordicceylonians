import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/auth";
import { saveContent, type SiteContent } from "@/lib/content";

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let data: SiteContent;
  try {
    data = (await req.json()) as SiteContent;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid data" }, { status: 400 });
  }

  try {
    await saveContent(data);
  } catch (err) {
    console.error("save: failed to write content —", err);
    return NextResponse.json(
      { ok: false, error: "Could not save to the database. Please try again." },
      { status: 500 }
    );
  }

  revalidatePath("/");
  revalidatePath("/services/[slug]", "page");
  return NextResponse.json({ ok: true });
}
