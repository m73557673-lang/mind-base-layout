import { Link } from "@tanstack/react-router";
import { useAuth, UserButton } from "@clerk/tanstack-react-start";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function LandingNav() {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" aria-label="DocMind AI home">
          <BrandLogo />
        </Link>
        <nav className="ml-6 hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">Features</a>
          <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
          <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />

          {isLoaded && isSignedIn ? (
            <>
              <Button asChild size="sm" variant="outline">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                    userButtonPopoverCard:
                      "shadow-elegant border border-border bg-card rounded-2xl",
                    userButtonPopoverActionButton: "hover:bg-accent text-foreground",
                    userButtonPopoverActionButtonText: "text-foreground",
                    userButtonPopoverFooter: "hidden",
                  },
                }}
              />
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link to="/sign-in">Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/sign-up">Get started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
