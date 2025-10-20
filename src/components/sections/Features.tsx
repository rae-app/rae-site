"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

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
          : "hover:bg-border/30 border-transparent focus:bg-border/30"
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
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div
      id="features"
      className="border-b border-border h-fit sm:h-[calc(100vh-58px)] sm:divide-x divide-border flex"
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
          viewport={{ once: true }}
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
        {/* Video display for selected feature */}
        <div className="w-full h-1/2 rounded-sm  sticky top-[92px] overflow-hidden">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              key={activeFeature}
            >
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                style={{ aspectRatio: "16/9" }}
              >
                <source src={features[activeFeature].video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
