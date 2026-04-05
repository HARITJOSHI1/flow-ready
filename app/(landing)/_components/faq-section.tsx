"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { faqs } from "./constants/faqs";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { SvgHighlight } from "./svg/svg-highlight";
import { MorphingBlob, SectionBlend } from "./svg/section-dividers";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.4], [40, 0]);

  return (
    <section ref={sectionRef} id="faq" className="relative py-28 md:py-36 overflow-hidden">
      {/* Section blend edges */}
      <SectionBlend />

      {/* Background */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          "[background-size:32px_32px]",
          "[background-image:radial-gradient(circle,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(circle,#262626_1px,transparent_1px)]"
        )}
      />

      {/* Morphing blobs */}
      <MorphingBlob
        className="absolute -top-16 -left-16 w-[380px] h-[380px] opacity-30 dark:opacity-15"
        color="rgba(251,191,36,0.05)"
      />
      <MorphingBlob
        className="absolute -bottom-16 -right-16 w-[350px] h-[350px] opacity-25 dark:opacity-[0.12]"
        color="rgba(251,146,60,0.04)"
      />

      {/* Animated Gradient Backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 90, 0],
            y: [0, -90, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-[5%] -left-[10%] w-[50%] h-[50%] rounded-full bg-amber-500/10 dark:bg-amber-600/15 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[5%] -right-[10%] w-[50%] h-[50%] rounded-full bg-orange-500/10 dark:bg-orange-600/15 blur-[120px]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background pointer-events-none" />

      {/* Floating question mark SVG decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[12%] right-[8%] opacity-[0.05] dark:opacity-[0.025]"
          animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="80" height="100" viewBox="0 0 80 100" fill="currentColor">
            <path d="M40 0C22 0 8 14 8 30c0 6 4 10 8 10s8-4 8-10c0-8 8-14 16-14s16 6 16 14c0 6-4 10-8 14-6 4-8 10-8 18v4c0 6 4 10 8 10s8-4 8-10v-4c0-4 2-6 4-8 8-6 16-16 16-24C76 14 62 0 40 0zM40 88c-6 0-10 4-10 10s4 10 10 10 10-4 10-10-4-10-10-10z" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute bottom-[15%] left-[5%] opacity-[0.04] dark:opacity-[0.02]"
          animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <svg width="50" height="60" viewBox="0 0 80 100" fill="currentColor">
            <path d="M40 0C22 0 8 14 8 30c0 6 4 10 8 10s8-4 8-10c0-8 8-14 16-14s16 6 16 14c0 6-4 10-8 14-6 4-8 10-8 18v4c0 6 4 10 8 10s8-4 8-10v-4c0-4 2-6 4-8 8-6 16-16 16-24C76 14 62 0 40 0zM40 88c-6 0-10 4-10 10s4 10 10 10 10-4 10-10-4-10-10-10z" />
          </svg>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8">
        {/* Section Header with parallax */}
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300 mb-6">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Frequently asked{" "}
            <SvgHighlight color="rgba(251,191,36,0.15)" delay={0.3}>
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                questions
              </span>
            </SvgHighlight>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Everything you need to know about FastFlow. Can&apos;t find what you&apos;re
            looking for? Reach out to our support team.
          </p>
        </motion.div>

        {/* FAQ Items with parallax */}
        <motion.div style={{ y: contentY }} className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div
                className={cn(
                  "rounded-xl border transition-all duration-300",
                  openIndex === index
                    ? "border-primary/20 bg-primary/[0.02] shadow-sm"
                    : "border-border/50 bg-card/30 hover:border-border"
                )}
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                >
                  <span className="font-medium text-foreground text-[15px] leading-snug">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 flex-shrink-0 transition-colors duration-300",
                        openIndex === index ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-muted-foreground text-[15px] leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
