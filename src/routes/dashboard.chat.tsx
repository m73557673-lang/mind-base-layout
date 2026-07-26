import { createFileRoute } from "@tanstack/react-router";
import { MessageSquareText, Send, Paperclip, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/dashboard/chat")({
  head: () => ({
    meta: [
      { title: "Chat — DocMind AI" },
      { name: "description", content: "Chat with your documents." },
      { property: "og:title", content: "Chat — DocMind AI" },
      { property: "og:description", content: "Ask questions and get cited answers from your PDFs." },
    ],
  }),
  component: ChatPage,
});

const suggestions = [
  "Summarize this document in 5 bullets",
  "What are the key risks mentioned?",
  "List every deadline with page numbers",
  "Compare sections 2 and 4",
];

function ChatPage() {
  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] max-w-4xl flex-col p-4 sm:p-6">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-[oklch(from_var(--color-brand)_calc(l+0.15)_c_h)] text-brand-foreground shadow-elegant">
          <MessageSquareText className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          What can I help you find?
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Upload a PDF to start chatting. Try one of the suggestions below.
        </p>

        <div className="mt-6 grid w-full max-w-2xl gap-2 sm:grid-cols-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              className="group flex items-center gap-2 rounded-lg border bg-card p-3 text-left text-sm shadow-soft transition-colors hover:bg-accent"
            >
              <Sparkles className="h-4 w-4 shrink-0 text-brand" />
              <span className="truncate">{s}</span>
            </button>
          ))}
        </div>
      </div>

      <Card className="mt-4 border shadow-elegant">
        <div className="flex items-end gap-2 p-2">
          <Button variant="ghost" size="icon" aria-label="Attach">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Textarea
            placeholder="Ask about your documents…"
            rows={1}
            className="min-h-[40px] flex-1 resize-none border-0 shadow-none focus-visible:ring-0"
          />
          <Button size="icon" aria-label="Send" className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        DocMind can make mistakes. Verify important information with the source.
      </p>
    </div>
  );
}
