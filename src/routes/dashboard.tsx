import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TopNavbar } from "@/components/top-navbar";
import { PageLoader } from "@/components/page-loader";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — DocMind AI" },
      { name: "description", content: "Your DocMind AI workspace." },
      { property: "og:title", content: "Dashboard — DocMind AI" },
      { property: "og:description", content: "Manage documents and chats in your DocMind workspace." },
    ],
  }),
  component: DashboardLayout,
  pendingComponent: () => <PageLoader label="Loading workspace…" />,
});

function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex min-w-0 flex-1 flex-col">
          <TopNavbar />
          <main className="flex-1">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
