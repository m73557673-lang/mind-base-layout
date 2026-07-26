import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FileText, MessageSquareText, UploadCloud, Sparkles, ArrowUpRight, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Overview — DocMind AI" },
      { name: "description", content: "Quick overview of your documents and recent chats." },
      { property: "og:title", content: "Overview — DocMind AI" },
      { property: "og:description", content: "Your DocMind workspace at a glance." },
    ],
  }),
  component: DashboardHome,
});

const stats = [
  { label: "Documents", value: "0", icon: FileText, hint: "Upload your first PDF" },
  { label: "Chats", value: "0", icon: MessageSquareText, hint: "Start a conversation" },
  { label: "Storage", value: "0 MB", icon: UploadCloud, hint: "Free plan — 500 MB" },
];

function DashboardHome() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between"
      >
        <div className="min-w-0">
          <Badge variant="secondary" className="mb-2 gap-1">
            <Sparkles className="h-3 w-3 text-brand" /> Welcome back
          </Badge>
          <h1 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">
            Your workspace
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload a PDF or continue where you left off.
          </p>
        </div>
        <Button asChild className="shrink-0">
          <Link to="/dashboard/documents">
            <UploadCloud className="mr-1.5 h-4 w-4" /> Upload PDF
          </Link>
        </Button>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}
          >
            <Card className="border shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {s.label}
                </CardTitle>
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-brand">
                  <s.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold tracking-tight">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Recent activity</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Your latest chats and uploads will appear here.
              </p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/chat">
                View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-12 text-center">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-accent text-brand">
                <Clock className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium">Nothing here yet</p>
              <p className="max-w-sm text-xs text-muted-foreground">
                Upload a PDF to get started. Your recent chats and documents will show up here.
              </p>
              <Button asChild size="sm" variant="outline" className="mt-2">
                <Link to="/dashboard/documents">
                  <UploadCloud className="mr-1.5 h-4 w-4" /> Upload a document
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent to-transparent">
          <CardHeader>
            <div className="mb-2 grid h-9 w-9 place-items-center rounded-lg bg-brand text-brand-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <CardTitle className="text-base">Tips to get started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="flex gap-2 text-muted-foreground">
              <span className="text-brand">1.</span> Upload a PDF from the Documents tab.
            </p>
            <p className="flex gap-2 text-muted-foreground">
              <span className="text-brand">2.</span> Ask questions in natural language.
            </p>
            <p className="flex gap-2 text-muted-foreground">
              <span className="text-brand">3.</span> Every answer includes a citation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
