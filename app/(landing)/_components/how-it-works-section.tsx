"use client";

import React from "react";
import { motion } from "motion/react";
import { steps } from "./constants/steps";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="relative py-28 md:py-36 overflow-hidden"
    >
      {/* Animated Gradient Backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[10%] -left-[5%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 dark:bg-cyan-600/15 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[10%] -right-[5%] w-[60%] h-[60%] rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-[120px]"
        />
      </div>

      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-300 mb-6">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            From idea to data in{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              four steps
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            No complex setup, no steep learning curve. Go from zero to automated
            data extraction in minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden md:block" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative flex flex-col md:flex-row items-start gap-6 md:gap-10 group"
              >
                {/* Step Number */}
                <div
                  className={cn(
                    "flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center font-bold text-2xl tracking-tight transition-all duration-300 group-hover:scale-105",
                    step.bg,
                    step.accent
                  )}
                >
                  {step.number}
                </div>

                {/* Step Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                  <button
                    onClick={() => {
                      const el = document.getElementById("pricing");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={cn(
                      "inline-flex items-center gap-2 mt-5 text-sm font-medium transition-all duration-200 hover:gap-3",
                      step.accent
                    )}
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
