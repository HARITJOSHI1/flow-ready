"use client";

import React from "react";
import { motion } from "motion/react";

/**
 * Animated vertical connecting path with gradient and pulse effect.
 * Used in the How It Works section to replace the static border line.
 */
export const AnimatedConnectingLine = ({
  className = "",
}: {
  className?: string;
}) => (
  <motion.svg
    className={`absolute left-[39px] top-0 bottom-0 w-4 h-full hidden md:block ${className}`}
    viewBox="0 0 16 500"
    preserveAspectRatio="none"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <defs>
      <linearGradient id="connectGrad" x1="0" y1="0" x2="0" y2="500" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="transparent" />
        <stop offset="0.15" stopColor="rgba(139,92,246,0.4)" />
        <stop offset="0.4" stopColor="rgba(6,182,212,0.4)" />
        <stop offset="0.65" stopColor="rgba(251,191,36,0.4)" />
        <stop offset="0.85" stopColor="rgba(34,211,153,0.4)" />
        <stop offset="1" stopColor="transparent" />
      </linearGradient>
    </defs>
    <motion.line
      x1="8"
      y1="0"
      x2="8"
      y2="500"
      stroke="url(#connectGrad)"
      strokeWidth="2"
      strokeDasharray="6 6"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
    {/* Pulse dot that travels down the line */}
    <motion.circle
      cx="8"
      cy="0"
      r="3"
      fill="rgba(139,92,246,0.6)"
      animate={{ cy: [0, 500] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "linear",
        repeatDelay: 1,
      }}
    />
  </motion.svg>
);

/**
 * Step connector node — the glowing circle at each step junction.
 */
export const StepNode = ({
  color = "rgba(139,92,246,0.5)",
  pulseColor = "rgba(139,92,246,0.2)",
  delay = 0,
}: {
  color?: string;
  pulseColor?: string;
  delay?: number;
}) => (
  <motion.div
    className="absolute hidden md:flex items-center justify-center"
    style={{ left: "31px", width: "16px", height: "16px" }}
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay, type: "spring" }}
  >
    <motion.div
      className="absolute w-4 h-4 rounded-full"
      style={{ backgroundColor: pulseColor }}
      animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, delay }}
    />
    <div
      className="w-3 h-3 rounded-full"
      style={{ backgroundColor: color }}
    />
  </motion.div>
);
