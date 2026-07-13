const steps = [
  {
    title: "Free Consultation",
    text: "Tell us your goals and we map the best path to studying in Finland.",
  },
  {
    title: "University Admission",
    text: "We shortlist programs and prepare a strong, complete application.",
  },
  {
    title: "Visa & Migration",
    text: "We handle your residence permit and documentation end to end.",
  },
  {
    title: "Arrival & Settle",
    text: "Coaching and support to help you adjust and thrive in your new home.",
  },
];

export default function Steps() {
  return (
    <section className="sec" id="process">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">How it works</span>
          <h2>Your journey in four simple steps</h2>
        </div>
        <div className="steps">
          {steps.map(({ title, text }) => (
            <div className="step reveal" key={title}>
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
