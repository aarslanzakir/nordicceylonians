import type { Program } from "@/lib/content";

export default function Programs({ programs }: { programs: Program[] }) {
  return (
    <section className="sec mist" id="programs">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Popular programs</span>
          <h2>Study pathways in Finland</h2>
          <p>A selection of degree options through our partner universities.</p>
        </div>
        <div className="progs">
          {programs.map((p, i) => (
            <div className="prog reveal" key={p.title + i}>
              <span className="tag">{p.tag}</span>
              <h4>{p.title}</h4>
              <p>{p.text}</p>
              <div className="meta">
                <span>
                  <b>{p.duration}</b> duration
                </span>
                <span>
                  <b>{p.intake}</b> intake
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
