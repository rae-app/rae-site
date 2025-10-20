"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

interface FeatureProps {
  title: string;
  description: string;
  active?: boolean;
  onClick?: () => void;
}

const Feature = ({
  title,
  description,
  active = false,
  onClick,
}: FeatureProps) => {
  return (
    <div
      className={`w-full tracking-tighter text-sm cursor-pointer select-none ${
        active
          ? "bg-accent/5 border-accent"
          : "hover:bg-border/30 border-transparent"
      } rounded-sm border p-2 px-3 `}
      onClick={onClick}
    >
      <div className="">{title}</div>
      <div className="text-text-muted  mt-1">{description}</div>
    </div>
  );
};

const features = [
  {
    title: "Context-Aware Intelligence",
    description:
      "Rae reads your screen and provides intelligent, context-aware assistance exactly when you need it",
  },
  {
    title: "Universal Tool Integration",
    description:
      "Seamlessly works with your favorite applications and tools to streamline your workflow",
  },
  {
    title: "Instant Accessibility",
    description:
      "Appears instantly when you copy, highlight, or select text anywhere on your system",
  },
  {
    title: "Always Available",
    description:
      "Summon Rae from anywhere with a simple @rae command - your AI assistant is always ready",
  },
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div
      id="features"
      className="border-b border-border h-[calc(100vh-58px)] sm:divide-x divide-border flex"
    >
      <div className="sm:w-1/2 w-full shrink-0 flex flex-col p-8 overflow-hidden">
        <div className="text-3xl tracking-tighter text-accent font-roboto-serif">
          Engineered to perfection
        </div>
        <div className="mt-4 tracking-tighter text-text-muted">
          Every feature is purposefully crafted to enhance your productivity and
          streamline your digital experience.
        </div>
        <motion.div
        viewport={{once: true}}
          whileInView={"visible"}
          initial={"rest"}
          className="flex flex-col gap-2 w-full mt-6"
        >
          {features.map((feature, index) => (
            <motion.div
            key={"feature" + index}
              variants={{
                visible: {
                  opacity: 1,
                  scale: 1,
                  x:0
                },
                rest: {
                  opacity: 0,
                  scale: 1,
                  x: -10
                }
              }}

              transition={{
                duration: 0.5,
                ease: "easeInOut",
                delay: index * 0.05
              }}
            >
              <Feature
                key={index}
                title={feature.title}
                description={feature.description}
                active={activeFeature === index}
                onClick={() => setActiveFeature(index)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="w-1/2 p-8 sm:flex hidden">
        {/* Placeholder for feature visualization */}
        <div className="w-full h-1/2 rounded-sm bg-black sticky top-[92px]"></div>
      </div>
    </div>
  );
}
