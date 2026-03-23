"use client";

import React from "react";
import { motion } from "motion/react";
import { testimonials, Testimonial } from "./constants/testimonials";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      className="relative py-28 md:py-36 overflow-hidden"
    >
      {/* Background */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      {/* Animated Gradient Backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-pink-500/80 dark:bg-pink-600/80 blur-[220px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -80, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 23,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-orange-500/10 dark:bg-orange-600/15 blur-[120px]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-300 mb-6">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Loved by{" "}
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">
              data teams
            </span>{" "}
            everywhere
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join thousands of engineers, analysts, and growth teams who trust
            FastFlow for their data extraction needs.
          </p>
        </motion.div>

        {/* Bento Vertical Marquee */}
        <div className="relative h-[800px] max-h-[80vh] flex flex-col items-center justify-start overflow-hidden w-full [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] pt-4">
          <motion.div
            className="flex flex-col gap-0 w-full"
            animate={{  
              y: ["0%", "-50%"],
            }}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...Array(2)].map((_, arrayIndex) => (
              <BentoGrid key={arrayIndex} className="max-w-7xl mx-auto w-full pb-6">
                {testimonials.map((item: Testimonial, i: number) => (
                  <BentoGridItem
                    key={`${arrayIndex}-${i}`}
                    className={cn(
                      "backdrop-blur-sm bg-card/60 p-6 xl:p-8",
                      "border border-border/50",
                      "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
                      "transition-all duration-500",
                      item.className
                    )}
                  >
                    <div className="flex flex-col items-center justify-center text-center space-y-4 h-full w-full">
                      {/* Stars */}
                      <div className="flex gap-1 mb-2">
                        {Array.from({ length: item.rating }).map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-foreground/90 leading-relaxed italic text-base md:text-lg max-w-xl mx-auto">
                        &ldquo;{item.quote}&rdquo;
                      </p>

                      {/* User Profile */}
                      <div className="flex flex-col items-center gap-3 pt-4 mt-auto">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-border/50 shadow-sm"
                        />
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">
                            {item.name}
                          </h3>
                          <p className="text-muted-foreground text-xs mt-0.5">
                            {item.role} at{" "}
                            <span className="text-primary font-medium">{item.company}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </BentoGridItem>
                ))}
              </BentoGrid>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
