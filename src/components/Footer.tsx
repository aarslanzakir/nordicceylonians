import { Cap, Facebook, Instagram, LinkedIn } from "./icons";
import type { Contact as ContactType, Service } from "@/lib/content";

function serviceSlug(s: Service) {
  return s.slug || s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function Footer({
  contact,
  services,
}: {
  contact: ContactType;
  services: Service[];
}) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <a className="brand" href="/">
              <span className="brand-mark">
                <Cap />
              </span>
              <span>
                <span className="brand-name">Nordic Ceylonians</span>
                <small>For a Better Future</small>
              </span>
            </a>
            <p>
              Nordic Ceylonians OY — your trusted partner for overseas education
              and migration to Finland, from first consultation to a successful
              new beginning.
            </p>
          </div>
          <div className="foot-col">
            <h5>Company</h5>
            <a href="/#why">Our Story</a>
            <a href="/#services">Services</a>
            <a href="/#programs">Programs</a>
            <a href="/#stories">Client Stories</a>
          </div>
          <div className="foot-col">
            <h5>Services</h5>
            {services.map((s) => (
              <a key={s.title} href={`/services/${serviceSlug(s)}`}>
                {s.title}
              </a>
            ))}
          </div>
          <div className="foot-col">
            <h5>Contact</h5>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            {contact.phone.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s+/g, "")}`}>
                {p}
              </a>
            ))}
            <a href="/#contact">Book a Session</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Nordic Ceylonians. All rights reserved.</span>
          <div className="socials">
            <a href="#" aria-label="Facebook">
              <Facebook />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram />
            </a>
            <a href="#" aria-label="LinkedIn">
              <LinkedIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
