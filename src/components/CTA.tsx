import { Arrow } from "./icons";

export default function CTA() {
  return (
    <section className="sec mist">
      <div className="wrap">
        <div className="cta reveal">
          <span className="eyebrow on-dark">Ready to begin?</span>
          <h2>Book your free counselling session today</h2>
          <p>
            Still looking for the right programme in Finland? Find your path and
            discover a brighter future with our comprehensive counselling.
          </p>
          <div className="btn-row">
            <a href="#contact" className="btn btn-gold">
              Book Now <Arrow />
            </a>
            <a href="#services" className="btn btn-ghost">
              See Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
