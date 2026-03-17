import { MotionValue, motion, useTransform } from "motion/react";
import React, { RefObject } from "react";
import Header from "./_components/header";
import Content from "./_components/content";

type Props = {
  rightNodeRef: RefObject<HTMLDivElement>;
  node2Opacity: MotionValue<number>;
  node2Scale: MotionValue<number>;
  node2Y: MotionValue<number>;
  connectionGlow: MotionValue<number>;
};

const RightNode = ({
  rightNodeRef,
  node2Opacity,
  node2Scale,
  node2Y,
  connectionGlow,
}: Props) => {
  return (
    <motion.div
      ref={rightNodeRef}
      style={{
        opacity: node2Opacity,
        scale: node2Scale,
        y: node2Y,
      }}
      className="w-[85%] md:w-[45%] lg:w-[40%] xl:w-[35%]"
    >
      <motion.div
        style={{
          boxShadow: useTransform(
            connectionGlow,
            [0, 1],
            [
              "0 0 0 rgba(139, 92, 246, 0)",
              "0 0 40px hsl(var(--glow-cyan) / 0.6), 0 0 60px hsl(var(--glow-blue) / 0.3), 0 0 80px hsl(var(--glow-purple) / 0.2)",
            ]
          ),
        }}
        className="relative bg-card/95 border rounded-xl p-4 md:p-6 transition-all duration-300 backdrop-blur-xl scale-[1.3] z-50 border-black/20 dark:border-neutral-50/30"
      >
        {/* Header */}
        <Header title="EXTRACT PAGE DATA TO HTML FORMAT" />

        {/* Content */}
        <Content type="HTML" subtitle="Web page" mainText="Web page" />

        {/* Connection Point - LEFT side */}
        <motion.div
          className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-tertiary border-4 border-background z-50"
          style={{
            boxShadow: useTransform(
              connectionGlow,
              [0, 1],
              [
                "0 0 0 rgba(52, 211, 153, 0)",
                "0 0 20px hsl(var(--glow-purple) / 0.8), 0 0 30px hsl(var(--glow-pink) / 0.5)",
              ]
            ),
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default RightNode;
