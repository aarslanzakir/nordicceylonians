import Link from "next/link";
import { Cap, Globe, Compass, Doc, Arrow } from "./icons";
import type { Service } from "@/lib/content";
import { serviceSlug } from "@/lib/slug";

const icons = [Cap, Globe, Compass, Doc];

export default function Services({ services }: { services: Service[] }) {
  return (
    <section className="sec" id="services">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">What we do</span>
          <h2>Our Services</h2>
          <p>
            A complete range of high-quality services to support your journey
            abroad — education, migration, personal growth, and professional
            documentation.
          </p>
        </div>
        <div className="cards">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article className="card reveal" key={s.title + i}>
                <div className="c-ico">
                  <Icon />
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <Link className="c-link" href={`/services/${serviceSlug(s)}`}>
                  Learn more <Arrow />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
