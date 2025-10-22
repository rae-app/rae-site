"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

interface FeatureProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const Feature = ({ title, description, onClick }: FeatureProps) => {
  return (
    <div
      className={`w-full tracking-tighter text-sm  select-none  border-transparent focus:bg-border/30rounded-sm border`}
      onClick={onClick}
    >
      <div className="group-hover:text-accent">{title}</div>
      <div className="text-text-muted mt-1 ">{description}</div>
    </div>
  );
};

const features = [
  {
    title: "Context-Aware Intelligence",
    description:
      "Rae reads your screen and provides intelligent, context-aware assistance exactly when you need it",
    video: "/videos/listening.mp4",
  },
  {
    title: "Universal Tool Integration",
    description:
      "Seamlessly works with your favorite applications and tools to streamline your workflow",
    video: "/videos/agentic.mp4",
  },
  {
    title: "Instant Accessibility",
    description:
      "Appears instantly when you copy, highlight, or select text anywhere on your system",
    video: "/videos/insert.mp4",
  },
  {
    title: "Always Available",
    description:
      "Summon Rae from anywhere with a simple @rae command - your AI assistant is always ready",
    video: "/videos/at-rae.mp4",
  },
];

export default function Features() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition);
      return () =>
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div id="features" className="border-b border-border h-fit py-8">
      <div className="px-8">
        <div className="text-3xl tracking-tighter text-accent font-roboto-serif flex justify-between items-center">
          Engineered to perfection{" "}
          <div className="h-[32px] w-fit flex items-center gap-2">
            <button
              onClick={scrollLeft}
              className={`border h-full aspect-square shrink-0 rounded-sm flex items-center justify-center  ${
                canScrollLeft
                  ? "hover:bg-accent/20 bg-accent/5 border-accent"
                  : "border-border text-text-muted bg-text-muted/20"
              }`}
            >
              <ArrowRight className="rotate-180" size={20} />
            </button>
            <button
              onClick={scrollRight}
              className={`border h-full aspect-square shrink-0 rounded-sm flex items-center justify-center  ${
                canScrollRight
                  ? "hover:bg-accent/20 bg-accent/5 border-accent"
                  : "border-border text-text-muted bg-text-muted/20"
              }`}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        <div className="mt-4 tracking-tighter text-text-muted">
          Every feature is purposefully crafted to enhance your productivity and
          streamline your digital experience.
        </div>
      </div>

      <div className="relative">
        <motion.div
          ref={scrollContainerRef}
          viewport={{ once: true }}
          whileInView={"visible"}
          initial={"rest"}
          className="flex gap-4 relative mt-6 overflow-x-scroll px-8 pb-4 snap-x snap-mandatory  scroll-smooth"
        >
          {features.map((feature, index) => (
            <motion.div
              key={"feature" + index}
              variants={{
                visible: {
                  opacity: 1,
                  scale: 1,
                  x: 0,
                },
                rest: {
                  opacity: 0,
                  scale: 1,
                  x: -10,
                },
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                delay: index * 0.05,
              }}
              className="snap-center flex-shrink-0 w-[calc(100vw-4rem)] sm:w-[calc(50vw-3rem)] lg:w-[calc(33.333vw-3rem)] relative"
            >
              <div className="flex flex-col gap-3 h-full group">
                <Feature
                  title={feature.title}
                  description={feature.description}
                />
                <div className="w-full rounded-sm overflow-hidden border border-border">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ aspectRatio: "16/9" }}
                  >
                    <source src={feature.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
