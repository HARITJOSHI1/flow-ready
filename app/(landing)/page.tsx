"use client";

import { ModeToggle } from "@/components/modals/theme-modal-toggle";
import { AuroraBackground } from "@/components/ui/aurora-background";
import React from "react";
import { motion } from "motion/react";
import { SparklesCore } from "@/components/ui/sparkles";
import { useTheme } from "next-themes";

type Props = {};

const landing = (props: Props) => {
  const theme = useTheme();

  console.log(theme.resolvedTheme);

  return (
    <>
      <section className="flex flex-col h-lvh">
        <div className="flex justify-center w-full">
          <nav className="flex w-[70%] items-center justify-between my-8 px-6 h-[60px] rounded-full border border-primary/20 dark:border-white/20 fixed z-10 p-2 dark:bg-background/12 bg-gradient-to-br from-white/60 to-white/15 backdrop-blur-2xl backdrop-saturate-150 shadow-lg">
            <div className="flex items-center gap-1">test</div>

            <div>
              <ModeToggle />
            </div>
          </nav>
        </div>

        <AuroraBackground>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="flex flex-col gap-4 items-center justify-center px-4 w-full h-full absolute inset-0 top-0"
          >
            <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
              Backgrounds
            </p>
            <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
              And this, is chemical burn.
            </div>
            <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
              Debug now
            </button>
          </motion.div>

          {/* <BackgroundBeams /> */}
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

      <section>yusdiisad</section>
    </>
  );
};

export default landing;
