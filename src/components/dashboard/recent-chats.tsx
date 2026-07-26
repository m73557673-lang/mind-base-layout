import { Link } from "@tanstack/react-router";
import { FileText, MessageCircle, MoreHorizontal, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeading } from "./dashboard-card";

const chats = [
  {
    title: "Q4 financial report summary",
    document: "Q4-Financial-Report.pdf",
    time: "12 min ago",
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300",
  },
  {
    title: "Product roadmap priorities",
    document: "Product-Roadmap-2025.pdf",
    time: "Yesterday",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  },
  {
    title: "Research methodology notes",
    document: "Research-Notes.pdf",
    time: "Jun 24",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  },
];

export function RecentChats() {
  return (
    <Card className="border-border/70 bg-card/80 shadow-soft">
      <CardHeader className="pb-4">
        <SectionHeading
          title="Recent chats"
          description="Pick up where you left off."
          action="/dashboard/chat"
        />
      </CardHeader>
      <CardContent className="space-y-2">
        {chats.map((chat, index) => (
          <motion.div
            key={chat.title}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + index * 0.08 }}
          >
            <Link
              to="/dashboard/chat"
              className="group flex items-center gap-3 rounded-xl border border-transparent p-3 transition-colors hover:border-border hover:bg-accent/60"
            >
              <div
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${chat.color}`}
              >
                <MessageCircle className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{chat.title}</p>
                <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                  <FileText className="h-3 w-3 shrink-0" /> {chat.document}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="hidden text-xs text-muted-foreground sm:inline">{chat.time}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label={`More actions for ${chat.title}`}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </Link>
          </motion.div>
        ))}
        <Link
          to="/dashboard/chat"
          className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-dashed py-3 text-xs font-medium text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
        >
          <Sparkles className="h-3.5 w-3.5" /> Start a new conversation
        </Link>
      </CardContent>
    </Card>
  );
}
