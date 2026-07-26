# DocMind AI

A "chat with your PDFs" web app — upload documents, ask questions, get cited answers.

## Stack

- **TanStack Start** (SSR-capable React framework)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** component library
- **Bun** as the package manager and runtime

## Running the app

Two services run together:

| Service | Command | Port | Workflow |
|---|---|---|---|
| Frontend (TanStack Start) | `bun run dev --port 5000 --host 0.0.0.0` | 5000 | `Start application` |
| Backend (FastAPI) | `python3 -m uvicorn backend.main:app --host 0.0.0.0 --port 8000` | 8000 | `Backend API` |

The Vite dev server proxies `/api/*` requests to the FastAPI backend, so the frontend always uses relative URLs.

Uploaded PDF files are saved to `uploads/pdfs/` (gitignored).

## Project structure

```
src/
  routes/         # File-based routes (TanStack Router)
    index.tsx     # Landing page
    dashboard.tsx # Dashboard shell
    dashboard.*.tsx  # Chat, Documents, Settings, Help
  components/     # UI components (landing + dashboard)
  hooks/          # Custom React hooks
  lib/            # Utilities and helpers
  styles.css      # Global styles
  start.ts        # TanStack Start entry (middleware)
```

## Authentication (Clerk)

Authentication is fully wired via `@clerk/tanstack-react-start`.

| Route | Behavior |
|---|---|
| `/sign-in` | Embedded Clerk sign-in (email + Google OAuth) |
| `/sign-up` | Embedded Clerk sign-up with email verification |
| `/dashboard/*` | Protected — redirects unauthenticated users to `/sign-in` |

**Session management** is handled by Clerk middleware (`clerkMiddleware` in `src/start.ts`).  
**User profile & sign-out** are accessible via the `UserButton` in the top navbar and landing nav.  
**Post-login redirect**: both sign-in and sign-up redirect to `/dashboard` on success.

## Environment variables

| Variable | Description | Where set |
|---|---|---|
| `VITE_APP_NAME` | App display name | Shared env var |
| `VITE_APP_URL` | Public app URL | Shared env var |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (pk_…) — **required** | Replit Secret |
| `CLERK_SECRET_KEY` | Clerk secret key (sk_…) — **required** | Replit Secret |
| `DATABASE_URL` | PostgreSQL connection string — **auto-managed by Replit** | Runtime |
| `OPENAI_API_KEY` | OpenAI key (optional — for AI features) | Replit Secret |
| `ANTHROPIC_API_KEY` | Anthropic key (optional — for AI features) | Replit Secret |

## PDF Upload module

Located in `src/components/documents/` and `backend/`. Features:
- Drag & drop + browse-file upload of multiple PDFs
- Per-file upload progress bar (XHR with `onprogress`)
- Client-side validation: PDF-only, 50 MB max per file
- Inline rename (click pencil icon on any document card)
- Delete with confirmation dialog
- Sonner toasts for success / error feedback

Backend endpoints (FastAPI, `backend/main.py`):
- `POST /api/documents/upload` — upload one or more PDFs, saves to `uploads/pdfs/`, stores metadata in PostgreSQL
- `GET /api/documents` — list the current user's documents
- `PATCH /api/documents/{id}/rename` — rename a document
- `DELETE /api/documents/{id}` — delete document + file from disk

All endpoints are user-scoped via the `x-user-id` request header (set by the frontend from Clerk's `userId`).

## User preferences

- Keep the existing TanStack Start / bun stack — do not migrate to other frameworks.
