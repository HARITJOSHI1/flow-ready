"use client";
import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  ShieldCheckIcon,
} from "lucide-react";
import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";

type Props = {};

const routes = [
  {
    label: "Home",
    icon: HomeIcon,
    href: "dashboard",
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

      <div className="p-2">TODO CREDITS</div>
      <div className="flex flex-col p-2">
        {routes.map((route) => (
          <Link
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
    </div>
  );
};

export default DesktopSidebar;
