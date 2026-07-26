import { createFileRoute } from "@tanstack/react-router";
import { LandingNav } from "@/components/landing/landing-nav";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CTA } from "@/components/landing/cta";
import { LandingFooter } from "@/components/landing/footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DocMind AI — Chat with your PDFs" },
      {
        name: "description",
        content:
          "Upload PDFs and get instant, cited answers. A focused AI workspace for reading, researching, and summarizing documents.",
      },
      { property: "og:title", content: "DocMind AI — Chat with your PDFs" },
      {
        property: "og:description",
        content: "Turn dense PDFs into clear, cited answers with DocMind AI.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <LandingFooter />
    </div>
  );
}
