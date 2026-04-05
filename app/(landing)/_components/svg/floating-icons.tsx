"use client";

import React from "react";
import { motion, type MotionValue } from "motion/react";
import { useTheme } from "next-themes";

/* ────────────────────────────────────────────
   Individual Floating SVG shapes – thematic 
   to web-scraping / workflow / AI automation.
   
   ▸ Dark-mode aware: uses glassmorphic dark fills
     with colored glowing borders & inner elements
   ▸ Accepts optional scrollY for parallax
──────────────────────────────────────────── */

type FloatingProps = {
  className?: string;
  size?: number;
  /** Supply a MotionValue for scroll-driven parallax Y offset */
  scrollY?: MotionValue<number>;
};

/** Browser window icon */
export const FloatingBrowser = ({
  className = "",
  size = 80,
  scrollY,
}: FloatingProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <motion.div
      className={className}
      style={scrollY ? { y: scrollY } : undefined}
      animate={{ y: scrollY ? undefined : [0, -14, 0], rotate: [0, 3, -2, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: isDark ? "drop-shadow(0 0 18px rgba(139,92,246,0.3))" : "drop-shadow(0 4px 12px rgba(0,0,0,0.08))" }}
      >
        <rect
          x="4" y="10" width="72" height="56" rx="14"
          fill={isDark ? "rgba(30,20,50,0.85)" : "rgba(255,255,255,0.95)"}
          stroke={isDark ? "rgba(139,92,246,0.45)" : "rgba(139,92,246,0.25)"}
          strokeWidth="1.5"
        />
        {/* Title bar */}
        <rect
          x="4" y="10" width="72" height="16" rx="14"
          fill={isDark ? "rgba(139,92,246,0.2)" : "rgba(139,92,246,0.1)"}
        />
        <circle cx="18" cy="18" r="3" fill="#f87171" />
        <circle cx="28" cy="18" r="3" fill="#fbbf24" />
        <circle cx="38" cy="18" r="3" fill="#34d399" />
        {/* Content lines */}
        <rect x="16" y="34" width="48" height="4" rx="2" fill={isDark ? "rgba(168,85,247,0.35)" : "rgba(139,92,246,0.18)"} />
        <rect x="16" y="42" width="32" height="4" rx="2" fill={isDark ? "rgba(168,85,247,0.25)" : "rgba(139,92,246,0.13)"} />
        <rect x="16" y="50" width="40" height="4" rx="2" fill={isDark ? "rgba(168,85,247,0.18)" : "rgba(139,92,246,0.08)"} />
        {/* Inner glow */}
        {isDark && (
          <rect x="10" y="30" width="60" height="30" rx="6" fill="rgba(139,92,246,0.04)" />
        )}
      </svg>
    </motion.div>
  );
};

/** Workflow / node-graph icon */
export const FloatingWorkflow = ({
  className = "",
  size = 72,
  scrollY,
}: FloatingProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <motion.div
      className={className}
      style={scrollY ? { y: scrollY } : undefined}
      animate={{ y: scrollY ? undefined : [0, 12, 0], rotate: [0, -4, 2, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: isDark ? "drop-shadow(0 0 16px rgba(6,182,212,0.3))" : "drop-shadow(0 4px 12px rgba(0,0,0,0.08))" }}
      >
        <rect
          width="72" height="72" rx="18"
          fill={isDark ? "rgba(15,30,40,0.85)" : "rgba(255,255,255,0.95)"}
          stroke={isDark ? "rgba(6,182,212,0.4)" : "rgba(6,182,212,0.2)"}
          strokeWidth="1.5"
        />
        {/* Nodes */}
        <circle cx="20" cy="22" r="7"
          fill={isDark ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.2)"}
          stroke={isDark ? "rgba(139,92,246,0.6)" : "rgba(139,92,246,0.45)"}
          strokeWidth="1.5"
        />
        <circle cx="52" cy="22" r="7"
          fill={isDark ? "rgba(6,182,212,0.3)" : "rgba(6,182,212,0.2)"}
          stroke={isDark ? "rgba(6,182,212,0.6)" : "rgba(6,182,212,0.45)"}
          strokeWidth="1.5"
        />
        <circle cx="36" cy="50" r="7"
          fill={isDark ? "rgba(236,72,153,0.3)" : "rgba(236,72,153,0.2)"}
          stroke={isDark ? "rgba(236,72,153,0.6)" : "rgba(236,72,153,0.45)"}
          strokeWidth="1.5"
        />
        {/* Connections */}
        <line x1="26" y1="25" x2="30" y2="44"
          stroke={isDark ? "rgba(139,92,246,0.45)" : "rgba(139,92,246,0.25)"}
          strokeWidth="1.5" strokeDasharray="3 3"
        />
        <line x1="46" y1="25" x2="42" y2="44"
          stroke={isDark ? "rgba(6,182,212,0.45)" : "rgba(6,182,212,0.25)"}
          strokeWidth="1.5" strokeDasharray="3 3"
        />
        <line x1="27" y1="22" x2="45" y2="22"
          stroke={isDark ? "rgba(168,85,247,0.35)" : "rgba(168,85,247,0.15)"}
          strokeWidth="1.5" strokeDasharray="3 3"
        />
      </svg>
    </motion.div>
  );
};

