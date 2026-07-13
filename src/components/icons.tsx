import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export const Cap = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path d="M22 10 12 5 2 10l10 5 10-5Z" />
    <path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
    <path d="M22 10v6" />
  </svg>
);

export const Globe = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.5 2.6 3.9 5.7 4 9-.1 3.3-1.5 6.4-4 9-2.5-2.6-3.9-5.7-4-9 .1-3.3 1.5-6.4 4-9Z" />
  </svg>
);

export const Compass = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
  </svg>
);

export const Doc = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h4M9 17h6" />
  </svg>
);

export const Arrow = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Check = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const Shield = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path d="M12 3 4 6v6c0 5 3.4 7.7 8 9 4.6-1.3 8-4 8-9V6l-8-3Z" />
  </svg>
);

export const Bulb = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path d="M12 2a7 7 0 0 0-4 12.7V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.3A7 7 0 0 0 12 2Z" />
    <path d="M9 22h6" />
  </svg>
);

export const Mail = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

export const Phone = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);

export const Pin = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const Facebook = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path d="M15 3h-3a4 4 0 0 0-4 4v3H5v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
  </svg>
);

export const Instagram = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" />
  </svg>
);

export const LinkedIn = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path d="M6 9v10M6 5v.01M10 19v-6a3 3 0 0 1 6 0v6" />
  </svg>
);

export const Home = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </svg>
);

export const Photo = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="8.5" cy="9.5" r="1.5" />
    <path d="m21 16-5-5-9 9" />
  </svg>
);

export const Grid = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

export const Book = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
  </svg>
);

export const Quote = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path d="M6 17h3l2-4V7H5v6h3l-2 4Zm9 0h3l2-4V7h-6v6h3l-2 4Z" />
  </svg>
);

export const Inbox = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="M5.5 5h13l3.5 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6Z" />
  </svg>
);

export const Trash = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
  </svg>
);
