"use client";
import { HandHeartIcon } from "@phosphor-icons/react/dist/ssr";
import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

export default function Waitlist() {
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["0 1", "1 1"],
  });

  const scaleT = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  return (
    <div
      ref={pageRef}
      className="h-[60vh] p-8 flex flex-col relative overflow-hidden"
    >
      <motion.div
        style={{ scale: scaleT }}
        className="absolute left-[50%] bottom-[0] flex items-center justify-center opacity-80 "
      >
        <div className="size-[30vw] absolute border bottom-0 translate-y-1/2 border-border  rounded-full " />
        <div className="size-[20vw] absolute border bottom-0 translate-y-1/2 border-border/90 rounded-full " />
        <div className="size-[40vw] absolute border bottom-0 translate-y-1/2 border-border/80 rounded-full " />
        <div className="size-[45vw] absolute border bottom-0 translate-y-1/2 border-border/70 rounded-full " />
        <div className="size-[45vw] absolute border bottom-0 translate-y-1/2 border-border/65 rounded-full " />
        <div className="size-[50vw] absolute border bottom-0 translate-y-1/2 border-border/60 rounded-full " />
        <div className="size-[60vw] absolute border bottom-0 translate-y-1/2 border-border/40 rounded-full " />
      </motion.div>
      <div className="size-full z-20 flex flex-col items-center justify-center">
        <div className="font-roboto-serif text-accent text-3xl tracking-tighter">
          Get notified when we launch
        </div>
        <div className="tracking-tighter text-text-muted">
          Join the waitlist, <span className="text-accent">265</span> already
          have
        </div>
        <motion.div className="flex gap-2 mt-4">
          <input
            placeholder="Your email here"
            className="h-[36px] focus:bg-white focus:border-accent outline-none border px-3 border-zinc-600 bg-white/90 rounded-sm w-[350px]"
          />
          <button className="button rounded-sm flex gap-2 items-center text-sm text-background dark:text-white px-3 h-[36px]   shadow-button bg-gradient-to-t from-black to-zinc-800 dark:from-accent/80 dark:to-accent">
            <HandHeartIcon weight="fill" size={20} />
            Join waitlist
          </button>
        </motion.div>
      </div>
    </div>
  );
}
