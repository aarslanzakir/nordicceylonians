import { Check, Bulb, Shield } from "./icons";

const feats = [
  {
    Icon: Check,
    title: "Experienced & reliable",
    text: "Over a decade helping students reach Finnish universities with confidence.",
  },
  {
    Icon: Bulb,
    title: "End-to-end support",
    text: "From choosing a program to visa approval and settling in — we handle every step.",
  },
  {
    Icon: Shield,
    title: "Honest & transparent",
    text: "Clear advice, realistic timelines, and no false promises — just trusted service.",
  },
];

export default function WhyUs({ image }: { image: string }) {
  return (
    <section className="sec mist" id="why">
      <div className="wrap why">
        <div className="why-photo reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="University campus in Finland" />
        </div>
        <div className="reveal">
          <span className="eyebrow">Why choose us</span>
          <h2>Trusted guidance from application to arrival</h2>
          {feats.map(({ Icon, title, text }) => (
            <div className="feat" key={title}>
              <span className="f-ico">
                <Icon />
              </span>
              <div>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
