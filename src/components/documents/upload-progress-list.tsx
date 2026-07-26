import { FileText, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import type { UploadItem } from "@/hooks/use-documents";

interface UploadProgressListProps {
  items: UploadItem[];
  onDismiss: (id: string) => void;
}

export function UploadProgressList({ items, onDismiss }: UploadProgressListProps) {
  if (!items.length) return null;

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <UploadProgressItem key={item.id} item={item} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function UploadProgressItem({
  item,
  onDismiss,
}: {
  item: UploadItem;
  onDismiss: (id: string) => void;
}) {
  const isDone = item.status === "done";
  const isError = item.status === "error";
  const isActive = item.status === "uploading" || item.status === "pending";

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border p-3",
        isError && "border-destructive/40 bg-destructive/5",
        isDone && "border-green-500/30 bg-green-500/5",
        isActive && "border-border bg-muted/30",
      )}
    >
      {/* Icon */}
      <div className="mt-0.5 shrink-0">
        {isError ? (
          <AlertCircle className="h-4 w-4 text-destructive" />
        ) : isDone ? (
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        ) : (
          <FileText className="h-4 w-4 text-muted-foreground" />
        )}
      </div>

      {/* Name + progress */}
      <div className="min-w-0 flex-1 space-y-1.5">
        <p className="truncate text-sm font-medium leading-none">{item.file.name}</p>
        <p className="text-xs text-muted-foreground">
          {formatBytes(item.file.size)}
          {isError && item.error && (
            <span className="ml-1 text-destructive"> · {item.error}</span>
          )}
        </p>
        {isActive && (
          <Progress value={item.progress} className="h-1.5" />
        )}
      </div>

      {/* Dismiss */}
      {(isDone || isError) && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 shrink-0 text-muted-foreground hover:text-foreground"
          onClick={() => onDismiss(item.id)}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
