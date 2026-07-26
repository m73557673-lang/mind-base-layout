import { UploadCloud, BrainCircuit, Sparkles } from "lucide-react";

const steps = [
  { icon: UploadCloud, title: "Upload", desc: "Drop a PDF or connect a folder." },
  { icon: BrainCircuit, title: "Analyze", desc: "We parse, index, and understand every page." },
  { icon: Sparkles, title: "Ask anything", desc: "Chat with cited answers and instant summaries." },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-y bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
          <p className="mt-3 text-muted-foreground">Three steps from PDF to insight.</p>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-xl border bg-card p-6 shadow-soft">
              <span className="absolute -top-3 left-6 rounded-full border bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground">
                Step {i + 1}
              </span>
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-brand to-[oklch(from_var(--color-brand)_calc(l+0.15)_c_h)] text-brand-foreground">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
