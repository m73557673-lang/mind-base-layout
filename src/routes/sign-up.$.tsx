// Catch-all for Clerk's path-based routing sub-pages:
//   /sign-up/sso-callback
//   /sign-up/continue
//   /sign-up/verify-email-address
// Clerk's <SignUp> component handles the actual rendering for each step.
import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "@clerk/tanstack-react-start";
import { BrandLogo } from "@/components/brand-logo";

export const Route = createFileRoute("/sign-up/$")({
  component: SignUpCatchAll,
});

function SignUpCatchAll() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mb-8">
        <BrandLogo />
      </div>
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        fallbackRedirectUrl="/dashboard"
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "shadow-elegant border border-border bg-card rounded-2xl",
            headerTitle: "text-foreground font-semibold",
            headerSubtitle: "text-muted-foreground",
            socialButtonsBlockButton:
              "border border-border bg-background text-foreground hover:bg-accent",
            formFieldInput:
              "bg-background border-border text-foreground placeholder:text-muted-foreground",
            formButtonPrimary: "bg-brand text-brand-foreground hover:opacity-90",
            footerActionLink: "text-brand hover:text-brand/80",
          },
        }}
      />
    </div>
  );
}
