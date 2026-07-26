import { BrandLogo } from "@/components/brand-logo";

export function LandingFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <BrandLogo />
        <p>© {new Date().getFullYear()} DocMind AI. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
          <a href="#" className="transition-colors hover:text-foreground">Terms</a>
        </div>
      </div>
    </footer>
  );
}
