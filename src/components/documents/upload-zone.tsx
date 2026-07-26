import { useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface UploadZoneProps {
  onFiles: (files: File[]) => void;
  disabled?: boolean;
}

export function UploadZone({ onFiles, disabled }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    const files = Array.from(e.dataTransfer.files);
    if (files.length) onFiles(files);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length) onFiles(files);
    e.target.value = ""; // allow re-selecting the same file
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-14 text-center transition-colors",
        dragging
          ? "border-primary bg-primary/5"
          : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50",
        disabled && "pointer-events-none opacity-60",
      )}
    >
      <div
        className={cn(
          "grid h-14 w-14 place-items-center rounded-2xl transition-colors",
          dragging ? "bg-primary/15 text-primary" : "bg-accent text-muted-foreground",
        )}
      >
        <UploadCloud className="h-6 w-6" />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">
          {dragging ? "Drop your PDFs here" : "Drag & drop PDFs here"}
        </p>
        <p className="text-xs text-muted-foreground">
          PDF only · up to 50 MB per file · multiple files allowed
        </p>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="mt-1"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        Browse files
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        multiple
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
