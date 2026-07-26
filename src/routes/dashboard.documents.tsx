import { createFileRoute } from "@tanstack/react-router";
import { UploadCloud, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">Documents</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload PDFs to chat with them.
          </p>
        </div>
        <Button className="shrink-0">
          <UploadCloud className="mr-1.5 h-4 w-4" /> Upload PDF
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-16 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-brand">
              <FileText className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium">No documents yet</p>
            <p className="max-w-sm text-xs text-muted-foreground">
              Drop a PDF here, or click Upload PDF to add your first document.
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              <UploadCloud className="mr-1.5 h-4 w-4" /> Choose file
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
