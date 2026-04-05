"use client";

import React from "react";
import { motion } from "motion/react";

/**
 * Floating decorative dots – subtle animated grid pattern.
 */
export const FloatingDots = ({
  className = "",
  count = 12,
}: {
  className?: string;
  count?: number;
}) => {
  const dots = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 4,
      })),
    [count]
  );

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-primary/10 dark:bg-primary/20"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

/**
 * Animated connection lines – reminiscent of workflow node connections.
 */
export const ConnectionLines = ({ className = "" }: { className?: string }) => (
  <motion.svg
    className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    viewBox="0 0 1200 400"
    preserveAspectRatio="none"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 0.15 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
  >
    <motion.path
      d="M0,200 Q300,100 600,200 Q900,300 1200,200"
      fill="none"
      stroke="url(#lineGrad1)"
      strokeWidth="1.5"
      strokeDasharray="8 6"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
    <motion.path
      d="M0,250 Q400,150 600,250 Q800,350 1200,230"
      fill="none"
      stroke="url(#lineGrad2)"
      strokeWidth="1"
      strokeDasharray="6 8"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2.5, delay: 0.3, ease: "easeInOut" }}
    />
    <defs>
      <linearGradient id="lineGrad1" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="rgba(139,92,246,0.4)" />
        <stop offset="0.5" stopColor="rgba(6,182,212,0.4)" />
        <stop offset="1" stopColor="rgba(236,72,153,0.4)" />
      </linearGradient>
      <linearGradient id="lineGrad2" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="rgba(236,72,153,0.3)" />
        <stop offset="0.5" stopColor="rgba(168,85,247,0.3)" />
        <stop offset="1" stopColor="rgba(34,211,153,0.3)" />
      </linearGradient>
    </defs>
  </motion.svg>
);

// Fixed blob path — using a single static 'd' value to avoid undefined errors,
// with a subtle scale+rotate morph instead of animating the 'd' attribute.
const BLOB_PATH =
  "M44.3,-62.5C56.4,-53.6,64.8,-39.3,70.2,-23.9C75.6,-8.5,78,8,72.8,21.6C67.6,35.2,54.8,45.9,41.1,54.1C27.4,62.3,12.8,68,-2.4,71.1C-17.6,74.2,-33.4,74.7,-45.6,67.3C-57.8,59.9,-66.4,44.6,-71.2,28.4C-76,12.2,-77,-4.9,-72.2,-19.9C-67.4,-34.9,-56.8,-47.8,-43.8,-56.4C-30.8,-65,-15.4,-69.3,0.6,-70.1C16.6,-70.9,32.2,-71.4,44.3,-62.5Z";

/**
 * Morphing blob decoration — uses scale/rotate morph instead of
 * animated 'd' attribute (which causes "d: undefined" console errors).
 */
export const MorphingBlob = ({
  className = "",
  color = "rgba(139,92,246,0.08)",
}: {
  className?: string;
  color?: string;
}) => (
  <motion.svg
    className={`pointer-events-none ${className}`}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    animate={{
      scale: [1, 1.08, 0.95, 1.05, 1],
      rotate: [0, 8, -5, 3, 0],
    }}
    transition={{
      duration: 14,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <path d={BLOB_PATH} fill={color} transform="translate(100 100)" />
  </motion.svg>
);

/**
 * Animated sparkle particles around an element.
 */
export const SparkleGroup = ({
  className = "",
}: {
  className?: string;
}) => {
  const sparkles = [
    { x: "10%", y: "20%", delay: 0, size: 4 },
    { x: "85%", y: "15%", delay: 0.5, size: 3 },
    { x: "70%", y: "80%", delay: 1, size: 5 },
    { x: "20%", y: "75%", delay: 1.5, size: 3 },
    { x: "50%", y: "10%", delay: 0.8, size: 4 },
    { x: "90%", y: "50%", delay: 2, size: 3 },
  ];

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: s.x, top: s.y }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
            repeatDelay: 1.5,
          }}
        >
          <svg width={s.size * 4} height={s.size * 4} viewBox="0 0 16 16" fill="none">
            <path
              d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
              fill="rgba(168,85,247,0.5)"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

/**
 * Section blending gradient — overlays at the top/bottom of each section
 * to create a seamless visual transition between adjacent sections.
 */
export const SectionBlend = ({
  className = "",
  position = "both",
}: {
  className?: string;
  position?: "top" | "bottom" | "both";
}) => (
  <>
    {(position === "top" || position === "both") && (
      <div
        className={`absolute top-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b from-background to-transparent pointer-events-none z-[1] ${className}`}
      />
    )}
    {(position === "bottom" || position === "both") && (
      <div
        className={`absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-background to-transparent pointer-events-none z-[1] ${className}`}
      />
    )}
  </>
);
