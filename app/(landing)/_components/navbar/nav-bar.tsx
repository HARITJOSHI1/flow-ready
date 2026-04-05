"use client";

import Logo from "@/components/common/logo";
import { ModeToggle } from "@/components/modals/theme-modal-toggle";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

type Props = {
  userId?: string;
};

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
];

const NavBar = ({ userId }: Props) => {
  const [open, setOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => setMounted(true), []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      }
    }
  };

  return (
    <div className="flex justify-center w-full">
      <nav
        className={cn(
          "flex w-full items-center justify-between px-6 h-[60px] rounded-none border-b border-b-primary/20 dark:border-white/20 fixed dark:bg-neutral-500/15 backdrop-blur-2xl backdrop-saturate-150 shadow-lg z-40 md:w-[80%] md:rounded-full md:my-5 md:border md:border-primary/20"
        )}
      >
        {/* Desktop Nav */}
        <div className="hidden md:flex w-full items-center justify-between">
          <aside>
            <Logo />
          </aside>
          <ul className="flex items-center justify-center gap-6 w-full">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-sm text-foreground/70 dark:text-white/70 font-medium px-3 py-2 rounded-lg hover:text-foreground dark:hover:text-white hover:bg-primary/5 transition-all duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <aside className="flex gap-2 items-center ml-8">
            <Link
              href={"/dashboard"}
              className="bg-primary text-white p-2 px-5 rounded-full text-sm font-medium hover:bg-primary/80 transition-all duration-200 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 whitespace-nowrap"
            >
              {userId ? "Dashboard" : "Get Started"}
            </Link>
            <UserButton
              appearance={{
                baseTheme:
                  mounted && (
                    resolvedTheme === "dark" ||
                    resolvedTheme === "system" ||
                    resolvedTheme === undefined
                  )
                    ? dark
                    : undefined,
              }}
            />
            <ModeToggle />
          </aside>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden w-full items-center justify-between">
          <aside>
            <Logo />
          </aside>
          <aside className="flex gap-2 items-center">
            <UserButton
              appearance={{
                baseTheme:
                  mounted && (
                    resolvedTheme === "dark" ||
                    resolvedTheme === "system" ||
                    resolvedTheme === undefined
                  )
                    ? dark
                    : undefined,
              }}
            />
            <ModeToggle />
            <button
              className="flex items-center justify-center p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              aria-label="Open navigation menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>
          </aside>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {open && (
        <>
          <div
            className="fixed h-screen inset-0 z-40 bg-black/30 dark:bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setOpen(false)}
          />

          <div
            className="fixed h-full left-0 top-[60px] w-full z-50 bg-background/95 backdrop-blur-2xl backdrop-saturate-150 shadow-lg"
            style={{ animation: "fadeInDown 0.3s" }}
          >
            <ul className="flex flex-col gap-1 px-6 py-8 w-full">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block text-lg font-medium text-foreground/80 px-4 py-3.5 rounded-xl hover:bg-primary/5 hover:text-foreground transition-all duration-200"
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}

              <div className="mt-4 px-4">
                <Link
                  href={"/dashboard"}
                  className="block bg-primary text-white p-3 rounded-xl hover:bg-primary/80 transition w-full text-center font-medium"
                >
                  {userId ? "Dashboard" : "Get Started"}
                </Link>
              </div>
            </ul>

            <button
              className="absolute top-4 right-6 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition hover:bg-primary/5"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
            >
              <X className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </>
      )}
      <style jsx global>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default NavBar;
