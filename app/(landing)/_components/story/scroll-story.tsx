// WorkflowScrollStory.tsx
// @ts-nocheck
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import LeftNodeGlow from "./nodes/left/glow";
import RightNodeGlow from "./nodes/right/glow";
import CenterConnectionGlow from "./center/glow";
import LeftNode from "./nodes/left/node";
import Wave from "./center/wave";
import RightNode from "./nodes/right/node";

// ============================================
// SCROLL TIMELINE (400vh total) - FIXED TIMINGS:
// ============================================
// 0.00 - 0.12: Left node fades in
// 0.14 - 0.32: RIGHT blur overlay appears (about left node)
// 0.32 - 0.38: RIGHT blur fades out smoothly
// 0.40 - 0.52: Right node fades in
// 0.54 - 0.72: LEFT blur overlay appears (about right node)
// 0.72 - 0.78: LEFT blur fades out smoothly
// 0.80 - 0.92: Connection line draws between nodes
// 0.92 - 1.00: Final glow effect
// ============================================

export default function WorkflowScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftNodeRef = useRef<HTMLDivElement>(null);
  const rightNodeRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // === NODE ANIMATIONS ===
  // Left node: appears first (0 - 0.12)
  const node1Opacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const node1Scale = useTransform(scrollYProgress, [0, 0.12], [0.9, 1]);
  const node1Y = useTransform(scrollYProgress, [0, 0.12], [40, 0]);

  // Right node: appears AFTER right blur disappears (0.40 - 0.52)
  const node2Opacity = useTransform(scrollYProgress, [0.40, 0.52], [0, 1]);
  const node2Scale = useTransform(scrollYProgress, [0.40, 0.52], [0.9, 1]);
  const node2Y = useTransform(scrollYProgress, [0.40, 0.52], [40, 0]);

  // === BLUR OVERLAY ANIMATIONS - CRITICAL FIX ===
  // Right blur (about left node): 0.14 - 0.38
  // Blur fades in, stays, then fades out COMPLETELY before right node appears
  const rightBlurOpacity = useTransform(
    scrollYProgress,
    [0.14, 0.18, 0.32, 0.38],
    [0, 1, 1, 0]
  );
  const rightBlurX = useTransform(
    scrollYProgress,
    [0.14, 0.20, 0.34, 0.38],
    [120, 0, 0, 80]
  );
  const rightBlurContentOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.22, 0.30, 0.34],
    [0, 1, 1, 0]
  );
  const rightBlurContentY = useTransform(
    scrollYProgress,
    [0.18, 0.22],
    [30, 0]
  );

  // Left blur (about right node): 0.54 - 0.78
  // Starts AFTER right node is visible, fades out before connection
  const leftBlurOpacity = useTransform(
    scrollYProgress,
    [0.54, 0.58, 0.72, 0.78],
    [0, 1, 1, 0]
  );
  const leftBlurX = useTransform(
    scrollYProgress,
    [0.54, 0.60, 0.74, 0.78],
    [-120, 0, 0, -80]
  );
  const leftBlurContentOpacity = useTransform(
    scrollYProgress,
    [0.58, 0.62, 0.70, 0.74],
    [0, 1, 1, 0]
  );
  const leftBlurContentY = useTransform(
    scrollYProgress,
    [0.58, 0.62],
    [30, 0]
  );

  // === CONNECTION ANIMATIONS ===
  // Edge only appears after BOTH blur overlays are completely gone (0.80+)
  const edgeOpacity = useTransform(scrollYProgress, [0.80, 0.84], [0, 1]);
  const edgeDraw = useTransform(scrollYProgress, [0.84, 0.94], [0, 1]);
  const connectionGlow = useTransform(scrollYProgress, [0.94, 1], [0, 1]);

  // === BACKGROUND GLOW ANIMATIONS ===
  const leftGlowOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 0.4]);
  const rightGlowOpacity = useTransform(scrollYProgress, [0.40, 0.52], [0, 0.4]);
  const centerGlowOpacity = useTransform(scrollYProgress, [0.84, 0.94], [0, 0.5]);

  return (
    <>
      <div ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-background">
          
          {/* ============================================ */}
          {/* BACKGROUND GLOW EFFECTS */}
          {/* ============================================ */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            
            {/* Left node glow - appears with left node */}
            <LeftNodeGlow
              opacity={leftGlowOpacity}
              width={800}
              height={800}
              delay={1}
            />

            {/* Right node glow - appears with right node */}
            <RightNodeGlow
              opacity={rightGlowOpacity}
              width={800}
              height={800}
              delay={1}
            />

            {/* Center connection glow - appears when connection forms */}
            <CenterConnectionGlow
              opacity={centerGlowOpacity}
              width={1000}
              height={500}
              delay={0.7}
            />

            {/* ============================================ */}
            {/* BLUR OVERLAY: RIGHT SIDE (About Left Node) */}
            {/* Appears: 0.14-0.38, BEFORE right node (0.40) */}
            {/* ============================================ */}
            <motion.div
              style={{ 
                opacity: rightBlurOpacity,
                pointerEvents: "none",
              }}
              className="absolute inset-0 flex items-stretch z-40"
            >
              {/* Empty left half - left node shows through */}
              <div className="w-1/2 h-full" />
              
              {/* Blurred right half with content */}
              <motion.div
                style={{ x: rightBlurX }}
                className="w-1/2 h-full relative"
              >
                {/* Blur layer */}
                <div 
                  className="absolute inset-0"
                  style={{
                    backdropFilter: "blur(30px)",
                    WebkitBackdropFilter: "blur(30px)"
                  }}
                >
                  {/* Light mode blended gradient */}
                  <div
                    className="absolute inset-0 block dark:hidden"
                    style={{
                      background: 
                        "linear-gradient(92deg, " +
                          "rgba(232,232,252,0.09) 0%, " +
                          "rgba(217,194,255,0.16) 16%, " +
                          "rgba(180,160,229,0.20) 75%, " +
                          "rgba(190,177,255,0.12) 100%)"
                    }}
                  />
                  {/* Dark mode blended, soft gradient for subtle seamlessness */}
                  <div
                    className="absolute inset-0 hidden dark:block"
                    style={{
                      background: 
                        "linear-gradient(93deg, " +
                          "rgba(32,22,51,0.25) 8%, " + // makes it meld into background
                          "rgba(69,50,120,0.23) 24%, " +
                          "rgba(105,82,159,0.21) 53%, " +
                          "rgba(120,101,181,0.14) 80%, " +
                          "rgba(32,22,51,0.16) 100%)"
                    }}
                  />
                  {/* Soft vignette for truly seamless edges */}
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-multiply rounded-lg opacity-40"
                    style={{
                      background:
                        "radial-gradient(ellipse at 90% 50%, rgba(60,40,110,0.22) 0%, rgba(32,22,51,0.07) 70%, rgba(32,22,51,0.04) 100%)"
                    }}
                  />
                </div>
                {/* Content - fades separately for smooth transition */}
                <motion.div
                  style={{
                    opacity: rightBlurContentOpacity,
                    y: rightBlurContentY,
                  }}
                  className="relative h-full flex flex-col justify-center items-end pr-6 md:pr-12 lg:pr-20 xl:pr-32"
                >
                  <div className="max-w-md">
                    <h4 className="mb-2 text-lg md:text-2xl font-semibold tracking-wide text-[#392780] dark:text-[#DBC6F7] drop-shadow-xl dark:drop-shadow-[0_3px_16px_rgba(135,90,255,0.12)]">
                      🚀 The Browser Node
                    </h4>
                    <p className="text-base md:text-lg text-neutral-800/90 dark:text-neutral-200 drop-shadow dark:drop-shadow-[0_2px_18px_rgba(115,83,188,0.13)]">
                      Launch a browser to visit your target website.
                      <br />
                      <span className="font-bold text-primary dark:text-[#D6CAFD]">
                        Paste any web URL
                      </span>{" "}
                      to get started!
                    </p>
                    <div className="mt-7 flex flex-row gap-2 text-xs">
                      <span className="bg-primary/10 dark:bg-[#a991ff]/20 px-3 py-1 rounded-full font-medium text-[#ad7bee] dark:text-[#e7e2fa] shadow dark:shadow-[0_0_10px_2px_rgba(150,120,235,0.13)]">
                        Entry Node
                      </span>
                      <span className="bg-secondary/20 dark:bg-[#3c3262]/30 px-3 py-1 rounded-full text-neutral-600 dark:text-neutral-200 border border-transparent dark:border-[#7160a7]/30">
                        Input: URL
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ============================================ */}
            {/* BLUR OVERLAY: LEFT SIDE (About Right Node) */}
            {/* Appears: 0.54-0.78, AFTER right node (0.52) */}
            {/* ============================================ */}
            <motion.div
              style={{
                opacity: leftBlurOpacity,
                pointerEvents: "none",
              }}
              className="absolute inset-0 flex items-stretch z-40"
            >
              {/* Blurred left half with content */}
              <motion.div
                style={{ x: leftBlurX }}
                className="w-1/2 h-full relative"
              >
                {/* Blur layer */}
                <div 
                  className="absolute inset-0"
                  style={{
                    backdropFilter: "blur(30px)",
                    WebkitBackdropFilter: "blur(30px)"
                  }}
                >
                  {/* Light mode blended gradient */}
                  <div
                    className="absolute inset-0 block dark:hidden"
                    style={{
                      background:
                        "linear-gradient(267deg, " +
                          "rgba(229,255,255,0.13) 0%, " +
                          "rgba(190,255,244,0.20) 32%, " +
                          "rgba(132,255,250,0.19) 70%, " +
                          "rgba(104,235,255,0.12) 100%)"
                    }}
                  />
                  {/* Dark mode very subtle and seamless, blue-cyan */}
                  <div
                    className="absolute inset-0 hidden dark:block"
                    style={{
                      background:
                        "linear-gradient(268deg, " +
                          "rgba(22,38,51,0.24) 5%, " + 
                          "rgba(25,75,90,0.24) 26%, " +
                          "rgba(56,110,120,0.18) 62%, " +
                          "rgba(117,168,188,0.12) 90%, " +
                          "rgba(22,38,51,0.11) 100%)"
                    }}
                  />
                  {/* Vignette for seamless edge */}
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-multiply rounded-lg opacity-40"
                    style={{
                      background:
                        "radial-gradient(ellipse at 8% 54%, rgba(0,200,230,0.20) 0%, rgba(22,38,51,0.08) 70%, rgba(22,38,51,0.04) 100%)"
                    }}
                  />
                </div>
                {/* Content - fades separately for smooth transition */}
                <motion.div
                  style={{
                    opacity: leftBlurContentOpacity,
                    y: leftBlurContentY,
                  }}
                  className="relative h-full flex flex-col justify-center items-start pl-6 md:pl-12 lg:pl-20 xl:pl-32"
                >
                  <div className="max-w-md">
                    <h4 className="mb-2 text-lg md:text-2xl font-semibold tracking-wide text-cyan-800/90 dark:text-cyan-100 drop-shadow-xl dark:drop-shadow-[0_2px_16px_rgba(0,220,255,0.11)]">
                      🧩 Extract Data Node
                    </h4>
                    <p className="text-base md:text-lg text-neutral-800/90 dark:text-neutral-200 drop-shadow dark:drop-shadow-[0_2px_18px_rgba(21,220,230,0.10)]">
                      Extract information from the loaded webpage in{" "}
                      <span className="font-bold text-primary dark:text-cyan-50">
                        HTML
                      </span> format.
                      <br />
                      Ready for your next processing step!
                    </p>
                    <div className="mt-7 flex flex-row gap-2 text-xs">
                      <span className="bg-cyan-100/20 dark:bg-cyan-400/20 px-3 py-1 rounded-full font-medium text-cyan-900 dark:text-cyan-50 shadow dark:shadow-[0_0_10px_2px_rgba(32,190,220,0.12)]">
                        Transformer Node
                      </span>
                      <span className="bg-secondary/20 dark:bg-[#142d36]/40 px-3 py-1 rounded-full text-neutral-600 dark:text-cyan-50 border border-transparent dark:border-cyan-300/20">
                        Output: HTML
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Empty right half - right node shows through */}
              <div className="w-1/2 h-full" />
            </motion.div>

          </div>

          {/* ============================================ */}
          {/* MAIN CONTENT: NODES + CONNECTION */}
          {/* ============================================ */}
          <div className="relative w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-16">
            <div className="flex flex-row justify-between items-center w-full h-full max-w-7xl mx-auto relative z-10">
              
              {/* Left Node - Launch Browser */}
              <LeftNode
                opacity={node1Opacity}
                scale={node1Scale}
                y={node1Y}
                leftNodeRef={leftNodeRef}
              />

              {/* Connection Wave - Between nodes */}
              <Wave
                opacity={edgeOpacity}
                scrollYProgress={scrollYProgress}
                edgeDraw={edgeDraw}
              />

              {/* Right Node - Extract Page Data */}
              <RightNode
                rightNodeRef={rightNodeRef}
                node2Opacity={node2Opacity}
                node2Scale={node2Scale}
                node2Y={node2Y}
                connectionGlow={connectionGlow}
              />

            </div>
          </div>
        </div>
      </div>
    </>
  );
}