/** AI / brain sparkle icon */
export const FloatingAI = ({
  className = "",
  size = 64,
  scrollY,
}: FloatingProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <motion.div
      className={className}
      style={scrollY ? { y: scrollY } : undefined}
      animate={{
        y: scrollY ? undefined : [0, -10, 0],
        rotate: [0, 5, -3, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: isDark ? "drop-shadow(0 0 18px rgba(168,85,247,0.35))" : "drop-shadow(0 4px 12px rgba(0,0,0,0.08))" }}
      >
        <rect
          width="64" height="64" rx="16"
          fill={isDark ? "rgba(25,15,45,0.85)" : "rgba(255,255,255,0.95)"}
          stroke={isDark ? "rgba(168,85,247,0.4)" : "rgba(168,85,247,0.2)"}
          strokeWidth="1.5"
        />
        {/* Brain outline */}
        <path
          d="M32 16c-6 0-12 5-12 12 0 4 2 7 5 9v7h14v-7c3-2 5-5 5-9 0-7-6-12-12-12z"
          fill={isDark ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.12)"}
          stroke={isDark ? "rgba(168,85,247,0.55)" : "rgba(168,85,247,0.35)"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Sparkle dots — brighter in dark mode */}
        <circle cx="28" cy="28" r="2.5" fill={isDark ? "rgba(251,191,36,1)" : "rgba(251,191,36,0.8)"} />
        <circle cx="36" cy="26" r="2" fill={isDark ? "rgba(236,72,153,0.9)" : "rgba(236,72,153,0.7)"} />
        <circle cx="32" cy="33" r="2" fill={isDark ? "rgba(6,182,212,0.9)" : "rgba(6,182,212,0.7)"} />
      </svg>
    </motion.div>
  );
};

/** Data/grid icon */
export const FloatingData = ({
  className = "",
  size = 56,
  scrollY,
}: FloatingProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <motion.div
      className={className}
      style={scrollY ? { y: scrollY } : undefined}
      animate={{ y: scrollY ? undefined : [0, 10, 0], rotate: [0, -3, 4, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: isDark ? "drop-shadow(0 0 14px rgba(34,211,153,0.3))" : "drop-shadow(0 4px 12px rgba(0,0,0,0.08))" }}
      >
        <rect
          width="56" height="56" rx="14"
          fill={isDark ? "rgba(10,30,25,0.85)" : "rgba(255,255,255,0.95)"}
          stroke={isDark ? "rgba(34,211,153,0.4)" : "rgba(34,211,153,0.2)"}
          strokeWidth="1.5"
        />
        {/* Grid dots — brighter in dark mode */}
        {[14, 24, 34, 44].map((x) =>
          [14, 24, 34, 44].map((y) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="2.5"
              fill={isDark ? "rgba(34,211,153,0.55)" : "rgba(34,211,153,0.3)"}
            />
          ))
        )}
      </svg>
    </motion.div>
  );
};

/** Lightning / Zap icon */
export const FloatingZap = ({
  className = "",
  size = 52,
  scrollY,
}: FloatingProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <motion.div
      className={className}
      style={scrollY ? { y: scrollY } : undefined}
      animate={{ y: scrollY ? undefined : [0, -8, 0], rotate: [0, 6, -4, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: isDark ? "drop-shadow(0 0 14px rgba(251,191,36,0.3))" : "drop-shadow(0 4px 12px rgba(0,0,0,0.08))" }}
      >
        <rect
          width="52" height="52" rx="13"
          fill={isDark ? "rgba(35,25,10,0.85)" : "rgba(255,255,255,0.95)"}
          stroke={isDark ? "rgba(251,191,36,0.45)" : "rgba(251,191,36,0.25)"}
          strokeWidth="1.5"
        />
        <path
          d="M28 10L14 30h10l-4 14L38 22H28l4-12z"
          fill={isDark ? "rgba(251,191,36,0.3)" : "rgba(251,191,36,0.2)"}
          stroke={isDark ? "rgba(251,191,36,0.75)" : "rgba(251,191,36,0.5)"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
};

/** Shield / security icon */
export const FloatingShield = ({
  className = "",
  size = 48,
  scrollY,
}: FloatingProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <motion.div
      className={className}
      style={scrollY ? { y: scrollY } : undefined}
      animate={{ y: scrollY ? undefined : [0, 8, 0], rotate: [0, -2, 3, 0] }}
      transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: isDark ? "drop-shadow(0 0 14px rgba(99,102,241,0.3))" : "drop-shadow(0 4px 12px rgba(0,0,0,0.08))" }}
      >
        <rect
          width="48" height="48" rx="12"
          fill={isDark ? "rgba(20,15,45,0.85)" : "rgba(255,255,255,0.95)"}
          stroke={isDark ? "rgba(99,102,241,0.4)" : "rgba(99,102,241,0.2)"}
          strokeWidth="1.5"
        />
        <path
          d="M24 8L12 14v10c0 8 5 14 12 18 7-4 12-10 12-18V14L24 8z"
          fill={isDark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.12)"}
          stroke={isDark ? "rgba(99,102,241,0.5)" : "rgba(99,102,241,0.35)"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 24l4 4 6-8"
          stroke={isDark ? "rgba(34,197,94,0.8)" : "rgba(34,197,94,0.55)"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </motion.div>
  );
};
