import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-accent via-background to-background p-10 text-center shadow-elegant sm:p-16">
        <div className="absolute -top-24 left-1/2 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" />
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Ready to read smarter?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Start free — upgrade when your team grows. No credit card required.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="shadow-elegant">
            <Link to="/dashboard">
              Launch DocMind <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#features">Explore features</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
