import { MotionValue, motion, useTransform } from "motion/react";
import React, { RefObject } from "react";
import Header from "./_components/header";
import Content from "./_components/content";

type Props = {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  y: MotionValue<number>;
  leftNodeRef: RefObject<HTMLDivElement>;
};

const LeftNode = ({ opacity, scale, y, leftNodeRef }: Props) => {
  return (
    <motion.div
      ref={leftNodeRef}
      style={{
        opacity,
        scale,
        y,
      }}
      className="w-[85%] md:w-[45%] lg:w-[40%] xl:w-[35%]"
    >
      <motion.div
        style={{
          boxShadow: useTransform(
            opacity,
            [0, 1],
            [
              "0 0 0 rgba(139, 92, 246, 0)",
              "0 0 40px hsl(var(--glow-purple) / 0.6), 0 0 60px hsl(var(--glow-pink) / 0.3), 0 0 80px hsl(var(--glow-blue) / 0.2)",
            ]
          ),
        }}
        className="relative bg-card/95 border border-black/20 dark:border-neutral-50/30 rounded-xl p-4 md:p-6 transition-all duration-300 backdrop-blur-xl scale-[1.3] z-50"
      >
        {/* Header */}
        <Header title="LAUNCH BROWSER" badgeTitle="Entry point" />

        {/* Content */}
        <Content
          text="Enter a string value"
          mainText="Website URL"
          link="https://example.com"
          type="Web Page"
        />

        {/* Connection Point - RIGHT side */}
        <motion.div
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-tertiary border-4 border-background z-50"
          style={{
            boxShadow: useTransform(
              opacity,
              [0, 1],
              [
                "0 0 0 rgba(52, 211, 153, 0)",
                "0 0 20px hsl(var(--glow-cyan) / 0.8), 0 0 30px hsl(var(--glow-blue) / 0.5)",
              ]
            ),
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LeftNode;
