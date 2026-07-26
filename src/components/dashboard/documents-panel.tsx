import { useMemo, useState } from "react";
import { FileText, FileSearch, Search, SlidersHorizontal, UploadCloud } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "./dashboard-card";

const documents = [
  {
    name: "Q4-Financial-Report.pdf",
    type: "Financial report",
    size: "4.8 MB",
    updated: "12 min ago",
    tone: "bg-rose-500/10 text-rose-600 dark:text-rose-300",
  },
  {
    name: "Product-Roadmap-2025.pdf",
    type: "Planning document",
    size: "2.1 MB",
    updated: "Yesterday",
    tone: "bg-blue-500/10 text-blue-600 dark:text-blue-300",
  },
  {
    name: "Research-Notes.pdf",
    type: "Research notes",
    size: "1.7 MB",
    updated: "Jun 24",
    tone: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
  },
  {
    name: "Brand-Guidelines.pdf",
    type: "Reference guide",
    size: "8.4 MB",
    updated: "Jun 22",
    tone: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  },
];

export function DocumentsPanel() {
  const [query, setQuery] = useState("");
  const filteredDocuments = useMemo(
    () =>
      documents.filter((document) =>
        `${document.name} ${document.type}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <Card className="border-border/70 bg-card/80 shadow-soft">
      <CardHeader className="gap-4 pb-4">
        <SectionHeading
          title="Uploaded documents"
          description="Your AI-ready knowledge base."
          action="/dashboard/documents"
        />
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search documents…"
              className="h-9 pl-9"
              aria-label="Search documents"
            />
          </div>
          <Button variant="outline" size="sm" className="h-9">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((document, index) => (
            <motion.div
              key={document.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <Link
                to="/dashboard/documents"
                className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-accent/60"
              >
                <div
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${document.tone}`}
                >
                  <FileText className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{document.name}</p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {document.type} · {document.size}
                  </p>
                </div>
                <div className="hidden shrink-0 text-right sm:block">
                  <Badge
                    variant="secondary"
                    className="mb-1 bg-emerald-500/10 text-[10px] font-medium text-emerald-600 dark:text-emerald-300"
                  >
                    Ready
                  </Badge>
                  <p className="text-[11px] text-muted-foreground">{document.updated}</p>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-8 text-center">
            <FileSearch className="mb-2 h-5 w-5 text-muted-foreground" />
            <p className="text-sm font-medium">No documents found</p>
            <p className="mt-1 text-xs text-muted-foreground">Try a different search term.</p>
          </div>
        )}
        <Button asChild variant="outline" className="mt-2 w-full">
          <Link to="/dashboard/documents">
            <UploadCloud className="h-4 w-4" /> Upload a document
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
