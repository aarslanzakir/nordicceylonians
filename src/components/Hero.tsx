import { Arrow, Check } from "./icons";
import type { Hero as HeroType } from "@/lib/content";

export default function Hero({ hero, image }: { hero: HeroType; image: string }) {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="reveal">
          <span className="eyebrow on-dark">{hero.eyebrow}</span>
          <h1>
            {hero.titleLead} <em>{hero.titleHighlight}</em>
          </h1>
          <p className="lead">{hero.lead}</p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-gold">
              Book a Free Session <Arrow />
            </a>
            <a href="#services" className="btn btn-ghost">
              Explore Services
            </a>
          </div>
          <div className="hero-trust">
            {hero.stats.map((s) => (
              <div key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual reveal">
          <span className="blob b1" />
          <div className="hero-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="Students planning their studies abroad" />
          </div>
          <div className="float-card">
            <span className="fc-ico">
              <Check />
            </span>
            <span>
              <b>Partnered Universities</b>
              <span>Accredited Finnish institutions</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
