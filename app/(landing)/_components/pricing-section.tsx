"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { pricingTiers } from "./constants/pricing";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { SvgHighlight } from "./svg/svg-highlight";
import { FloatingDots, SectionBlend } from "./svg/section-dividers";

const PricingSection = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // Stagger parallax for pricing cards
  const card0Y = useTransform(scrollYProgress, [0.1, 0.45], [50, 0]);
  const card1Y = useTransform(scrollYProgress, [0.15, 0.5], [60, 0]);
  const card2Y = useTransform(scrollYProgress, [0.2, 0.55], [70, 0]);
  const cardParallax = [card0Y, card1Y, card2Y];

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative py-28 md:py-36 overflow-hidden"
    >
      {/* Section blend edges */}
      <SectionBlend />

      {/* Animated Gradient Backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-[10%] -right-[5%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 dark:bg-emerald-600/15 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 21,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-cyan-500/10 dark:bg-cyan-600/15 blur-[120px]"
        />
      </div>

      {/* Floating particles */}
      <FloatingDots count={10} />

      {/* Decorative SVG shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Coin/circle decoration top-left */}
        <motion.div
          className="absolute top-[8%] left-[5%] opacity-[0.06] dark:opacity-[0.03]"
          animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="2" />
            <circle cx="40" cy="40" r="24" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <text x="40" y="46" textAnchor="middle" fill="currentColor" fontSize="24" fontWeight="bold">$</text>
          </svg>
        </motion.div>

        {/* Diamond shape decoration right */}
        <motion.div
          className="absolute bottom-[12%] right-[8%] opacity-[0.05] dark:opacity-[0.025]"
          animate={{ y: [0, 10, 0], rotate: [45, 50, 45] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="currentColor">
            <rect x="10" y="10" width="40" height="40" rx="4" transform="rotate(45 30 30)" />
          </svg>
        </motion.div>

        {/* Star decoration */}
        <motion.div
          className="absolute top-[50%] left-[3%] opacity-[0.04] dark:opacity-[0.02]"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <svg width="50" height="50" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" />
          </svg>
        </motion.div>
      </div>

      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header with parallax */}
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300 mb-6">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Simple,{" "}
            <SvgHighlight color="rgba(52,211,153,0.15)" delay={0.3}>
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                transparent
              </span>
            </SvgHighlight>{" "}
            pricing
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Pricing Cards — staggered parallax */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              style={{ y: cardParallax[index] }}
            >
              <div
                className={cn(
                  "group relative h-full rounded-2xl border p-8 transition-all duration-500",
                  tier.popular
                    ? "border-primary/40 bg-gradient-to-b from-primary/5 to-transparent shadow-xl shadow-primary/5 scale-[1.02] md:scale-105"
                    : "border-border/50 bg-card/50 backdrop-blur-sm hover:border-border hover:-translate-y-1"
                )}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <motion.span
                      className="px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25 inline-block"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Most Popular
                    </motion.span>
                  </div>
                )}

                {/* Tier info */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {tier.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-foreground tracking-tight">
                      {tier.price}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      /{tier.period}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => router.push("/dashboard")}
                  className={cn(
                    "w-full py-3 px-6 rounded-xl font-medium text-sm transition-all duration-300 mb-8",
                    tier.popular
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:opacity-90 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30"
                      : "bg-foreground/5 text-foreground hover:bg-foreground/10 border border-border/50"
                  )}
                >
                  {tier.cta}
                </button>

                {/* Divider */}
                <div className="h-px bg-border/50 mb-8" />

                {/* Features */}
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={cn(
                          "w-4 h-4 mt-0.5 flex-shrink-0",
                          tier.popular
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Hover glow for non-popular cards */}
                {!tier.popular && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
