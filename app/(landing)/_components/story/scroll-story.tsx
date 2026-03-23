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
  const node1Opacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const node1Scale = useTransform(scrollYProgress, [0, 0.12], [0.9, 1]);
  const node1Y = useTransform(scrollYProgress, [0, 0.12], [40, 0]);

  const node2Opacity = useTransform(scrollYProgress, [0.40, 0.52], [0, 1]);
  const node2Scale = useTransform(scrollYProgress, [0.40, 0.52], [0.9, 1]);
  const node2Y = useTransform(scrollYProgress, [0.40, 0.52], [40, 0]);

  // === SECTION TITLE ANIMATIONS ===
  const sectionTitleOpacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);
  const sectionTitleY = useTransform(scrollYProgress, [0, 0.06], [30, 0]);

  // === BLUR OVERLAY ANIMATIONS ===
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
  const edgeOpacity = useTransform(scrollYProgress, [0.80, 0.84], [0, 1]);
  const edgeDraw = useTransform(scrollYProgress, [0.84, 0.94], [0, 1]);
  const connectionGlow = useTransform(scrollYProgress, [0.94, 1], [0, 1]);

  // === FINAL MESSAGE ===
  const finalMessageOpacity = useTransform(scrollYProgress, [0.92, 0.98], [0, 1]);
  const finalMessageY = useTransform(scrollYProgress, [0.92, 0.98], [20, 0]);

  // === BACKGROUND GLOW ANIMATIONS ===
  const leftGlowOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 0.4]);
  const rightGlowOpacity = useTransform(scrollYProgress, [0.40, 0.52], [0, 0.4]);
  const centerGlowOpacity = useTransform(scrollYProgress, [0.84, 0.94], [0, 0.5]);

  return (
    <>
      <div ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-background">
          
          {/* ============================================ */}
          {/* SECTION HEADER - Fades in at scroll start */}
          {/* ============================================ */}
          <motion.div
            style={{ opacity: sectionTitleOpacity, y: sectionTitleY }}
            className="absolute top-8 md:top-12 left-0 right-0 z-30 text-center px-4"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-primary/10 text-primary dark:bg-primary/20 dark:text-violet-300 mb-3">
              How It Connects
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              See your{" "}
              <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                workflow
              </span>{" "}
              come alive
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-md mx-auto">
              Scroll to watch nodes connect and data flow between automation steps
            </p>
          </motion.div>

          {/* ============================================ */}
          {/* BACKGROUND GLOW EFFECTS */}
          {/* ============================================ */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            
            <LeftNodeGlow
              opacity={leftGlowOpacity}
              width={800}
              height={800}
              delay={1}
            />

            <RightNodeGlow
              opacity={rightGlowOpacity}
              width={800}
              height={800}
              delay={1}
            />

            <CenterConnectionGlow
              opacity={centerGlowOpacity}
              width={1000}
              height={500}
              delay={0.7}
            />

            {/* ============================================ */}
            {/* BLUR OVERLAY: RIGHT SIDE (About Left Node) */}
            {/* ============================================ */}
            <motion.div
              style={{ 
                opacity: rightBlurOpacity,
                pointerEvents: "none",
              }}
              className="absolute inset-0 flex items-stretch z-40"
            >
              <div className="w-1/2 h-full" />
              
              <motion.div
                style={{ x: rightBlurX }}
                className="w-1/2 h-full relative"
              >
                <div 
                  className="absolute inset-0"
                  style={{
                    backdropFilter: "blur(30px)",
                    WebkitBackdropFilter: "blur(30px)"
                  }}
                >
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
                  <div
                    className="absolute inset-0 hidden dark:block"
                    style={{
                      background: 
                        "linear-gradient(93deg, " +
                          "rgba(32,22,51,0.25) 8%, " +
                          "rgba(69,50,120,0.23) 24%, " +
                          "rgba(105,82,159,0.21) 53%, " +
                          "rgba(120,101,181,0.14) 80%, " +
                          "rgba(32,22,51,0.16) 100%)"
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-multiply rounded-lg opacity-40"
                    style={{
                      background:
                        "radial-gradient(ellipse at 90% 50%, rgba(60,40,110,0.22) 0%, rgba(32,22,51,0.07) 70%, rgba(32,22,51,0.04) 100%)"
                    }}
                  />
                </div>
                {/* Content */}
                <motion.div
                  style={{
                    opacity: rightBlurContentOpacity,
                    y: rightBlurContentY,
                  }}
                  className="relative h-full flex flex-col justify-center items-end pr-6 md:pr-12 lg:pr-20 xl:pr-32"
                >
                  <div className="max-w-md">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 dark:bg-violet-500/20 mb-4">
                      <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                      <span className="text-xs font-semibold tracking-wider uppercase text-violet-600 dark:text-violet-300">
                        Entry Point
                      </span>
                    </div>
                    <h4 className="mb-3 text-xl md:text-3xl font-bold tracking-tight text-[#392780] dark:text-[#DBC6F7]">
                      🚀 The Browser Node
                    </h4>
                    <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      Launch a browser to visit your target website.{" "}
                      <span className="font-semibold text-violet-600 dark:text-violet-300">
                        Paste any web URL
                      </span>{" "}
                      to get started—FastFlow handles the rest.
                    </p>
                    <div className="mt-6 flex flex-row gap-2 text-xs">
                      <span className="bg-violet-500/10 dark:bg-violet-400/20 px-3 py-1.5 rounded-full font-semibold text-violet-600 dark:text-violet-200 border border-violet-500/20">
                        Entry Node
                      </span>
                      <span className="bg-foreground/5 dark:bg-white/10 px-3 py-1.5 rounded-full text-muted-foreground border border-border/50">
                        Input: URL
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ============================================ */}
            {/* BLUR OVERLAY: LEFT SIDE (About Right Node) */}
            {/* ============================================ */}
            <motion.div
              style={{
                opacity: leftBlurOpacity,
                pointerEvents: "none",
              }}
              className="absolute inset-0 flex items-stretch z-40"
            >
              <motion.div
                style={{ x: leftBlurX }}
                className="w-1/2 h-full relative"
              >
                <div 
                  className="absolute inset-0"
                  style={{
                    backdropFilter: "blur(30px)",
                    WebkitBackdropFilter: "blur(30px)"
                  }}
                >
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
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-multiply rounded-lg opacity-40"
                    style={{
                      background:
                        "radial-gradient(ellipse at 8% 54%, rgba(0,200,230,0.20) 0%, rgba(22,38,51,0.08) 70%, rgba(22,38,51,0.04) 100%)"
                    }}
                  />
                </div>
                {/* Content */}
                <motion.div
                  style={{
                    opacity: leftBlurContentOpacity,
                    y: leftBlurContentY,
                  }}
                  className="relative h-full flex flex-col justify-center items-start pl-6 md:pl-12 lg:pl-20 xl:pl-32"
                >
                  <div className="max-w-md">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 mb-4">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                      <span className="text-xs font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-300">
                        Transformer
                      </span>
                    </div>
                    <h4 className="mb-3 text-xl md:text-3xl font-bold tracking-tight text-cyan-800/90 dark:text-cyan-100">
                      🧩 Extract Data Node
                    </h4>
                    <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      Extract structured information from the loaded webpage in{" "}
                      <span className="font-semibold text-cyan-600 dark:text-cyan-300">
                        HTML
                      </span>{" "}
                      format. Clean, parsed, and ready for your next processing step.
                    </p>
                    <div className="mt-6 flex flex-row gap-2 text-xs">
                      <span className="bg-cyan-500/10 dark:bg-cyan-400/20 px-3 py-1.5 rounded-full font-semibold text-cyan-600 dark:text-cyan-200 border border-cyan-500/20">
                        Transformer Node
                      </span>
                      <span className="bg-foreground/5 dark:bg-white/10 px-3 py-1.5 rounded-full text-muted-foreground border border-border/50">
                        Output: HTML
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              <div className="w-1/2 h-full" />
            </motion.div>

          </div>

          {/* ============================================ */}
          {/* MAIN CONTENT: NODES + CONNECTION */}
          {/* ============================================ */}
          <div className="relative w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-16">
            <div className="flex flex-row justify-between items-center w-full h-full max-w-7xl mx-auto relative z-10">
              
              <LeftNode
                opacity={node1Opacity}
                scale={node1Scale}
                y={node1Y}
                leftNodeRef={leftNodeRef}
              />

              <Wave
                opacity={edgeOpacity}
                scrollYProgress={scrollYProgress}
                edgeDraw={edgeDraw}
              />

              <RightNode
                rightNodeRef={rightNodeRef}
                node2Opacity={node2Opacity}
                node2Scale={node2Scale}
                node2Y={node2Y}
                connectionGlow={connectionGlow}
              />

            </div>
          </div>

          {/* ============================================ */}
          {/* FINAL MESSAGE - Shows when connection completes */}
          {/* ============================================ */}
          <motion.div
            style={{ opacity: finalMessageOpacity, y: finalMessageY }}
            className="absolute bottom-8 md:bottom-12 left-0 right-0 z-30 text-center px-4"
          >
            <p className="text-sm md:text-base font-medium text-primary/80 dark:text-violet-300/80">
              ✨ Workflow connected — your data pipeline is live
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}