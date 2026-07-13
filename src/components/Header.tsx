"use client";

import { useEffect, useState } from "react";
import { Arrow } from "./icons";

const links = [
  ["Services", "/#services"],
  ["Why Us", "/#why"],
  ["Programs", "/#programs"],
  ["Stories", "/#stories"],
  ["Contact", "/#contact"],
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile drawer is open, and close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="wrap nav">
        <a className="brand" href="/" onClick={close}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo-img" src="/logo.png" alt="Nordic Ceylonians — For a Better Future" />
        </a>

        {/* Desktop navigation */}
        <nav className="menu">
          {links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-cta">
          <a href="/#contact" className="btn btn-gold">
            Free Consultation <Arrow />
          </a>
          <button
            className={open ? "burger is-open" : "burger"}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={open ? "m-backdrop show" : "m-backdrop"}
        onClick={close}
        aria-hidden="true"
      />
      <aside
        id="mobile-drawer"
        className={open ? "m-drawer open" : "m-drawer"}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="m-drawer-head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="m-drawer-logo" src="/logo.png" alt="Nordic Ceylonians" />
          <button className="m-close" aria-label="Close menu" onClick={close}>
            <svg viewBox="0 0 24 24">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav className="m-nav">
          {links.map(([label, href], i) => (
            <a
              key={href}
              href={href}
              onClick={close}
              style={{ transitionDelay: open ? `${0.06 * i + 0.08}s` : "0s" }}
            >
              <span>{label}</span>
              <Arrow />
            </a>
          ))}
        </nav>

        <div className="m-drawer-foot">
          <a href="/#contact" className="btn btn-gold" onClick={close}>
            Free Consultation <Arrow />
          </a>
          <p>Study &amp; Settle in Finland</p>
        </div>
      </aside>
    </header>
  );
}
