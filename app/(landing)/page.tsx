"use client";

import { ModeToggle } from "@/components/modals/theme-modal-toggle";
import { AuroraBackground } from "@/components/ui/aurora-background";
import React from "react";
import { motion } from "motion/react";
import { SparklesCore } from "@/components/ui/sparkles";
import { useTheme } from "next-themes";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { FlipWords } from "@/components/ui/flip-words";
import Logo from "@/components/logo";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { cn } from "@/lib/utils";

// TODO: DIDVIDE INTO COMPONENTS AND MAKE THEM REUSABLE.
type Props = {};

const page = (props: Props) => {
  const theme = useTheme();

  const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 5,
      name: "Tyler Durden",
      designation: "Soap Developer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    },
    {
      id: 6,
      name: "Dora",
      designation: "The Explorer",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
    },
  ];

  return (
    <>
      <section className="flex flex-col h-screen">
        <div className="flex justify-center w-full">
          <nav className="flex w-[80%] items-center justify-between my-5 px-6 h-[60px] rounded-full border border-primary/20 dark:border-white/20 fixed z-10 dark:bg-neutral-500/15 backdrop-blur-2xl backdrop-saturate-150 shadow-lg">
            <div className="flex items-center gap-1">
              <Logo />
            </div>

            <div>
              <ModeToggle />
            </div>
          </nav>
        </div>

        <AuroraBackground
          className={cn(
            "absolute inset-0 h-lvh",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
        >
          {/* Seamless dark gradient for transition to next section */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-neutral-950"
            )}
            aria-hidden="true"
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]  dark:bg-neutral-950"
            )}
            aria-hidden="true"
          />
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
              <h1 className="font-semibold leading-tight tracking-tight text-[10rem] sm:text-[10rem] flex flex-col items-center">
                <span
                  className="
                    relative inline-block
                    text-[10rem] sm:text-[15rem]
                    bg-gradient-to-tr from-yellow-400 via-fuchsia-500 to-blue-500
                    bg-clip-text text-transparent
                    transition-all duration-300
                    hover:from-blue-400 hover:via-pink-500 hover:to-yellow-400
                    hover:scale-105
                    hover:drop-shadow-[0_0_16px_rgba(236,72,153,0.5)]
                    drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]
                    cursor-pointer
                    mb-[-2rem]
                  "
                >
                  AI
                </span>
                <span
                  className="
                    relative z-10 mx-auto max-w-4xl text-center text-5xl font-bold text-wrap text-neutral-800 md:text-6xl lg:text-7xl dark:text-neutral-100
                    bg-gradient-to-tr from-neutral-800 via-neutral-400 to-neutral-800
                    dark:from-neutral-100 dark:via-neutral-400 dark:to-neutral-800
                    bg-clip-text text-transparent
                    transition-all duration-200
                  "
                >
                  Interactive scrapper with quick prompts
                </span>
              </h1>
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

            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 hover:translate-y-[-2px] transition-all shadow-md shadow-purple-200"
            >
              <span>Join now</span>
            </HoverBorderGradient>
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

export default page;
