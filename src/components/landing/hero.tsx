import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      <div className="absolute left-1/2 top-24 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" />

      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pb-24 pt-20 text-center sm:px-6 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-5 inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft"
        >
          <Sparkles className="h-3.5 w-3.5 text-brand" />
          Chat with any PDF — instantly
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          Turn dense PDFs into <span className="text-gradient-brand">clear answers</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg"
        >
          DocMind AI reads, understands, and summarizes your documents so you can ask questions and
          get sourced answers in seconds — beautifully organized like Notion, fast like ChatGPT.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild size="lg" className="shadow-elegant">
            <Link to="/dashboard">
              Open dashboard <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#features">See features</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-16 w-full max-w-4xl"
        >
          <div className="overflow-hidden rounded-2xl border bg-card shadow-elegant">
            <div className="flex items-center gap-1.5 border-b bg-muted/40 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-chart-4/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-chart-2/70" />
              <span className="ml-3 text-xs text-muted-foreground">docmind.ai / research-paper.pdf</span>
            </div>
            <div className="grid gap-4 p-6 text-left sm:grid-cols-2">
              <div className="rounded-lg border bg-background/60 p-4">
                <p className="text-xs font-medium text-muted-foreground">You</p>
                <p className="mt-1 text-sm">Summarize the key findings in 3 bullets.</p>
              </div>
              <div className="rounded-lg border bg-gradient-to-br from-accent to-transparent p-4">
                <p className="text-xs font-medium text-brand">DocMind</p>
                <ul className="mt-1 space-y-1 text-sm">
                  <li>• Model outperforms baselines by 12.4% on benchmark A.</li>
                  <li>• Training compute reduced by 3× with new sampler.</li>
                  <li>• Limitations noted for low-resource languages.</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
