import { Bell, Search } from "lucide-react";
import { UserButton } from "@clerk/tanstack-react-start";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./theme-toggle";

export function TopNavbar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background/80 px-3 backdrop-blur-md sm:px-4">
      <SidebarTrigger className="shrink-0" />
      <Separator orientation="vertical" className="mx-1 h-5" />

      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search documents, chats…"
          className="h-9 pl-8"
          aria-label="Search"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-[1.15rem] w-[1.15rem]" />
        </Button>
        <ThemeToggle />
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
      </div>
    </header>
  );
}
