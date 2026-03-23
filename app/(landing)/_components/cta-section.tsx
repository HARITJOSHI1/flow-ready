"use client";

import React from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const CtaSection = () => {
  const router = useRouter();

  return (
    <section id="cta" className="relative py-28 md:py-36 overflow-hidden">
      {/* Animated Gradient Backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-[10%] -left-[5%] w-[50%] h-[50%] rounded-full bg-violet-500/10 dark:bg-violet-600/15 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -80, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[20%] -right-[5%] w-[60%] h-[60%] rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-[120px]"
        />
      </div>

      {/* Subtle background gradient to blend with sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Card background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 dark:from-violet-600 dark:via-purple-600 dark:to-indigo-700" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50" />

          {/* Glow effects */}
          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-pink-500/30 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-cyan-500/20 blur-[120px]" />

          {/* Content */}
          <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold tracking-wide uppercase mb-8"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Start building today
            </motion.div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Ready to automate
              <br />
              your data workflows?
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Join 1,400+ teams already using FastFlow to extract, transform,
              and deliver data at scale. Free plan included.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="group px-8 py-4 rounded-xl bg-white text-violet-700 font-semibold text-sm hover:bg-white/90 transition-all duration-300 shadow-xl shadow-black/10 flex items-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("pricing");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all duration-300"
              >
                View Pricing
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
