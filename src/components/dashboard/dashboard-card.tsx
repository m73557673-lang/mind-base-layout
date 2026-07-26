import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  accent: string;
  iconBackground: string;
  trend?: string;
  trendDirection?: "up" | "down";
  delay?: number;
}

export function DashboardCard({
  label,
  value,
  detail,
  icon: Icon,
  accent,
  iconBackground,
  trend,
  trendDirection = "up",
  delay = 0,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -3 }}
      className="h-full"
    >
      <Card className="group relative h-full overflow-hidden border-border/70 bg-card/80 shadow-soft transition-shadow hover:shadow-elegant">
        <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", accent)} />
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
          </div>
          <div className={cn("grid h-10 w-10 place-items-center rounded-xl", iconBackground)}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">{detail}</p>
          {trend && (
            <span
              className={cn(
                "inline-flex items-center gap-1 text-xs font-medium",
                trendDirection === "up"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400",
              )}
            >
              {trendDirection === "up" ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {trend}
            </span>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function SectionHeading({
  title,
  description,
  action,
  actionLabel = "View all",
}: {
  title: string;
  description?: string;
  action?: string;
  actionLabel?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action && (
        <Link
          to={action}
          className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-brand transition-colors hover:text-brand/80"
        >
          {actionLabel} <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
