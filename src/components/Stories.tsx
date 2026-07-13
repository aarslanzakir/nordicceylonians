import type { Story } from "@/lib/content";

export default function Stories({ stories }: { stories: Story[] }) {
  return (
    <section className="sec" id="stories">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Client stories</span>
          <h2>Real journeys, real success</h2>
          <p>Students we&apos;ve helped begin their journey to Finland.</p>
        </div>
        <div className="quotes">
          {stories.map((s, i) => (
            <div className="quote reveal" key={s.name + i}>
              <div className="stars">★★★★★</div>
              <p>“{s.quote}”</p>
              <div className="who">
                <span className="av">{s.initial}</span>
                <div>
                  <b>{s.name}</b>
                  <span>{s.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
