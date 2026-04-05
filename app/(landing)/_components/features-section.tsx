"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { features } from "./constants/features";
import { cn } from "@/lib/utils";
import { SvgHighlight } from "./svg/svg-highlight";
import { FloatingDots, MorphingBlob, SparkleGroup, SectionBlend } from "./svg/section-dividers";
import type { MotionValue } from "motion/react";

/**
 * Individual feature card with its own parallax depth
 */
const FeatureCard = ({
  feature,
  index,
  sectionProgress,
}: {
  feature: (typeof features)[0];
  index: number;
  sectionProgress: MotionValue<number>;
}) => {
  // Each card has a slightly different parallax factor for depth
  const parallaxFactor = 15 + (index % 3) * 10;
  const cardY = useTransform(
    sectionProgress,
    [0, 0.5, 1],
    [parallaxFactor * 2, 0, -parallaxFactor]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ y: cardY }}
    >
      <div className="group relative h-full rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
        {/* Sparkle decoration on hover */}
        <SparkleGroup className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon with hover scale+rotate */}
        <motion.div
          className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br",
            feature.gradient,
            "shadow-lg"
          )}
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <feature.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight">
          {feature.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-[15px]">
          {feature.description}
        </p>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax for section heading
  const headingY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Parallax for decorative blobs
  const blobY1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [-30, 40]);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-28 md:py-36 overflow-hidden"
    >
      {/* Section blend edges */}
      <SectionBlend />

      {/* Background pattern */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          "[background-size:32px_32px]",
          "[background-image:radial-gradient(circle,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(circle,#262626_1px,transparent_1px)]"
        )}
      />
      
      {/* Animated Gradient Backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-violet-500/10 dark:bg-violet-600/15 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -120, 0],
            y: [0, 120, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] rounded-full bg-pink-500/10 dark:bg-pink-600/15 blur-[120px]"
        />
      </div>

      {/* Morphing blob decorations with parallax */}
      <motion.div style={{ y: blobY1 }}>
        <MorphingBlob
          className="absolute -top-20 -right-20 w-[400px] h-[400px] opacity-50 dark:opacity-30"
          color="rgba(139,92,246,0.06)"
        />
      </motion.div>
      <motion.div style={{ y: blobY2 }}>
        <MorphingBlob
          className="absolute -bottom-20 -left-20 w-[350px] h-[350px] opacity-40 dark:opacity-25"
          color="rgba(236,72,153,0.05)"
        />
      </motion.div>

      {/* Floating particles */}
      <FloatingDots count={16} />

      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header with parallax */}
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-primary/10 text-primary dark:bg-primary/20 dark:text-violet-300 mb-6">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Everything you need to{" "}
            <SvgHighlight color="rgba(139,92,246,0.15)" delay={0.3}>
              <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                scrape smarter
              </span>
            </SvgHighlight>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From browser automation to AI-powered extraction, FastFlow gives you
            the complete toolkit for modern web scraping.
          </p>
        </motion.div>

        {/* Feature Grid — each card has individual parallax depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              sectionProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
