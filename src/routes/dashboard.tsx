import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TopNavbar } from "@/components/top-navbar";
import { PageLoader } from "@/components/page-loader";

const getCurrentUser = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await auth();
  return { userId };
});

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const { userId } = await getCurrentUser();
    if (userId === null) {
      throw redirect({ to: "/sign-in" });
    }
  },
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
