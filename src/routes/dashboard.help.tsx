import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Mail, BookOpen } from "lucide-react";

export const Route = createFileRoute("/dashboard/help")({
  head: () => ({
    meta: [
      { title: "Help — DocMind AI" },
      { name: "description", content: "Guides and support for DocMind AI." },
      { property: "og:title", content: "Help — DocMind AI" },
      { property: "og:description", content: "Find guides and contact support." },
    ],
  }),
  component: HelpPage,
});

const items = [
  { icon: BookOpen, title: "Documentation", desc: "Guides, tips, and best practices." },
  { icon: HelpCircle, title: "FAQ", desc: "Answers to common questions." },
  { icon: Mail, title: "Contact support", desc: "We usually reply within a few hours." },
];

function HelpPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Help & support</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Everything you need to get the most out of DocMind AI.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((it) => (
          <Card key={it.title} className="shadow-soft">
            <CardHeader>
              <div className="mb-2 grid h-9 w-9 place-items-center rounded-lg bg-accent text-brand">
                <it.icon className="h-4 w-4" />
              </div>
              <CardTitle className="text-base">{it.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{it.desc}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
