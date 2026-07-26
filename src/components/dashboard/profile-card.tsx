import { useUser } from "@clerk/tanstack-react-start";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ProfileCard() {
  const { user } = useUser();
  const name = user?.fullName || user?.firstName || "Workspace member";
  const email = user?.primaryEmailAddress?.emailAddress || "Your account";
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="overflow-hidden border-border/70 bg-gradient-to-br from-primary to-slate-800 text-primary-foreground shadow-elegant dark:from-card dark:to-accent">
      <CardContent className="relative p-5">
        <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-brand/20 blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-white/20">
              <AvatarImage src={user?.imageUrl} alt={name} />
              <AvatarFallback className="bg-brand text-brand-foreground">{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{name}</p>
              <p className="mt-1 flex items-center gap-1 truncate text-xs text-primary-foreground/65">
                <Mail className="h-3 w-3" /> {email}
              </p>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium">
              <ShieldCheck className="h-3 w-3 text-emerald-300" /> Pro workspace
            </span>
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="h-8 bg-white/10 text-white hover:bg-white/20"
            >
              <Link to="/dashboard/settings">
                Manage <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
