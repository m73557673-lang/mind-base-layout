---
name: Clerk TanStack Start setup
description: How Clerk auth is wired into this project and known gotchas to avoid.
---

# Clerk + TanStack Start integration

## Setup summary
- Package: `@clerk/tanstack-react-start@1.4.23`
- Middleware: `clerkMiddleware()` added as first item in `requestMiddleware` array in `src/start.ts`
- Provider: `ClerkProvider` from `@clerk/tanstack-react-start` wraps `QueryClientProvider` in `RootComponent` (`src/routes/__root.tsx`)
- Protected routes: `beforeLoad` using `auth()` from `@clerk/tanstack-react-start/server`, throws `redirect({ to: "/sign-in" })` when `userId` is null

## Known gotchas

### `SignedIn` / `SignedOut` not available as named ESM exports
`@clerk/tanstack-react-start` declares `export * from "@clerk/react"` in its TypeScript types, but Vite's ESM build of `dist/index.js` does NOT re-export `SignedIn` / `SignedOut` at runtime. Importing them causes `SyntaxError: does not provide an export named 'SignedIn'`.
**Fix:** Use `useAuth()` hook for conditional rendering instead.

**Why:** The CJS/ESM bundle split in `@clerk/tanstack-react-start` only re-exports a subset of `@clerk/react` exports in the ESM build that Vite processes.

**How to apply:** Any time you need `<SignedIn>` or `<SignedOut>` behavior, use `const { isSignedIn, isLoaded } = useAuth()` and conditional JSX.

### Keyless preview limitation
The imported app can render Clerk's sign-in UI in keyless/development mode, but protected dashboard routes are not a reliable verification target until matching Clerk publishable and secret keys are configured in the workspace.

**Why:** The preview reported Clerk session refresh redirect loops when no matching project keys were present.

**How to apply:** Treat the sign-in screen as the expected unauthenticated preview state; configure the two Clerk keys before testing an authenticated dashboard flow or deploying.

### Stale Vite cache causes "multiple React copies" error
After adding `@clerk/tanstack-react-start`, the Vite dep cache can serve an old `react.js` bundle hash while Clerk's bundle uses a newer one, causing `TypeError: Cannot read properties of null (reading 'useContext')`.
**Fix:** `rm -rf node_modules/.vite .cache` then restart.

### ClerkProvider placement
Must be inside `RootComponent` (a route component rendered inside TanStack Router's `RouterProvider`), not in `RootShell`. `ClerkProvider` calls `useNavigate` internally, which requires the TanStack Router context.
