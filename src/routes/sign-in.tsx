import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@clerk/tanstack-react-start";
import { BrandLogo } from "@/components/brand-logo";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [{ title: "Sign In — DocMind AI" }],
  }),
  component: SignInPage,
});

function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mb-8">
        <BrandLogo />
      </div>
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
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
            formButtonPrimary:
              "bg-brand text-brand-foreground hover:opacity-90",
            footerActionLink: "text-brand hover:text-brand/80",
            identityPreviewText: "text-foreground",
            identityPreviewEditButton: "text-brand",
          },
        }}
      />
    </div>
  );
}
