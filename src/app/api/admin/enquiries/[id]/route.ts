import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { setEnquiryRead, deleteEnquiry } from "@/lib/enquiries";

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  await setEnquiryRead(id, !!body.read);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  await deleteEnquiry(id);
  return NextResponse.json({ ok: true });
}
