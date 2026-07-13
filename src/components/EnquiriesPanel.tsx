"use client";

import { useEffect, useState } from "react";
import { Trash } from "./icons";

type Enquiry = {
  id: string;
  name: string;
  email: string;
  interest: string;
  message: string;
  createdAt: string;
  read: boolean;
};

function fmt(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function EnquiriesPanel() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");

  async function load() {
    setState("loading");
    try {
      const res = await fetch("/api/admin/enquiries", { cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setItems(data.enquiries);
        setState("ready");
      } else {
        setError(data.error || "Could not load enquiries.");
        setState("error");
      }
    } catch {
      setError("Network error while loading enquiries.");
      setState("error");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRead(e: Enquiry) {
    setItems((list) => list.map((x) => (x.id === e.id ? { ...x, read: !x.read } : x)));
    await fetch(`/api/admin/enquiries/${e.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !e.read }),
    });
  }

  async function remove(e: Enquiry) {
    if (!confirm(`Delete the enquiry from ${e.name}? This cannot be undone.`)) return;
    setItems((list) => list.filter((x) => x.id !== e.id));
    await fetch(`/api/admin/enquiries/${e.id}`, { method: "DELETE" });
  }

  const unread = items.filter((i) => !i.read).length;

  return (
    <div className="panel">
      <h2>
        Enquiries {unread > 0 && <span className="eq-badge">{unread} new</span>}
      </h2>

      {state === "loading" && <p className="admin-lead">Loading enquiries…</p>}
      {state === "error" && (
        <p className="toast err" style={{ marginBottom: 12 }}>
          {error}
          <button className="mini" style={{ marginLeft: 12 }} onClick={load}>
            Retry
          </button>
        </p>
      )}
      {state === "ready" && items.length === 0 && (
        <p className="admin-lead">
          No enquiries yet. When a visitor submits the contact form, it will appear here.
        </p>
      )}

      {state === "ready" &&
        items.map((e) => (
          <div className={e.read ? "eq-card" : "eq-card unread"} key={e.id}>
            <div className="eq-top">
              <div>
                <b className="eq-name">
                  {!e.read && <span className="eq-dot" />}
                  {e.name}
                </b>
                <a className="eq-mail" href={`mailto:${e.email}`}>
                  {e.email}
                </a>
              </div>
              <span className="eq-date">{fmt(e.createdAt)}</span>
            </div>
            {e.interest && (
              <p className="eq-interest">
                <span>Interested in:</span> {e.interest}
              </p>
            )}
            {e.message && <p className="eq-msg">{e.message}</p>}
            <div className="eq-actions">
              <a className="mini" href={`mailto:${e.email}?subject=Re: Your enquiry to Nordic Ceylonians`}>
                Reply by email
              </a>
              <button className="mini" onClick={() => toggleRead(e)}>
                Mark as {e.read ? "unread" : "read"}
              </button>
              <button className="mini danger" onClick={() => remove(e)}>
                <Trash /> Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
