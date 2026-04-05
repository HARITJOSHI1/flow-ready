"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

/* ────────────────────────────────────────────
   ManifestoSection — inspired by onassemble.com's
   scroll-driven word-by-word opacity reveal.
   
   As the user scrolls, each word transitions from
   a faded grey to full contrast, creating a
   "reading spotlight" effect. Inline SVG icons add
   visual interest between the text.
──────────────────────────────────────────── */

/**
 * Small inline SVG icons interspersed with text
 */
const InlineSvgs = {
  workflow: (
    <motion.svg
      className="inline-block align-middle mx-1"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="8" cy="16" r="4" fill="rgba(139,92,246,0.4)" stroke="rgba(139,92,246,0.7)" strokeWidth="1" />
      <circle cx="24" cy="16" r="4" fill="rgba(6,182,212,0.4)" stroke="rgba(6,182,212,0.7)" strokeWidth="1" />
      <line x1="12" y1="16" x2="20" y2="16" stroke="rgba(168,85,247,0.5)" strokeWidth="1.5" strokeDasharray="2 2" />
    </motion.svg>
  ),
  sparkle: (
    <motion.svg
      className="inline-block align-middle mx-1"
      width="28"
      height="28"
      viewBox="0 0 16 16"
      fill="none"
      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
        fill="rgba(251,191,36,0.7)"
      />
    </motion.svg>
  ),
  globe: (
    <motion.svg
      className="inline-block align-middle mx-1"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      animate={{ rotate: [0, 15, -15, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <circle cx="15" cy="15" r="12" stroke="rgba(34,211,153,0.5)" strokeWidth="1.5" fill="rgba(34,211,153,0.08)" />
      <ellipse cx="15" cy="15" rx="6" ry="12" stroke="rgba(34,211,153,0.35)" strokeWidth="1" fill="none" />
      <line x1="3" y1="15" x2="27" y2="15" stroke="rgba(34,211,153,0.3)" strokeWidth="1" />
    </motion.svg>
  ),
  bolt: (
    <motion.svg
      className="inline-block align-middle mx-1"
      width="24"
      height="28"
      viewBox="0 0 24 28"
      fill="none"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M14 2L4 16h7l-3 10L20 10h-7l3-8z"
        fill="rgba(251,191,36,0.3)"
        stroke="rgba(251,191,36,0.7)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </motion.svg>
  ),
  data: (
    <motion.svg
      className="inline-block align-middle mx-1"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    >
      <rect x="2" y="2" width="24" height="24" rx="6" stroke="rgba(6,182,212,0.5)" strokeWidth="1" fill="rgba(6,182,212,0.06)" />
      {[8, 14, 20].map((x) =>
        [8, 14, 20].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="rgba(6,182,212,0.5)" />
        ))
      )}
    </motion.svg>
  ),
};

/**
 * The manifesto content — words and inline SVGs
 * Each item is either a string (word) or a React node (inline SVG)
 */
const MANIFESTO_LINES = [
  {
    content: [
      "We believe web scraping should be", InlineSvgs.sparkle, "effortless.",
    ],
  },
  {
    content: [
      "No more writing brittle selectors.", InlineSvgs.workflow,
      "No more broken pipelines.",
    ],
  },
  {
    content: [
      "Just describe", InlineSvgs.bolt, "what you need in plain language,",
    ],
  },
  {
    content: [
      "and let AI", InlineSvgs.sparkle, "build the extraction logic for you.",
    ],
  },
  {
    content: [
      "Connect nodes.", InlineSvgs.workflow, "Define flows.", InlineSvgs.data, "Extract data.",
    ],
  },
  {
    content: [
      "From any website,", InlineSvgs.globe, "at any scale, in real time.",
    ],
  },
  {
    content: [
      "FastFlow turns hours of work into", InlineSvgs.bolt, "seconds.",
    ],
  },
];

/**
 * A single word/element that fades from dim to bright based on scroll
 */
const ScrollWord = ({
  children,
  progress,
  start,
  end,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) => {
  const opacity = useTransform(progress, [start, end], [0.12, 1]);

  return (
    <motion.span style={{ opacity }}>
      {children}
    </motion.span>
  );
};

export default function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Flatten all content into indexable items for staggered reveal
  const allItems: { content: React.ReactNode; isInline: boolean }[] = [];
  MANIFESTO_LINES.forEach((line) => {
    line.content.forEach((item) => {
      if (typeof item === "string") {
        // Split string into individual words
        item.split(" ").filter(Boolean).forEach((word) => {
          allItems.push({ content: word, isInline: false });
        });
      } else {
        allItems.push({ content: item, isInline: true });
      }
    });
  });

  const totalItems = allItems.length;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[200vh] bg-background"
      id="manifesto"
    >
      {/* Sticky container that holds the text */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background treatment */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />

        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary/[0.04] blur-[150px]" />
        </div>

        {/* The text that reveals word-by-word */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-x-[0.35em] gap-y-3 text-2xl md:text-4xl lg:text-5xl font-bold leading-snug tracking-tight text-center"
          >
            {allItems.map((item, i) => {
              const itemStart = 0.1 + (i / totalItems) * 0.6;
              const itemEnd = itemStart + 0.08;

              if (item.isInline) {
                return (
                  <ScrollWord
                    key={`inline-${i}`}
                    progress={scrollYProgress}
                    start={itemStart}
                    end={itemEnd}
                  >
                    {item.content}
                  </ScrollWord>
                );
              }

              return (
                <ScrollWord
                  key={`word-${i}`}
                  progress={scrollYProgress}
                  start={itemStart}
                  end={itemEnd}
                >
                  <span className="text-foreground">{item.content as string}</span>
                </ScrollWord>
              );
            })}
          </motion.div>

          {/* Scroll indicator at the bottom */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.15, 0.7, 0.85], [0, 1, 1, 0]),
            }}
          >
            <span className="text-xs text-muted-foreground tracking-widest uppercase">
              Keep scrolling
            </span>
            <motion.div
              className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-2 rounded-full bg-muted-foreground/50"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
