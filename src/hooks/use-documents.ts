import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/tanstack-react-start";
import { toast } from "sonner";
import {
  listDocuments,
  uploadDocuments,
  renameDocument,
  deleteDocument,
  type DocMeta,
} from "@/lib/api";

export type UploadItem = {
  id: string;           // temp client id
  file: File;
  progress: number;     // 0-100
  status: "pending" | "uploading" | "done" | "error";
  error?: string;
};

export function useDocuments() {
  const { userId, isLoaded } = useAuth();
  const [docs, setDocs] = useState<DocMeta[]>([]);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [loading, setLoading] = useState(false);

  // ─── Load docs ─────────────────────────────────────────────────────────────
  const refresh = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const data = await listDocuments(userId);
      setDocs(data);
    } catch {
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (isLoaded && userId) refresh();
  }, [isLoaded, userId, refresh]);

  // ─── Upload ────────────────────────────────────────────────────────────────
  const upload = useCallback(
    async (files: File[]) => {
      if (!userId) return;

      const MAX_MB = 50;
      const valid: File[] = [];
      for (const f of files) {
        if (!f.name.toLowerCase().endsWith(".pdf") && f.type !== "application/pdf") {
          toast.error(`"${f.name}" is not a PDF`);
          continue;
        }
        if (f.size > MAX_MB * 1024 * 1024) {
          toast.error(`"${f.name}" exceeds ${MAX_MB} MB`);
          continue;
        }
        valid.push(f);
      }
      if (!valid.length) return;

      const items: UploadItem[] = valid.map((file) => ({
        id: crypto.randomUUID(),
        file,
        progress: 0,
        status: "pending",
      }));
      setUploads((prev) => [...prev, ...items]);

      // Upload all valid files together (one XHR, shared progress)
      const ids = items.map((i) => i.id);
      setUploads((prev) =>
        prev.map((u) => (ids.includes(u.id) ? { ...u, status: "uploading" } : u)),
      );

      try {
        const created = await uploadDocuments(userId, valid, (pct) => {
          setUploads((prev) =>
            prev.map((u) => (ids.includes(u.id) ? { ...u, progress: pct } : u)),
          );
        });
        setUploads((prev) =>
          prev.map((u) =>
            ids.includes(u.id) ? { ...u, progress: 100, status: "done" } : u,
          ),
        );
        setDocs((prev) => [...created, ...prev]);
        toast.success(
          created.length === 1
            ? `"${created[0].display_name}" uploaded`
            : `${created.length} files uploaded`,
        );
        // Remove completed items after 2 s
        setTimeout(() => {
          setUploads((prev) => prev.filter((u) => !ids.includes(u.id)));
        }, 2000);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Upload failed";
        setUploads((prev) =>
          prev.map((u) =>
            ids.includes(u.id) ? { ...u, status: "error", error: msg } : u,
          ),
        );
        toast.error(msg);
      }
    },
    [userId],
  );

  // ─── Rename ────────────────────────────────────────────────────────────────
  const rename = useCallback(
    async (docId: number, displayName: string) => {
      if (!userId) return;
      try {
        const updated = await renameDocument(userId, docId, displayName);
        setDocs((prev) => prev.map((d) => (d.id === docId ? updated : d)));
        toast.success("Renamed successfully");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Rename failed";
        toast.error(msg);
        throw err; // so the UI can revert the optimistic state
      }
    },
    [userId],
  );

  // ─── Delete ────────────────────────────────────────────────────────────────
  const remove = useCallback(
    async (docId: number) => {
      if (!userId) return;
      const prev = docs.find((d) => d.id === docId);
      setDocs((d) => d.filter((doc) => doc.id !== docId)); // optimistic
      try {
        await deleteDocument(userId, docId);
        toast.success(`"${prev?.display_name ?? "Document"}" deleted`);
      } catch (err) {
        setDocs((d) => (prev ? [prev, ...d] : d)); // revert
        const msg = err instanceof Error ? err.message : "Delete failed";
        toast.error(msg);
      }
    },
    [userId, docs],
  );

  // ─── Dismiss upload error ──────────────────────────────────────────────────
  const dismissUpload = useCallback((id: string) => {
    setUploads((prev) => prev.filter((u) => u.id !== id));
  }, []);

  return { docs, uploads, loading, upload, rename, remove, dismissUpload, refresh };
}
