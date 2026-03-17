import { MotionValue, motion } from "motion/react";
import React from "react";

type Props = {
  opacity: MotionValue<number>;
  delay: number;
  width: number;
  height: number;
};

const CenterConnectionGlow = ({ opacity, delay, width, height }: Props) => {
  return (
    <motion.div
      style={{ opacity }}
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[${width}px] h-[${height}px] rounded-full`}
    >
      <div className="absolute inset-0 bg-glow-purple/30 blur-[220px]" />
      <div className="absolute inset-0 bg-glow-cyan/30 blur-[220px] animate-pulse" />
      <div
        className="absolute inset-0 bg-glow-pink/25 blur-[200px] animate-pulse"
        style={{ animationDelay: `${delay}s` }}
      />
      <div className="absolute inset-0 bg-glow-blue/20 blur-[240px]" />
    </motion.div>
  );
};

export default CenterConnectionGlow;
