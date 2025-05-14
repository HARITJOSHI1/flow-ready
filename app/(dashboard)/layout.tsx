import React from "react";
import { Separator } from "@/components/ui/separator";
import DesktopSidebar from "@/components/sidebar";
import BreadcrumbHeader from "@/components/breadcrumb-header";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between py-4 px-6 h-[50px] container">
          <BreadcrumbHeader />
        </header>

        <Separator />

        <div className="overflow-auto">
          <div className="flex-1 container py-4 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
