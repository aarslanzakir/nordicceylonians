import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Steps from "@/components/Steps";
import Programs from "@/components/Programs";
import Stories from "@/components/Stories";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

const partners = ["Arcada", "Metropolia", "Laurea", "Häme UAS", "Savonia"];

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <div className="topbar">
        Your Trusted Overseas Education &amp; Migration Consultant —{" "}
        <b>Study &amp; Settle in Finland</b>
      </div>

      <Header />

      <main className="flex-1">
        <Hero hero={content.hero} image={content.images.hero} />

        <div className="partners">
          <div className="wrap">
            <p>Working with accredited Finnish universities</p>
            <div className="partner-logos">
              {partners.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </div>
        </div>

        <Services services={content.services} />
        <WhyUs image={content.images.why} />
        <Steps />
        <Programs programs={content.programs} />
        <Stories stories={content.stories} />
        <CTA />
        <Contact contact={content.contact} />
      </main>

      <Footer contact={content.contact} services={content.services} />
      <ScrollReveal />
    </>
  );
}
