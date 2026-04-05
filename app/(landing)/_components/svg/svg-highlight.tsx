"use client";

import React from "react";
import { motion } from "motion/react";

/**
 * Wraps children with a soft, organic SVG glow/marker highlight —
 * inspired by the onassemble.com "time." text highlight.
 * Adapts to your violet/purple primary palette.
 */
export const SvgHighlight = ({
  children,
  color = "rgba(168,85,247,0.18)",
  className = "",
  delay = 0.5,
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
  delay?: number;
}) => (
  <span className={`relative inline-block ${className}`}>
    {/* The organic blob highlight behind the text */}
    <motion.svg
      className="absolute -inset-x-2 -inset-y-1 w-[calc(100%+16px)] h-[calc(100%+8px)] pointer-events-none"
      viewBox="0 0 120 50"
      preserveAspectRatio="none"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <motion.path
        d="M8,25 Q2,10 20,6 Q40,0 60,4 Q80,0 100,6 Q118,10 112,25 Q118,40 100,44 Q80,50 60,46 Q40,50 20,44 Q2,40 8,25Z"
        fill={color}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.1, ease: "easeInOut" }}
      />
    </motion.svg>
    <span className="relative z-10">{children}</span>
  </span>
);

/**
 * Animated underline SVG — a wavy hand-drawn underline beneath text.
 */
export const SvgUnderline = ({
  children,
  color = "rgba(168,85,247,0.5)",
  strokeWidth = 3,
  className = "",
  delay = 0.6,
}: {
  children: React.ReactNode;
  color?: string;
  strokeWidth?: number;
  className?: string;
  delay?: number;
}) => (
  <span className={`relative inline-block ${className}`}>
    <span className="relative z-10">{children}</span>
    <motion.svg
      className="absolute -bottom-1 left-0 w-full h-3 pointer-events-none"
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <motion.path
        d="M2,8 Q30,2 50,7 Q70,12 100,6 Q130,0 150,7 Q170,14 198,6"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.1, ease: "easeOut" }}
      />
    </motion.svg>
  </span>
);
