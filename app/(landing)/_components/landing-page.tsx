"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import React from "react";
import { motion } from "motion/react";
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

type Props = {
    userId?: string
};

const LandingPage = ({userId}: Props) => {
  const theme = useTheme();

  return (
    <>
      <section className="flex flex-col h-screen">
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

          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
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

            <Cta text="Join now" />
          </motion.div>

          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={theme.resolvedTheme !== "dark" ? 1 : 0.5}
            particleDensity={50}
            className="w-full h-full"
            particleColor={theme.resolvedTheme !== "dark" ? "#000" : "#FFFFFF"}
          />
        </AuroraBackground>
      </section>

      <section>
        <WorkflowScrollStory />
      </section>
    </>
  );
};

export default LandingPage;
