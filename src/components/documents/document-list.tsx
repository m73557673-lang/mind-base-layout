import { FileText } from "lucide-react";
import { DocumentCard } from "./document-card";
import type { DocMeta } from "@/lib/api";

interface DocumentListProps {
  docs: DocMeta[];
  loading: boolean;
  onRename: (id: number, name: string) => Promise<void>;
  onDelete: (id: number) => void;
}

export function DocumentList({ docs, loading, onRename, onDelete }: DocumentListProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-[72px] animate-pulse rounded-xl border bg-muted/40" />
        ))}
      </div>
    );
  }

  if (!docs.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-16 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-muted-foreground">
          <FileText className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium">No documents yet</p>
        <p className="max-w-xs text-xs text-muted-foreground">
          Upload your first PDF above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {docs.map((doc) => (
        <DocumentCard
          key={doc.id}
          doc={doc}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
