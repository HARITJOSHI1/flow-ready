import { MotionValue, motion, useTransform } from "motion/react";
import React from "react";

type Props = {
  opacity: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  edgeDraw: MotionValue<number>;
};

const Wave = ({ opacity, scrollYProgress, edgeDraw }: Props) => {
  return (
    <motion.div
      className="absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        opacity,
        zIndex: 5,
      }}
    >
      <svg
        className="w-full h-48 absolute top-1/2 left-0 -translate-y-1/2"
        preserveAspectRatio="none"
        viewBox="0 0 1000 200"
      >
        <defs>
          {/* Multicolor Gradient 1 - Purple to Cyan */}
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              stopColor="hsl(var(--glow-purple))"
              stopOpacity="0.9"
            />
            <stop
              offset="50%"
              stopColor="hsl(var(--glow-pink))"
              stopOpacity="1"
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--glow-cyan))"
              stopOpacity="0.9"
            />
          </linearGradient>

          {/* Multicolor Gradient 2 - Cyan to Blue */}
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              stopColor="hsl(var(--glow-cyan))"
              stopOpacity="0.8"
            />
            <stop
              offset="50%"
              stopColor="hsl(var(--glow-blue))"
              stopOpacity="1"
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--glow-purple))"
              stopOpacity="0.8"
            />
          </linearGradient>

          {/* Multicolor Gradient 3 - Pink to Purple */}
          <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              stopColor="hsl(var(--glow-pink))"
              stopOpacity="0.7"
            />
            <stop
              offset="50%"
              stopColor="hsl(var(--glow-purple))"
              stopOpacity="0.9"
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--glow-blue))"
              stopOpacity="0.7"
            />
          </linearGradient>
        </defs>

        {/* Wave 1 - Primary undulating wave */}
        <motion.path
          d="M 100 100 Q 200 70, 300 90 T 500 95 T 700 85 T 900 100"
          stroke="url(#waveGradient1)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          filter="url(#neonGlow)"
          style={{
            pathLength: edgeDraw,
          }}
        />

        {/* Wave 2 - Secondary wave with different frequency */}
        <motion.path
          d="M 100 100 Q 200 120, 300 105 T 500 110 T 700 100 T 900 100"
          stroke="url(#waveGradient2)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          filter="url(#neonGlow)"
          style={{
            pathLength: useTransform(scrollYProgress, [0.45, 0.7], [0, 1]),
            opacity: 0.8,
          }}
        />

        {/* Wave 3 - Tertiary wave */}
        <motion.path
          d="M 100 100 Q 200 95, 300 80 T 500 88 T 700 110 T 900 100"
          stroke="url(#waveGradient3)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          filter="url(#neonGlow)"
          style={{
            pathLength: useTransform(scrollYProgress, [0.5, 0.75], [0, 1]),
            opacity: 0.6,
          }}
        />

        {/* Wave 4 - Additional subtle wave */}
        <motion.path
          d="M 100 100 Q 200 105, 300 98 T 500 102 T 700 95 T 900 100"
          stroke="url(#waveGradient1)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          filter="url(#neonGlow)"
          style={{
            pathLength: useTransform(scrollYProgress, [0.55, 0.8], [0, 1]),
            opacity: 0.4,
          }}
        />

        {/* Animated particles - Purple */}
        <motion.circle
          r="6"
          fill="hsl(var(--glow-purple))"
          filter="url(#neonGlow)"
          style={{
            opacity: useTransform(scrollYProgress, [0.65, 0.7], [0, 1]),
          }}
        >
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M 100 100 Q 200 70, 300 90 T 500 95 T 700 85 T 900 100"
          />
        </motion.circle>

        {/* Animated particles - Cyan */}
        <motion.circle
          r="5"
          fill="hsl(var(--glow-cyan))"
          filter="url(#neonGlow)"
          style={{
            opacity: useTransform(scrollYProgress, [0.65, 0.7], [0, 0.9]),
          }}
        >
          <animateMotion
            dur="2.5s"
            repeatCount="indefinite"
            path="M 100 100 Q 200 120, 300 105 T 500 110 T 700 100 T 900 100"
            begin="0.5s"
          />
        </motion.circle>

        {/* Animated particles - Pink */}
        <motion.circle
          r="4"
          fill="hsl(var(--glow-pink))"
          filter="url(#neonGlow)"
          style={{
            opacity: useTransform(scrollYProgress, [0.65, 0.7], [0, 0.7]),
          }}
        >
          <animateMotion
            dur="3.5s"
            repeatCount="indefinite"
            path="M 100 100 Q 200 95, 300 80 T 500 88 T 700 110 T 900 100"
            begin="1s"
          />
        </motion.circle>

        {/* Animated particles - Blue */}
        <motion.circle
          r="5"
          fill="hsl(var(--glow-blue))"
          filter="url(#neonGlow)"
          style={{
            opacity: useTransform(scrollYProgress, [0.65, 0.7], [0, 0.8]),
          }}
        >
          <animateMotion
            dur="2.8s"
            repeatCount="indefinite"
            path="M 100 100 Q 200 105, 300 98 T 500 102 T 700 95 T 900 100"
            begin="1.5s"
          />
        </motion.circle>
      </svg>
    </motion.div>
  );
};

export default Wave;
