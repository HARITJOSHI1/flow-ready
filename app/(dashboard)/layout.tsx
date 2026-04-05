"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import DesktopSidebar from "@/components/dashboard/sidebar";
import BreadcrumbHeader from "@/components/header/breadcrumb-header";
import { ModeToggle } from "@/components/modals/theme-modal-toggle";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between py-4 px-6 h-[50px] container">
          <BreadcrumbHeader />

          <div className="flex items-center gap-1">
            <ModeToggle />
            <SignedIn>
              <UserButton
                appearance={{
                  baseTheme:
                    resolvedTheme === "dark" ||
                    resolvedTheme === "system" ||
                    resolvedTheme === undefined
                      ? dark
                      : undefined,
                }}
              />
            </SignedIn>
          </div>
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
