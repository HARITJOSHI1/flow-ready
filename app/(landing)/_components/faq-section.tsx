"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { faqs } from "./constants/faqs";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 md:py-36 overflow-hidden">
      {/* Background */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          "[background-size:32px_32px]",
          "[background-image:radial-gradient(circle,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(circle,#262626_1px,transparent_1px)]"
        )}
      />
      {/* Animated Gradient Backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 90, 0],
            y: [0, -90, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-[5%] -left-[10%] w-[50%] h-[50%] rounded-full bg-amber-500/10 dark:bg-amber-600/15 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[5%] -right-[10%] w-[50%] h-[50%] rounded-full bg-orange-500/10 dark:bg-orange-600/15 blur-[120px]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300 mb-6">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              questions
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Everything you need to know about FastFlow. Can&apos;t find what you&apos;re
            looking for? Reach out to our support team.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div
                className={cn(
                  "rounded-xl border transition-all duration-300",
                  openIndex === index
                    ? "border-primary/20 bg-primary/[0.02] shadow-sm"
                    : "border-border/50 bg-card/30 hover:border-border"
                )}
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                >
                  <span className="font-medium text-foreground text-[15px] leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300",
                      openIndex === index && "rotate-180 text-primary"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-muted-foreground text-[15px] leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
