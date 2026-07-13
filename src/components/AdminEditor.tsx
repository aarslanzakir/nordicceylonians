"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Photo, Grid, Book, Quote, Mail, Inbox } from "./icons";
import EnquiriesPanel from "./EnquiriesPanel";
import type { SiteContent, Service, Program, Story, Stat } from "@/lib/content";

type SectionId =
  | "enquiries"
  | "hero"
  | "images"
  | "services"
  | "programs"
  | "stories"
  | "contact";

const SECTIONS: { id: SectionId; label: string; Icon: typeof Home }[] = [
  { id: "hero", label: "Hero", Icon: Home },
  { id: "images", label: "Images", Icon: Photo },
  { id: "services", label: "Services", Icon: Grid },
  { id: "programs", label: "Programs", Icon: Book },
  { id: "stories", label: "Client Stories", Icon: Quote },
  { id: "contact", label: "Contact", Icon: Mail },
  { id: "enquiries", label: "Enquiries", Icon: Inbox },
];

/* ---------- Image uploader ---------- */
function ImageUploader({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.ok && data.url) onChange(data.url);
    else setErr(data.error || "Upload failed");
  }

  return (
    <div className="img-field">
      <label>{label}</label>
      <div className="img-box">
        <div className="img-preview">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="preview" />
          ) : null}
        </div>
        <div className="img-controls">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={pick}
          />
          <button
            type="button"
            className="mini"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
          >
            {busy ? "Uploading…" : "Upload image"}
          </button>
          <input
            type="text"
            placeholder="…or paste an image URL"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
              border: "1px solid var(--line)",
              borderRadius: 8,
              padding: "8px 10px",
              fontSize: 13,
              minWidth: 220,
            }}
          />
          {err && <span className="toast err">{err}</span>}
          <span className="img-hint">JPG, PNG, WEBP · up to 5 MB</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminEditor({ initial }: { initial: SiteContent }) {
  const router = useRouter();
  const [c, setC] = useState<SiteContent>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");
  const [active, setActive] = useState<SectionId>("hero");
  const [navOpen, setNavOpen] = useState(false);

  // ---- helpers ----
  function setHero<K extends keyof SiteContent["hero"]>(key: K, val: SiteContent["hero"][K]) {
    setC({ ...c, hero: { ...c.hero, [key]: val } });
  }
  function setStat(i: number, key: keyof Stat, val: string) {
    setC({ ...c, hero: { ...c.hero, stats: c.hero.stats.map((s, idx) => (idx === i ? { ...s, [key]: val } : s)) } });
  }
  function setContact(key: "email" | "office", val: string) {
    setC({ ...c, contact: { ...c.contact, [key]: val } });
  }
  function setPhone(i: number, val: string) {
    setC({ ...c, contact: { ...c.contact, phone: c.contact.phone.map((p, idx) => (idx === i ? val : p)) } });
  }
  function setImage(key: "hero" | "why", url: string) {
    setC({ ...c, images: { ...c.images, [key]: url } });
  }
  function updateList<T>(list: T[], i: number, key: keyof T, val: string): T[] {
    return list.map((item, idx) => (idx === i ? { ...item, [key]: val } : item));
  }

  const emptyService: Service = { title: "", text: "", tagline: "", details: "", features: [] };

  // ---- service-specific helpers ----
  function setService<K extends keyof Service>(i: number, key: K, val: Service[K]) {
    setC({ ...c, services: c.services.map((s, idx) => (idx === i ? { ...s, [key]: val } : s)) });
  }
  function setFeature(si: number, fi: number, val: string) {
    setC({
      ...c,
      services: c.services.map((s, idx) =>
        idx === si ? { ...s, features: (s.features ?? []).map((f, j) => (j === fi ? val : f)) } : s
      ),
    });
  }
  function addFeature(si: number) {
    setC({
      ...c,
      services: c.services.map((s, idx) =>
        idx === si ? { ...s, features: [...(s.features ?? []), ""] } : s
      ),
    });
  }
  function removeFeature(si: number, fi: number) {
    setC({
      ...c,
      services: c.services.map((s, idx) =>
        idx === si ? { ...s, features: (s.features ?? []).filter((_, j) => j !== fi) } : s
      ),
    });
  }
  const emptyProgram: Program = { tag: "", title: "", text: "", duration: "", intake: "" };
  const emptyStory: Story = { initial: "", name: "", role: "", quote: "" };

  async function save() {
    setStatus("saving");
    const res = await fetch("/api/admin/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(c),
    });
    setStatus(res.ok ? "ok" : "err");
    if (res.ok) setTimeout(() => setStatus("idle"), 2500);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function go(id: SectionId) {
    setActive(id);
    setNavOpen(false);
  }

  const activeLabel = SECTIONS.find((s) => s.id === active)?.label ?? "";

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={navOpen ? "admin-sidebar open" : "admin-sidebar"}>
        <div className="side-brand">
          <span className="side-logo-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Nordic Ceylonians" />
          </span>
          <span className="side-tag">Admin Panel</span>
        </div>
        <nav className="side-nav">
          {SECTIONS.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={active === id ? "active" : ""}
              onClick={() => go(id)}
            >
              <Icon />
              {label}
            </button>
          ))}
        </nav>
        <div className="side-foot">
          <a className="view" href="/" target="_blank">
            View site ↗
          </a>
          <button className="out" onClick={logout}>
            Log out
          </button>
        </div>
      </aside>
      <div
        className={navOpen ? "admin-backdrop show" : "admin-backdrop"}
        onClick={() => setNavOpen(false)}
      />

      {/* Content */}
      <div className="admin-content">
        <div className="admin-topbar">
          <button
            className="tb-burger"
            aria-label="Open menu"
            onClick={() => setNavOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
          <span className="tb-title">{activeLabel}</span>
        </div>

        <div className="admin-body">
          <h1>{active === "enquiries" ? "Consultation Enquiries" : "Manage your content"}</h1>
          <p className="admin-lead">
            {active === "enquiries" ? (
              <>Messages sent through your website&apos;s contact form appear here.</>
            ) : (
              <>
                Edit the <b>{activeLabel}</b> section, then press <b>Save changes</b>.
                Your website updates instantly.
              </>
            )}
          </p>

          {/* ENQUIRIES */}
          {active === "enquiries" && <EnquiriesPanel />}

          {/* HERO */}
          {active === "hero" && (
            <div className="panel">
              <h2>Homepage Hero</h2>
              <div className="a-field">
                <label>Small label (eyebrow)</label>
                <input value={c.hero.eyebrow} onChange={(e) => setHero("eyebrow", e.target.value)} />
              </div>
              <div className="grid2">
                <div className="a-field">
                  <label>Headline — first part</label>
                  <input value={c.hero.titleLead} onChange={(e) => setHero("titleLead", e.target.value)} />
                </div>
                <div className="a-field">
                  <label>Headline — highlighted part</label>
                  <input value={c.hero.titleHighlight} onChange={(e) => setHero("titleHighlight", e.target.value)} />
                </div>
              </div>
              <div className="a-field">
                <label>Subtext</label>
                <textarea value={c.hero.lead} onChange={(e) => setHero("lead", e.target.value)} />
              </div>
              <div className="item-head">
                <b>Stats</b>
              </div>
              {c.hero.stats.map((s, i) => (
                <div className="grid2" key={i}>
                  <div className="a-field">
                    <label>Value</label>
                    <input value={s.value} onChange={(e) => setStat(i, "value", e.target.value)} />
                  </div>
                  <div className="a-field">
                    <label>Label</label>
                    <input value={s.label} onChange={(e) => setStat(i, "label", e.target.value)} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* IMAGES */}
          {active === "images" && (
            <div className="panel">
              <h2>Website Images</h2>
              <ImageUploader
                label="Hero photo (top of homepage)"
                value={c.images.hero}
                onChange={(url) => setImage("hero", url)}
              />
              <ImageUploader
                label="Why-Us photo (Our Story section)"
                value={c.images.why}
                onChange={(url) => setImage("why", url)}
              />
            </div>
          )}

          {/* SERVICES */}
          {active === "services" && (
            <div className="panel">
              <div className="panel-head">
                <h2>Services</h2>
                <button className="mini add" onClick={() => setC({ ...c, services: [...c.services, emptyService] })}>
                  + Add service
                </button>
              </div>
              <p className="admin-lead" style={{ marginBottom: 18 }}>
                Each service has its own detail page. The <b>card text</b> shows on
                the homepage; the <b>tagline</b>, <b>full description</b> and{" "}
                <b>what&rsquo;s included</b> list show on the service&rsquo;s page.
              </p>
              {c.services.map((s, i) => {
                const slug = (s.slug && s.slug.trim() ? s.slug : s.title)
                  .toLowerCase()
                  .trim()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "");
                return (
                  <div className="item-card" key={i}>
                    <div className="item-head">
                      <b>Service {i + 1}</b>
                      <button className="mini danger" onClick={() => setC({ ...c, services: c.services.filter((_, idx) => idx !== i) })}>
                        Remove
                      </button>
                    </div>
                    <div className="a-field">
                      <label>Title</label>
                      <input value={s.title} onChange={(e) => setService(i, "title", e.target.value)} />
                    </div>
                    <div className="a-field">
                      <label>Tagline (short line under the title on the detail page)</label>
                      <input value={s.tagline ?? ""} onChange={(e) => setService(i, "tagline", e.target.value)} />
                    </div>
                    <div className="a-field">
                      <label>Card text (short summary on the homepage)</label>
                      <textarea value={s.text} onChange={(e) => setService(i, "text", e.target.value)} />
                    </div>
                    <div className="a-field">
                      <label>Full description (detail page — blank line = new paragraph)</label>
                      <textarea
                        style={{ minHeight: 130 }}
                        value={s.details ?? ""}
                        onChange={(e) => setService(i, "details", e.target.value)}
                      />
                    </div>
                    <div className="item-head" style={{ marginTop: 6 }}>
                      <b>What&rsquo;s included</b>
                    </div>
                    {(s.features ?? []).map((f, fi) => (
                      <div className="row-flex" key={fi}>
                        <input value={f} onChange={(e) => setFeature(i, fi, e.target.value)} placeholder="e.g. Document preparation and review" />
                        <button className="mini danger" onClick={() => removeFeature(i, fi)}>
                          Remove
                        </button>
                      </div>
                    ))}
                    <button className="mini" onClick={() => addFeature(i)}>
                      + Add item
                    </button>
                    <div className="a-field" style={{ marginTop: 16 }}>
                      <label>Page URL (slug) — leave blank to use the title automatically</label>
                      <input value={s.slug ?? ""} onChange={(e) => setService(i, "slug", e.target.value)} placeholder={slug} />
                      <span className="img-hint">Detail page: /services/{slug || "…"}</span>
                    </div>
                  </div>
                );
              })}
              <button className="mini" onClick={() => setC({ ...c, services: [...c.services, emptyService] })}>
                + Add service
              </button>
            </div>
          )}

          {/* PROGRAMS */}
          {active === "programs" && (
            <div className="panel">
              <div className="panel-head">
                <h2>Programs</h2>
                <button className="mini add" onClick={() => setC({ ...c, programs: [...c.programs, emptyProgram] })}>
                  + Add program
                </button>
              </div>
              {c.programs.map((p, i) => (
                <div className="item-card" key={i}>
                  <div className="item-head">
                    <b>Program {i + 1}</b>
                    <button className="mini danger" onClick={() => setC({ ...c, programs: c.programs.filter((_, idx) => idx !== i) })}>
                      Remove
                    </button>
                  </div>
                  <div className="grid2">
                    <div className="a-field">
                      <label>Tag</label>
                      <input value={p.tag} onChange={(e) => setC({ ...c, programs: updateList(c.programs, i, "tag", e.target.value) })} />
                    </div>
                    <div className="a-field">
                      <label>Title</label>
                      <input value={p.title} onChange={(e) => setC({ ...c, programs: updateList(c.programs, i, "title", e.target.value) })} />
                    </div>
                  </div>
                  <div className="a-field">
                    <label>Description</label>
                    <textarea value={p.text} onChange={(e) => setC({ ...c, programs: updateList(c.programs, i, "text", e.target.value) })} />
                  </div>
                  <div className="grid2">
                    <div className="a-field">
                      <label>Duration</label>
                      <input value={p.duration} onChange={(e) => setC({ ...c, programs: updateList(c.programs, i, "duration", e.target.value) })} />
                    </div>
                    <div className="a-field">
                      <label>Intake</label>
                      <input value={p.intake} onChange={(e) => setC({ ...c, programs: updateList(c.programs, i, "intake", e.target.value) })} />
                    </div>
                  </div>
                </div>
              ))}
              <button className="mini" onClick={() => setC({ ...c, programs: [...c.programs, emptyProgram] })}>
                + Add program
              </button>
            </div>
          )}

          {/* STORIES */}
          {active === "stories" && (
            <div className="panel">
              <div className="panel-head">
                <h2>Client Stories</h2>
                <button className="mini add" onClick={() => setC({ ...c, stories: [...c.stories, emptyStory] })}>
                  + Add story
                </button>
              </div>
              {c.stories.map((s, i) => (
                <div className="item-card" key={i}>
                  <div className="item-head">
                    <b>Story {i + 1}</b>
                    <button className="mini danger" onClick={() => setC({ ...c, stories: c.stories.filter((_, idx) => idx !== i) })}>
                      Remove
                    </button>
                  </div>
                  <div className="grid2">
                    <div className="a-field">
                      <label>Initial (1 letter)</label>
                      <input maxLength={2} value={s.initial} onChange={(e) => setC({ ...c, stories: updateList(c.stories, i, "initial", e.target.value) })} />
                    </div>
                    <div className="a-field">
                      <label>Name</label>
                      <input value={s.name} onChange={(e) => setC({ ...c, stories: updateList(c.stories, i, "name", e.target.value) })} />
                    </div>
                  </div>
                  <div className="a-field">
                    <label>Role / Program</label>
                    <input value={s.role} onChange={(e) => setC({ ...c, stories: updateList(c.stories, i, "role", e.target.value) })} />
                  </div>
                  <div className="a-field">
                    <label>Quote</label>
                    <textarea value={s.quote} onChange={(e) => setC({ ...c, stories: updateList(c.stories, i, "quote", e.target.value) })} />
                  </div>
                </div>
              ))}
              <button className="mini" onClick={() => setC({ ...c, stories: [...c.stories, emptyStory] })}>
                + Add story
              </button>
            </div>
          )}

          {/* CONTACT */}
          {active === "contact" && (
            <div className="panel">
              <h2>Contact Details</h2>
              <div className="a-field">
                <label>Email</label>
                <input value={c.contact.email} onChange={(e) => setContact("email", e.target.value)} />
              </div>
              <div className="item-head">
                <b>Phone / WhatsApp numbers</b>
              </div>
              {c.contact.phone.map((p, i) => (
                <div className="row-flex" key={i}>
                  <input value={p} onChange={(e) => setPhone(i, e.target.value)} placeholder="+358 …" />
                  <button className="mini danger" onClick={() => setC({ ...c, contact: { ...c.contact, phone: c.contact.phone.filter((_, idx) => idx !== i) } })}>
                    Remove
                  </button>
                </div>
              ))}
              <button className="mini" onClick={() => setC({ ...c, contact: { ...c.contact, phone: [...c.contact.phone, ""] } })}>
                + Add phone
              </button>
              <div className="a-field" style={{ marginTop: 18 }}>
                <label>Office address</label>
                <textarea value={c.contact.office} onChange={(e) => setContact("office", e.target.value)} />
              </div>
            </div>
          )}
        </div>

        {active !== "enquiries" && (
          <div className="savebar">
            <div className="inner">
              <span className={status === "ok" ? "toast ok" : status === "err" ? "toast err" : "toast"}>
                {status === "ok" && "✓ Saved! Your website is updated."}
                {status === "err" && "Something went wrong. Try again."}
                {status === "saving" && "Saving…"}
                {status === "idle" && " "}
              </span>
              <button className="btn btn-gold" onClick={save} disabled={status === "saving"}>
                {status === "saving" ? "Saving…" : "Save changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
