"use client";
import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  MenuIcon,
  ShieldCheckIcon,
} from "lucide-react";
import React from "react";
import Logo from "../common/logo";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useState } from "react";
import UserAvailableCreditsBadge from "../credits/user-available-credits-badge";

type Props = {};

const routes = [
  {
    label: "Home",
    icon: HomeIcon,
    href: "/dashboard",
  },
  {
    label: "Workflows",
    icon: Layers2Icon,
    href: "workflows",
  },
  {
    label: "Credentials",
    icon: ShieldCheckIcon,
    href: "credentials",
  },
  {
    label: "Billing",
    icon: CoinsIcon,
    href: "billing",
  },
];

const DesktopSidebar = (props: Props) => {
  const pathname = usePathname();

  //   find active route if none then default to home page route
  const activeRoute =
    routes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || routes[0];

  return (
    <div className="hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-primary/10 dark:bg-secnondary/40 dark:text-foreground text-muted-foreground border-r-2 border-separate backdrop-blur-2xl bg-opacity-20 dark:bg-opacity-70">
      <div className="flex itens-center justify-center gap-2 border-b-[1px] border-seperate p-4">
        <Logo />
      </div>

      <div className="p-2">
        <UserAvailableCreditsBadge />
      </div>
      <div className="flex flex-col gap-1 px-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href === "" ? "/" : route.href}
            className={buttonVariants({
              variant:
                route.href === activeRoute.href
                  ? "sidebarActiveItem"
                  : "sidebarItem",
            })}
          >
            <route.icon size={20} />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export const MobileSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  //   find active route if none then default to home page route
  const activeRoute =
    routes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || routes[0];

  return (
    <div className="block border-seperate bg-background md:hidden">
      <nav className="flex items-center justify-between pr-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-[400px] sm:w-[540px] space-y-4"
          >
            <Logo />
            <UserAvailableCreditsBadge />
            <div className="flex flex-col gap-1">
              {routes.map((route) => (
                <Link
                  onClick={() => setIsOpen(!isOpen)}
                  key={route.href}
                  href={route.href}
                  className={buttonVariants({
                    variant:
                      route.href === activeRoute.href
                        ? "sidebarActiveItem"
                        : "sidebarItem",
                  })}
                >
                  <route.icon size={20} />
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default DesktopSidebar;
