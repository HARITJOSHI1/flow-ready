"use client";

import React from "react";
import { motion } from "motion/react";
import { pricingTiers } from "./constants/pricing";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const PricingSection = () => {
  const router = useRouter();

  return (
    <section
      id="pricing"
      className="relative py-28 md:py-36 overflow-hidden"
    >
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

      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300 mb-6">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Simple,{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              transparent
            </span>{" "}
            pricing
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div
                className={cn(
                  "relative h-full rounded-2xl border p-8 transition-all duration-500",
                  tier.popular
                    ? "border-primary/40 bg-gradient-to-b from-primary/5 to-transparent shadow-xl shadow-primary/5 scale-[1.02] md:scale-105"
                    : "border-border/50 bg-card/50 backdrop-blur-sm hover:border-border"
                )}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25">
                      Most Popular
                    </span>
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
