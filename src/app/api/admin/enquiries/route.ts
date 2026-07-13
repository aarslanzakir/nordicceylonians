import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { listEnquiries } from "@/lib/enquiries";

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const enquiries = await listEnquiries();
    return NextResponse.json({ ok: true, enquiries });
  } catch (err) {
    console.error("listEnquiries failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not load enquiries (database offline?)." },
      { status: 500 }
    );
  }
}
