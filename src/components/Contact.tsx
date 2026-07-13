"use client";

import { useState } from "react";
import { Mail, Phone, Pin, Arrow } from "./icons";
import type { Contact as ContactType } from "@/lib/content";

export default function Contact({ contact }: { contact: ContactType }) {
  const [form, setForm] = useState({ name: "", email: "", interest: "", message: "", company: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  function set<K extends keyof typeof form>(key: K, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", interest: "", message: "", company: "" });
      } else {
        setStatus("error");
        setError(data.error || "Could not send. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <section className="sec" id="contact">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Get in touch</span>
          <h2>Let&apos;s plan your future together</h2>
        </div>
        <div className="contact">
          <div className="reveal">
            <div className="ci">
              <span className="ci-ico">
                <Mail />
              </span>
              <div>
                <b>Email</b>
                <span>{contact.email}</span>
              </div>
            </div>
            <div className="ci">
              <span className="ci-ico">
                <Phone />
              </span>
              <div>
                <b>Phone / WhatsApp</b>
                {contact.phone.map((p) => (
                  <span key={p} style={{ display: "block" }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div className="ci">
              <span className="ci-ico">
                <Pin />
              </span>
              <div>
                <b>Office</b>
                <span>{contact.office}</span>
              </div>
            </div>
          </div>

          <form className="form reveal" onSubmit={submit}>
            <div className="row">
              <div className="field">
                <label>Full name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  required
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label>Interested in</label>
              <input
                type="text"
                placeholder="e.g. Nursing Top-Up, MBA…"
                value={form.interest}
                onChange={(e) => set("interest", e.target.value)}
              />
            </div>
            <div className="field">
              <label>Message</label>
              <textarea
                placeholder="Tell us about your goals…"
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
              />
            </div>
            {/* Honeypot — hidden from real users, catches bots */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={form.company}
              onChange={(e) => set("company", e.target.value)}
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              aria-hidden="true"
            />
            {status === "error" && (
              <p style={{ color: "#c0392b", fontSize: 13, marginBottom: 12 }}>{error}</p>
            )}
            {status === "sent" ? (
              <p
                style={{
                  background: "rgba(30,143,78,.1)",
                  color: "#1e8f4e",
                  fontWeight: 600,
                  fontSize: 14,
                  padding: "14px 16px",
                  borderRadius: 12,
                  textAlign: "center",
                }}
              >
                ✓ Thank you — we&apos;ve received your enquiry and will be in touch soon!
              </p>
            ) : (
              <button
                className="btn btn-gold"
                style={{ width: "100%", justifyContent: "center" }}
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send Enquiry"}
                {status !== "sending" && <Arrow />}
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
