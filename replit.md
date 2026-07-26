# DocMind AI

A "chat with your PDFs" web app — upload documents, ask questions, get cited answers.

## Stack

- **TanStack Start** (SSR-capable React framework)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** component library
- **Bun** as the package manager and runtime

## Running the app

```sh
bun run dev --port 5000 --host 0.0.0.0
```

The dev server starts on port 5000. The configured Replit workflow (`Start application`) runs this automatically.

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

Copy `.env.example` to `.env` and fill in values as needed:

| Variable | Description |
|---|---|
| `VITE_APP_NAME` | App display name |
| `VITE_APP_URL` | Public app URL |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (pk_…) — **required** |
| `CLERK_SECRET_KEY` | Clerk secret key (sk_…) — **required** |
| `OPENAI_API_KEY` | OpenAI key (optional — for AI features) |
| `ANTHROPIC_API_KEY` | Anthropic key (optional — for AI features) |

## User preferences

- Keep the existing TanStack Start / bun stack — do not migrate to other frameworks.
