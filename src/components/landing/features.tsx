import { motion } from "framer-motion";
import { FileSearch, MessagesSquare, ShieldCheck, Zap, Layers, Quote } from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Semantic search",
    desc: "Find the exact passage across hundreds of pages in milliseconds.",
  },
  {
    icon: MessagesSquare,
    title: "Grounded chat",
    desc: "Ask follow-ups with cited answers linked back to the source.",
  },
  {
    icon: Layers,
    title: "Multi-document",
    desc: "Chat across an entire folder — reports, contracts, papers.",
  },
  {
    icon: Zap,
    title: "Blazing fast",
    desc: "Streaming responses tuned for long documents and low latency.",
  },
  {
    icon: Quote,
    title: "Citations first",
    desc: "Every answer includes the exact quote and page number.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    desc: "Your documents stay yours — encrypted at rest and in transit.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything you need to work with documents
        </h2>
        <p className="mt-3 text-muted-foreground">
          A calm, focused workspace that helps you read less and understand more.
        </p>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className="group rounded-xl border bg-card p-5 shadow-soft transition-shadow hover:shadow-elegant"
          >
            <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-accent text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold">{f.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
