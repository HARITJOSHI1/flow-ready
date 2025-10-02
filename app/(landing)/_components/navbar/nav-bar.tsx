"use client";

import Logo from "@/components/logo";
import { ModeToggle } from "@/components/modals/theme-modal-toggle";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

type Props = {
  userId?: string;
};

const NAV_LINKS = [
  { href: "#", label: "Pricing" },
  { href: "#", label: "About" },
  { href: "#", label: "Contact" },
  { href: "#", label: "Features" },
];

const NavBar = ({ userId }: Props) => {
  const [open, setOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex justify-center w-full">
      <nav
        className={cn(
          "flex w-full items-center justify-between px-6 h-[60px] rounded-none border-b border-b-primary/20 dark:border-white/20 fixed dark:bg-neutral-500/15 backdrop-blur-2xl backdrop-saturate-150 shadow-lg z-40 md:w-[80%] md:rounded-full md:my-5 md:border md: border-primary/20"
        )}
      >
        {/* Desktop Nav */}
        <div className="hidden md:flex w-full items-center justify-between">
          <aside>
            <Logo />
          </aside>
          <ul className="flex items-center justify-center gap-8 w-full">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-primary dark:text-white/90 font-medium px-4 py-2 rounded-md hover:bg-primary/10 transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <aside className="flex gap-2 items-center ml-8">
            <Link
              href={"/dashboard"}
              className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80 transition"
            >
              {userId ? "Dashboard" : "Join"}
            </Link>
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
            <ModeToggle />
          </aside>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="flex md:hidden w-full items-center justify-between">
          <aside>
            <Logo />
          </aside>
          <div />

          <aside className="flex gap-2 items-center ml-8">
            <Link
              href={"/dashboard"}
              className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80 transition"
            >
              {userId ? "Dashboard" : "Join"}
            </Link>
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
            <ModeToggle />
            <button
              className="flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              aria-label="Open navigation menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="w-7 h-7 text-foreground" />
            </button>
          </aside>
        </div>
      </nav>

      {/* Mobile Nav Dropdown */}
      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed h-screen inset-0 z-40 bg-black/30 dark:bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setOpen(false)}
          />

          <div
            className="fixed h-full left-0 top-[60px] w-full z-50 dark:border-white/20 bg-white/80 dark:bg-neutral-500/15 backdrop-blur-2xl backdrop-saturate-150 shadow-lg animate-fadeInDown"
            style={{ animation: "fadeInDown 0.3s" }}
          >
            <ul className="flex flex-col gap-2 px-6 py-10 w-full mt-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block text-lg font-medium text-primary dark:text-white/90 px-4 py-3 rounded-md hover:bg-primary/10 transition"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <Link
                href={"/dashboard"}
                className="bg-primary mt-4 text-white p-2 px-4 rounded-md hover:bg-primary/80 transition w-full text-center"
              >
                {userId ? "Dashboard" : "Join"}
              </Link>
            </ul>

            <button
              className="absolute top-4 right-6 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
            >
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </>
      )}
      <style jsx global>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
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
