"use client";

import React from "react";
import Logo from "@/components/logo";
import Link from "next/link";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
} from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Tutorials", href: "#" },
    { label: "Community", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#contact" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@fastflow.dev", label: "Email" },
];

const Footer = () => {
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="mb-5">
              <Logo />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              The visual workflow builder for modern web scraping and browser
              automation. Extract data from any website with AI-powered prompts.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-foreground/5 text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-foreground text-sm mb-4 tracking-wide">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} FastFlow. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            Made with{" "}
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" /> for
            the data community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
