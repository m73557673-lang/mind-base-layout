import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
}

export function BrandLogo({ className, showText = true }: BrandLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand to-[oklch(from_var(--color-brand)_calc(l+0.15)_c_h)] text-brand-foreground shadow-soft">
        <FileText className="h-4 w-4" />
      </div>
      {showText && (
        <span className="text-base font-semibold tracking-tight">
          DocMind <span className="text-gradient-brand">AI</span>
        </span>
      )}
    </div>
  );
}
