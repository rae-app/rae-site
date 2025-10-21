"use client";

import React from "react";
import { motion } from "motion/react";

interface FeatureProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const Feature = ({
  title,
  description,
  onClick,
}: FeatureProps) => {
  return (
    <div
      className={`w-full tracking-tighter text-sm cursor-pointer select-none hover:bg-border/30 border-transparent focus:bg-border/30rounded-sm border p-2 px-3 `}
      onClick={onClick}
    >
      <div className="">{title}</div>
      <div className="text-text-muted mt-1">{description}</div>
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

  return (
    <div
      id="features"
      className="border-b border-border h-fit py-8"
    >
      <div className="px-8">
        <div className="text-3xl tracking-tighter text-accent font-roboto-serif">
          Engineered to perfection
        </div>
        <div className="mt-4 tracking-tighter text-text-muted">
          Every feature is purposefully crafted to enhance your productivity and
          streamline your digital experience.
        </div>
      </div>
      
      <motion.div
        viewport={{ once: true }}
        whileInView={"visible"}
        initial={"rest"}
        className="flex gap-4 mt-6 overflow-x-scroll px-8 pb-4 snap-x snap-mandatory scrollbar-thin scroll-smooth"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--border) transparent',
        }}
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
            className="snap-center flex-shrink-0 w-[calc(100vw-4rem)] sm:w-[calc(50vw-3rem)] lg:w-[calc(33.333vw-3rem)]"
          >
            <div className="flex flex-col gap-3 h-full">
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
  );
}
