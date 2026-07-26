import { BrainCircuit, Clock3, Gauge, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SectionHeading } from "./dashboard-card";

const bars = [
  { label: "Questions answered", value: 78, color: "[&>span]:bg-brand" },
  { label: "Citation accuracy", value: 94, color: "[&>span]:bg-emerald-500" },
  { label: "Time saved", value: 63, color: "[&>span]:bg-violet-500" },
];

export function InsightsPanel() {
  return (
    <Card className="overflow-hidden border-border/70 bg-card/80 shadow-soft">
      <CardHeader className="pb-3">
        <SectionHeading title="AI statistics" description="Your productivity at a glance." />
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-3 divide-x rounded-xl border bg-accent/30 py-3">
          <div className="px-3 text-center">
            <BrainCircuit className="mx-auto mb-1 h-4 w-4 text-brand" />
            <p className="text-lg font-semibold">128</p>
            <p className="text-[10px] text-muted-foreground">AI queries</p>
          </div>
          <div className="px-3 text-center">
            <Clock3 className="mx-auto mb-1 h-4 w-4 text-violet-500" />
            <p className="text-lg font-semibold">6.4h</p>
            <p className="text-[10px] text-muted-foreground">Saved</p>
          </div>
          <div className="px-3 text-center">
            <Gauge className="mx-auto mb-1 h-4 w-4 text-emerald-500" />
            <p className="text-lg font-semibold">94%</p>
            <p className="text-[10px] text-muted-foreground">Accuracy</p>
          </div>
        </div>
        <div className="space-y-4">
          {bars.map((bar, index) => (
            <motion.div
              key={bar.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 + index * 0.1 }}
            >
              <div className="mb-1.5 flex justify-between text-xs">
                <span className="text-muted-foreground">{bar.label}</span>
                <span className="font-medium">{bar.value}%</span>
              </div>
              <Progress value={bar.value} className={`h-1.5 bg-muted ${bar.color}`} />
            </motion.div>
          ))}
        </div>
        <div className="flex items-start gap-3 rounded-xl bg-gradient-to-br from-brand/10 to-violet-500/10 p-3">
          <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand">
            <Zap className="h-3.5 w-3.5" />
          </div>
          <div>
            <p className="text-xs font-semibold">You&apos;re on a roll</p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              You&apos;ve been 24% more productive with DocMind this week.
            </p>
          </div>
          <Sparkles className="ml-auto h-4 w-4 shrink-0 text-brand" />
        </div>
      </CardContent>
    </Card>
  );
}
