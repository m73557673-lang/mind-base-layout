import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { useDocuments } from "@/hooks/use-documents";
import { UploadZone } from "@/components/documents/upload-zone";
import { UploadProgressList } from "@/components/documents/upload-progress-list";
import { DocumentList } from "@/components/documents/document-list";

export const Route = createFileRoute("/dashboard/documents")({
  head: () => ({
    meta: [
      { title: "Documents — DocMind AI" },
      { name: "description", content: "Manage your uploaded PDFs." },
      { property: "og:title", content: "Documents — DocMind AI" },
      { property: "og:description", content: "Upload, browse, and organize your PDFs." },
    ],
  }),
  component: DocumentsPage,
});

function DocumentsPage() {
  const { docs, uploads, loading, upload, rename, remove, dismissUpload } = useDocuments();
  const isUploading = uploads.some((u) => u.status === "uploading" || u.status === "pending");

  return (
    <>
      <Toaster position="bottom-right" richColors />
      <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Documents</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload PDFs to chat with them. Max 50 MB per file.
          </p>
        </div>

        {/* Upload zone */}
        <UploadZone onFiles={upload} disabled={isUploading} />

        {/* Active upload progress */}
        {uploads.length > 0 && (
          <UploadProgressList items={uploads} onDismiss={dismissUpload} />
        )}

        {/* Document library */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Your library
            </h2>
            <span className="text-xs text-muted-foreground">
              {docs.length} {docs.length === 1 ? "file" : "files"}
            </span>
          </div>

          <DocumentList
            docs={docs}
            loading={loading}
            onRename={rename}
            onDelete={remove}
          />
        </section>
      </div>
    </>
  );
}
