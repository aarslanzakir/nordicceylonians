import { NextResponse } from "next/server";
import { saveEnquiry } from "@/lib/enquiries";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Silently accept bots.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const interest = String(body.interest ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name and email." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (name.length > 200 || email.length > 200 || interest.length > 300 || message.length > 5000) {
    return NextResponse.json({ ok: false, error: "Message too long." }, { status: 400 });
  }

  try {
    await saveEnquiry({ name, email, interest, message });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("saveEnquiry failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send right now. Please try again." },
      { status: 500 }
    );
  }
}
