import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  FileText,
  MessageSquareText,
  Sparkles,
  UploadCloud,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { DocumentsPanel } from "@/components/dashboard/documents-panel";
import { InsightsPanel } from "@/components/dashboard/insights-panel";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { RecentChats } from "@/components/dashboard/recent-chats";
import { StorageCard } from "@/components/dashboard/storage-card";

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

function DashboardHome() {
  return (
    <div className="relative isolate mx-auto max-w-[1440px] overflow-hidden p-4 sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="min-w-0">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            <Sparkles className="h-3.5 w-3.5" /> Workspace overview
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Good morning, <span className="text-gradient-brand">there.</span>
          </h1>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening across your documents and AI workspace.
          </p>
        </div>
        <Button asChild className="shrink-0 shadow-lg shadow-primary/15">
          <Link to="/dashboard/documents">
            <UploadCloud className="h-4 w-4" /> Upload document
          </Link>
        </Button>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          label="Total documents"
          value="24"
          detail="8 added this month"
          trend="+18%"
          icon={FileText}
          accent="from-blue-500 to-cyan-400"
          iconBackground="bg-blue-500"
          delay={0.05}
        />
        <DashboardCard
          label="AI conversations"
          value="128"
          detail="42 questions this week"
          trend="+24%"
          icon={MessageSquareText}
          accent="from-violet-500 to-fuchsia-400"
          iconBackground="bg-violet-500"
          delay={0.1}
        />
        <DashboardCard
          label="Storage used"
          value="16.8 MB"
          detail="3.4% of your plan"
          icon={UploadCloud}
          accent="from-amber-500 to-orange-400"
          iconBackground="bg-amber-500"
          delay={0.15}
        />
        <DashboardCard
          label="Time saved"
          value="6.4 hrs"
          detail="Compared to manual review"
          trend="+12%"
          icon={Zap}
          accent="from-emerald-500 to-teal-400"
          iconBackground="bg-emerald-500"
          delay={0.2}
        />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <RecentChats />
        <StorageCard />
        <ProfileCard />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <DocumentsPanel />
        <InsightsPanel />
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand/15 bg-gradient-to-r from-brand/10 via-violet-500/5 to-transparent p-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-brand-foreground shadow-lg shadow-brand/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Ready to find your next insight?</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Ask a question across all of your documents.
            </p>
          </div>
        </div>
        <Button asChild variant="outline" className="shrink-0 border-brand/30 bg-background/50">
          <Link to="/dashboard/chat">
            Open AI chat <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
