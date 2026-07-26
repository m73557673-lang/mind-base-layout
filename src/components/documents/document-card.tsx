import { useState, useRef, useEffect } from "react";
import { FileText, Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import type { DocMeta } from "@/lib/api";

interface DocumentCardProps {
  doc: DocMeta;
  onRename: (id: number, name: string) => Promise<void>;
  onDelete: (id: number) => void;
}

export function DocumentCard({ doc, onRename, onDelete }: DocumentCardProps) {
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(doc.display_name);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  function startEdit() {
    setDraftName(doc.display_name);
    setEditing(true);
  }

  function cancelEdit() {
    setEditing(false);
    setDraftName(doc.display_name);
  }

  async function commitEdit() {
    const trimmed = draftName.trim();
    if (!trimmed || trimmed === doc.display_name) {
      cancelEdit();
      return;
    }
    setSaving(true);
    try {
      await onRename(doc.id, trimmed);
      setEditing(false);
    } catch {
      // toast already shown by hook; keep editing open
    } finally {
      setSaving(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") cancelEdit();
  }

  return (
    <div className="group flex items-center gap-3 rounded-xl border bg-card p-4 transition-shadow hover:shadow-sm">
      {/* PDF icon */}
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-red-50 text-red-500 dark:bg-red-950/30">
        <FileText className="h-5 w-5" />
      </div>

      {/* Name + metadata */}
      <div className="min-w-0 flex-1">
        {editing ? (
          <Input
            ref={inputRef}
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={saving}
            className="h-7 text-sm"
          />
        ) : (
          <p className="truncate text-sm font-medium leading-none">{doc.display_name}</p>
        )}
        <p className="mt-1 text-xs text-muted-foreground">
          {formatBytes(doc.file_size)} · {formatDate(doc.created_at)}
        </p>
      </div>

      {/* Actions */}
      <div
        className={cn(
          "flex shrink-0 items-center gap-1 transition-opacity",
          editing ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
      >
        {editing ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-green-600 hover:text-green-700"
              onClick={commitEdit}
              disabled={saving}
            >
              <Check className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground"
              onClick={cancelEdit}
              disabled={saving}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={startEdit}
              title="Rename"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete document?</AlertDialogTitle>
                  <AlertDialogDescription>
                    <span className="font-medium">"{doc.display_name}"</span> will be
                    permanently deleted. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={() => onDelete(doc.id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </div>
    </div>
  );
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
