import { MotionValue, motion } from "motion/react";
import React from "react";

type Props = {
  opacity: MotionValue<number>;
  delay: number;
  width: number;
  height: number;
};

const LeftNodeGlow = ({ opacity, delay, width, height }: Props) => {
  return (
    <motion.div
      style={{ opacity }}
      className={`absolute left-[15%] top-1/2 -translate-y-1/2 w-[${width}px] h-[${height}px] rounded-full`}
    >
      <div className="absolute inset-0 bg-glow-black animate-pulse" />
      <div
        className="absolute inset-0 bg-glow-pink/20 blur-[120px] animate-pulse"
        style={{ animationDelay: `${delay}s` }}
      />
      <div className="absolute inset-0 bg-glow-purple/20 blur-[250px]" />
    </motion.div>
  );
};

export default LeftNodeGlow;
