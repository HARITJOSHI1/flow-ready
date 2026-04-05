"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SparklesCore } from "@/components/ui/sparkles";
import { useTheme } from "next-themes";
import { FlipWords } from "@/components/ui/flip-words";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { cn } from "@/lib/utils";
import NavBar from "./navbar/nav-bar";
import Header from "./header";
import Cta from "./cta";
import Gradient from "./gradient";
import { people } from "./constants/people";
import WorkflowScrollStory from "./story/scroll-story";
import FeaturesSection from "./features-section";
import HowItWorksSection from "./how-it-works-section";
import TestimonialsSection from "./testimonials-section";
import PricingSection from "./pricing-section";
import FaqSection from "./faq-section";
import CtaSection from "./cta-section";
import Footer from "./footer";
import ManifestoSection from "./manifesto-section";
import {
  FloatingBrowser,
  FloatingWorkflow,
  FloatingAI,
  FloatingData,
  FloatingZap,
  FloatingShield,
} from "./svg/floating-icons";

type Props = {
    userId?: string
};

const LandingPage = ({userId}: Props) => {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const heroRef = useRef<HTMLElement>(null);

  // ── Parallax: track hero scroll progress ──
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Each floating SVG drifts at a different parallax rate as user scrolls past hero
  const parallax1 = useTransform(heroProgress, [0, 1], [0, 180]);
  const parallax2 = useTransform(heroProgress, [0, 1], [0, 240]);
  const parallax3 = useTransform(heroProgress, [0, 1], [0, 160]);
  const parallax4 = useTransform(heroProgress, [0, 1], [0, 300]);
  const parallax5 = useTransform(heroProgress, [0, 1], [0, 220]);
  const parallax6 = useTransform(heroProgress, [0, 1], [0, 140]);
  // Hero content drifts up gently  
  const heroContentY = useTransform(heroProgress, [0, 1], [0, 80]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.6, 1], [1, 0.8, 0]);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="flex flex-col h-screen relative" id="hero">
        <NavBar userId={userId}/>

        <AuroraBackground
          className={cn(
            "absolute inset-0 h-lvh",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
        >
          <Gradient />

          {/* ── Floating SVGs with parallax scroll (onassemble-style) ── */}
          <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
            <FloatingBrowser
              className="absolute top-[12%] left-[6%]"
              size={90}
              scrollY={parallax1}
            />
            <FloatingWorkflow
              className="absolute top-[15%] right-[8%]"
              size={78}
              scrollY={parallax2}
            />
            <FloatingAI
              className="absolute bottom-[28%] left-[10%]"
              size={68}
              scrollY={parallax3}
            />
            <FloatingData
              className="absolute top-[55%] right-[6%]"
              size={60}
              scrollY={parallax4}
            />
            <FloatingZap
              className="absolute bottom-[18%] right-[18%]"
              size={54}
              scrollY={parallax5}
            />
            <FloatingShield
              className="absolute top-[40%] left-[4%]"
              size={50}
              scrollY={parallax6}
            />
          </div>

          {/* ── Hero content with gentle scroll fade-out ── */}
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            style={{ y: heroContentY, opacity: heroContentOpacity }}
            className="flex flex-col gap-4 items-center justify-center px-4 py-2 w-full h-full absolute inset-0 top-0"
          >
            <div className="relative z-20 text-center select-none mt-6">
              <Header
                main={{ text: "AI" }}
                sub={{ text: "Interactive scrapper with quick prompts" }}
              />
            </div>

            <div className="flex flex-row justify-between items-center mt-8">
              <p className="font-extralight text-neutral-800 text-2xl md:text-4xl dark:text-neutral-200 py-4">
                That actually
              </p>

              <FlipWords
                words={["connects", "joins", "builds"]}
                className="text-2xl md:text-4xl"
              />
            </div>

            <div className="flex flex-row items-center justify-center w-full pb-4">
              <AnimatedTooltip items={people} />
              <span className="font-normal text-neutral-800 md:text-lg dark:text-neutral-200 ml-5">
                1.4k+ family
              </span>
            </div>

            <Cta text="Get Started Free" />
          </motion.div>

          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={mounted && theme.resolvedTheme === "dark" ? 0.5 : 1}
            particleDensity={50}
            className="w-full h-full"
            particleColor={mounted && theme.resolvedTheme === "dark" ? "#FFFFFF" : "#000"}
          />
        </AuroraBackground>
      </section>

      {/* ===== MANIFESTO / STORY SECTION (onassemble-style) ===== */}
      <ManifestoSection />

      {/* ===== SCROLL STORY SECTION ===== */}
      <section>
        <WorkflowScrollStory />
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <FeaturesSection />

      {/* ===== HOW IT WORKS SECTION ===== */}
      <HowItWorksSection />

      {/* ===== TESTIMONIALS SECTION ===== */}
      <TestimonialsSection />

      {/* ===== PRICING SECTION ===== */}
      <PricingSection />

      {/* ===== FAQ SECTION ===== */}
      <FaqSection />

      {/* ===== CTA SECTION ===== */}
      <CtaSection />

      {/* ===== FOOTER ===== */}
      <Footer />
    </>
  );
};

export default LandingPage;
