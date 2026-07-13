import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Cap, Globe, Compass, Doc, Check, Arrow } from "@/components/icons";
import { getContent } from "@/lib/content";
import { serviceSlug } from "@/lib/slug";

export const dynamic = "force-dynamic";

const icons = [Cap, Globe, Compass, Doc];

async function findService(slug: string) {
  const content = await getContent();
  const index = content.services.findIndex((s) => serviceSlug(s) === slug);
  if (index === -1) return null;
  return { content, service: content.services[index], index };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = await findService(slug);
  if (!found) return { title: "Service not found — Nordic Ceylonians" };
  return {
    title: `${found.service.title} — Nordic Ceylonians`,
    description: found.service.tagline || found.service.text,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = await findService(slug);
  if (!found) notFound();

  const { content, service, index } = found;
  const Icon = icons[index % icons.length];
  const paragraphs = (service.details || service.text)
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
  const features = service.features ?? [];
  const others = content.services.filter((_, i) => i !== index);

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero banner */}
        <section className="svc-hero">
          <div className="wrap">
            <nav className="crumbs">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/#services">Services</Link>
              <span>/</span>
              <b>{service.title}</b>
            </nav>
            <span className="svc-ico">
              <Icon />
            </span>
            <span className="eyebrow">What we do</span>
            <h1>{service.title}</h1>
            {service.tagline && <p>{service.tagline}</p>}
          </div>
        </section>

        {/* Detail body */}
        <section className="sec">
          <div className="wrap svc-body">
            <div className="svc-main reveal">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              {features.length > 0 && (
                <>
                  <h2 className="svc-sub">What&rsquo;s included</h2>
                  <ul className="svc-features">
                    {features.map((f, i) => (
                      <li key={i}>
                        <span className="f-check">
                          <Check />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <aside className="svc-aside reveal">
              <div className="svc-card">
                <span className="eyebrow on-dark">Ready to begin?</span>
                <h3>Talk to our team</h3>
                <p>
                  Book a free consultation and we&rsquo;ll guide you through the
                  next steps — no pressure, just honest advice.
                </p>
                <Link href="/#contact" className="btn btn-gold">
                  Free Consultation <Arrow />
                </Link>
                <a
                  href={`mailto:${content.contact.email}`}
                  className="svc-mail"
                >
                  {content.contact.email}
                </a>
              </div>
            </aside>
          </div>
        </section>

        {/* Other services */}
        {others.length > 0 && (
          <section className="sec mist">
            <div className="wrap">
              <div className="sec-head reveal">
                <span className="eyebrow">Explore more</span>
                <h2>Other services</h2>
              </div>
              <div className="cards">
                {others.map((s) => {
                  const oi = content.services.indexOf(s);
                  const OIcon = icons[oi % icons.length];
                  return (
                    <article className="card reveal" key={serviceSlug(s)}>
                      <div className="c-ico">
                        <OIcon />
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
        )}
      </main>

      <Footer contact={content.contact} services={content.services} />
      <ScrollReveal />
    </>
  );
}
