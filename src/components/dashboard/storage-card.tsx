import { ArrowUpRight, HardDrive, Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SectionHeading } from "./dashboard-card";
import { Button } from "@/components/ui/button";

export function StorageCard() {
  return (
    <Card className="border-border/70 bg-card/80 shadow-soft">
      <CardHeader className="pb-4">
        <SectionHeading
          title="Storage usage"
          description="Keep your workspace organized."
          action="/dashboard/documents"
        />
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-300">
            <HardDrive className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-end justify-between gap-2">
              <p className="text-sm font-semibold">
                16.8 MB <span className="font-normal text-muted-foreground">of 500 MB</span>
              </p>
              <span className="text-xs font-medium text-muted-foreground">3.4%</span>
            </div>
            <Progress value={3.4} className="h-2 bg-amber-500/10 [&>span]:bg-amber-500" />
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between border-t pt-4">
          <p className="text-xs text-muted-foreground">Free plan · 483.2 MB remaining</p>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-brand hover:text-brand"
          >
            <Link to="/dashboard/settings">
              <Plus className="h-3.5 w-3.5" /> Upgrade <ArrowUpRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
