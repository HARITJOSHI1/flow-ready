import { motion } from "framer-motion";
import { MotionValue } from "motion/react";

type Props = {
  opacity: MotionValue<number>;
  delay: number;
  width: number;
  height: number;
};
const RightNodeGlow = ({ opacity, delay, width, height }: Props) => {
  return (
    <motion.div
      style={{ opacity }}
      className={`absolute right-[15%] top-1/2 -translate-y-1/2 w-[${width}px] h-[${height}px] rounded-full`}
    >
      <div
        className="absolute inset-0 bg-glow-black blur-[200px] animate-pulse"
        style={{ animationDelay: `${delay}s` }}
      />

      <div className="absolute inset-0 bg-glow-blue blur-[250px]" />
    </motion.div>
  );
};

export default RightNodeGlow;
