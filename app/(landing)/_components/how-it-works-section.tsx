"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { steps } from "./constants/steps";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { SvgHighlight } from "./svg/svg-highlight";
import { AnimatedConnectingLine } from "./svg/animated-lines";
import { ConnectionLines, SectionBlend } from "./svg/section-dividers";

/**
 * Per-step inline SVG illustrations that visualize each step's concept.
 */
const stepSvgs = [
  // Step 01 — Design: node canvas
  (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
      <rect x="10" y="10" width="40" height="28" rx="8" stroke="rgba(139,92,246,0.4)" strokeWidth="1.5" fill="rgba(139,92,246,0.08)" />
      <rect x="90" y="10" width="40" height="28" rx="8" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" fill="rgba(6,182,212,0.08)" />
      <rect x="50" y="90" width="40" height="28" rx="8" stroke="rgba(236,72,153,0.4)" strokeWidth="1.5" fill="rgba(236,72,153,0.08)" />
      <line x1="50" y1="24" x2="90" y2="24" stroke="rgba(168,85,247,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="30" y1="38" x2="70" y2="90" stroke="rgba(139,92,246,0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="110" y1="38" x2="70" y2="90" stroke="rgba(6,182,212,0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="30" cy="24" r="3" fill="rgba(139,92,246,0.5)" />
      <circle cx="110" cy="24" r="3" fill="rgba(6,182,212,0.5)" />
      <circle cx="70" cy="104" r="3" fill="rgba(236,72,153,0.5)" />
    </svg>
  ),
  // Step 02 — AI Prompts: text bubble with sparkle
  (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
      <rect x="15" y="30" width="110" height="60" rx="16" stroke="rgba(6,182,212,0.35)" strokeWidth="1.5" fill="rgba(6,182,212,0.06)" />
      <path d="M45 90L55 110L65 90" fill="rgba(6,182,212,0.06)" stroke="rgba(6,182,212,0.35)" strokeWidth="1.5" />
      <rect x="30" y="48" width="60" height="5" rx="2.5" fill="rgba(6,182,212,0.2)" />
      <rect x="30" y="58" width="40" height="5" rx="2.5" fill="rgba(6,182,212,0.15)" />
      <rect x="30" y="68" width="50" height="5" rx="2.5" fill="rgba(6,182,212,0.1)" />
      {/* Sparkle */}
      <path d="M110 25L112 31L118 33L112 35L110 41L108 35L102 33L108 31L110 25Z" fill="rgba(251,191,36,0.6)" />
    </svg>
  ),
  // Step 03 — Run & Monitor: play button with progress
  (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
      <circle cx="70" cy="65" r="35" stroke="rgba(251,191,36,0.3)" strokeWidth="1.5" fill="rgba(251,191,36,0.05)" />
      <path d="M60 48L90 65L60 82Z" fill="rgba(251,191,36,0.3)" stroke="rgba(251,191,36,0.5)" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Progress bar */}
      <rect x="25" y="115" width="90" height="6" rx="3" fill="rgba(251,191,36,0.1)" stroke="rgba(251,191,36,0.2)" strokeWidth="1" />
      <rect x="25" y="115" width="55" height="6" rx="3" fill="rgba(251,191,36,0.35)" />
      <circle cx="80" cy="118" r="4" fill="rgba(251,191,36,0.6)" />
    </svg>
  ),
  // Step 04 — Export: document with arrow
  (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
      <rect x="30" y="15" width="60" height="80" rx="10" stroke="rgba(34,211,153,0.35)" strokeWidth="1.5" fill="rgba(34,211,153,0.06)" />
      <rect x="42" y="32" width="36" height="4" rx="2" fill="rgba(34,211,153,0.25)" />
      <rect x="42" y="42" width="28" height="4" rx="2" fill="rgba(34,211,153,0.2)" />
      <rect x="42" y="52" width="32" height="4" rx="2" fill="rgba(34,211,153,0.15)" />
      <rect x="42" y="62" width="24" height="4" rx="2" fill="rgba(34,211,153,0.1)" />
      {/* Export arrow */}
      <path d="M95 90L115 70L95 50" stroke="rgba(34,211,153,0.5)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="60" y1="70" x2="115" y2="70" stroke="rgba(34,211,153,0.4)" strokeWidth="2" strokeLinecap="round" />
      {/* JSON badge */}
      <rect x="80" y="105" width="42" height="20" rx="6" fill="rgba(34,211,153,0.15)" stroke="rgba(34,211,153,0.35)" strokeWidth="1" />
      <text x="101" y="119" textAnchor="middle" fill="rgba(34,211,153,0.7)" fontSize="10" fontWeight="600" fontFamily="monospace">JSON</text>
    </svg>
  ),
];

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const stepColors = [
    { dot: "rgba(139,92,246,0.6)", pulse: "rgba(139,92,246,0.2)" },
    { dot: "rgba(6,182,212,0.6)", pulse: "rgba(6,182,212,0.2)" },
    { dot: "rgba(251,191,36,0.6)", pulse: "rgba(251,191,36,0.2)" },
    { dot: "rgba(34,211,153,0.6)", pulse: "rgba(34,211,153,0.2)" },
  ];

  // Heading parallax
  const headingY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-28 md:py-36 overflow-hidden"
    >
      {/* Section blend edges */}
      <SectionBlend />

      {/* Connection lines background decoration */}
      <ConnectionLines className="opacity-20 dark:opacity-10" />

      {/* Animated Gradient Backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] -left-[5%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 dark:bg-cyan-600/15 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] -right-[5%] w-[60%] h-[60%] rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-[120px]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        {/* Section Header with parallax */}
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-300 mb-6">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            From idea to data in{" "}
            <SvgHighlight color="rgba(6,182,212,0.15)" delay={0.4}>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                four steps
              </span>
            </SvgHighlight>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            No complex setup, no steep learning curve. Go from zero to automated
            data extraction in minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          <AnimatedConnectingLine />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => {
              // Alternate layout: even=left, odd=right (for visual variety)
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={cn(
                    "relative flex flex-col items-start gap-6 group",
                    "md:flex-row md:gap-10",
                    !isEven && "md:flex-row-reverse"
                  )}
                >
                  {/* Step Number with pulsing ring */}
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{ backgroundColor: stepColors[index]?.pulse }}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
                    />
                    <div
                      className={cn(
                        "relative w-20 h-20 rounded-2xl flex items-center justify-center font-bold text-2xl tracking-tight transition-all duration-300 group-hover:scale-105",
                        step.bg,
                        step.accent
                      )}
                    >
                      {step.number}
                    </div>
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

                  {/* Step SVG illustration — larger, themed to each step */}
                  <motion.div
                    className={cn(
                      "hidden lg:flex items-center justify-center",
                      "opacity-60 dark:opacity-40 pointer-events-none",
                      "w-[160px] h-[160px] flex-shrink-0"
                    )}
                    initial={{ opacity: 0, scale: 0.7, rotate: isEven ? -10 : 10 }}
                    whileInView={{ opacity: 0.6, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.2, type: "spring" }}
                  >
                    {stepSvgs[index]}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
