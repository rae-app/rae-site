"use client";
import { DiscordLogoIcon, EnvelopeIcon } from "@phosphor-icons/react/dist/ssr";
import { useScroll, motion, useTransform, useSpring } from "motion/react";
import React, { useRef } from "react";

export default function Landing() {
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["1 1", "2 0"],
  });
  const tX = useSpring(
    useTransform(scrollYProgress, [0, 1], ["-10%", "-100%"]),
    { stiffness: 100, damping: 30 },
  );
  const tX2 = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "-120%"]),
    { stiffness: 100, damping: 30 },
  );
  return (
    <div
      ref={pageRef}
      className="h-[calc(100vh-58px)] shrink-0 border-b border-border flex overflow-hidden relative items-center justify-center py-12"
    >
      <motion.div
        style={{ left: tX }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className="absolute  "
      >
        <div className="size-[30vw] absolute border bottom-0 translate-y-1/2 border-border  rounded-full " />
        <div className="size-[20vw] absolute border bottom-0 translate-y-1/2 border-border/90 rounded-full " />
        <div className="size-[40vw] absolute border bottom-0 translate-y-1/2 border-border/80 rounded-full " />
        <div className="size-[45vw] absolute border bottom-0 translate-y-1/2 border-border/70 rounded-full " />
        <div className="size-[45vw] absolute border bottom-0 translate-y-1/2 border-border/65 rounded-full " />
        <div className="size-[50vw] absolute border bottom-0 translate-y-1/2 border-border/60 rounded-full " />
        <div className="size-[60vw] absolute border bottom-0 translate-y-1/2 border-border/40 rounded-full " />
      </motion.div>
      <motion.div
        animate={{ opacity: 0.8 }}
        initial={{ opacity: 0 }}
        style={{ right: tX2 }}
        className="absolute right-[-30%] bottom-0  rotate-180"
      >
        <div className="size-[30vw] absolute border bottom-0 translate-y-1/2 border-border  rounded-full " />
        <div className="size-[20vw] absolute border bottom-0 translate-y-1/2 border-border/90 rounded-full " />
        <div className="size-[40vw] absolute border bottom-0 translate-y-1/2 border-border/80 rounded-full " />
        <div className="size-[45vw] absolute border bottom-0 translate-y-1/2 border-border/70 rounded-full " />
        <div className="size-[45vw] absolute border bottom-0 translate-y-1/2 border-border/65 rounded-full " />
        <div className="size-[50vw] absolute border bottom-0 translate-y-1/2 border-border/60 rounded-full " />
        <div className="size-[60vw] absolute border bottom-0 translate-y-1/2 border-border/40 rounded-full " />
      </motion.div>
      <div className=" flex flex-col z-20 items-center justify-center">
        <div className="text-5xl  font-roboto-serif text-accent tracking-tighter">
          Make your desktop smarter
        </div>
        <div className="tracking-tighter mt-4 text-text-muted text-center  ">
          Rae is a AI desktop assistant that can literally do anything <br></br>
          Made by developers, for developers.
        </div>
        <div className="flex gap-2 mt-8">
          <button className="button rounded-sm font-medium flex gap-2 items-center text-sm text-background dark:text-white px-3 h-[36px]   shadow-button bg-gradient-to-t from-black to-zinc-800 dark:from-accent/80 dark:to-accent">
            <EnvelopeIcon weight="fill" size={20} />
            Join the waitlist
          </button>
          <button className="h-[36px] text-sm font-medium flex gap-2 items-center bg-border-button/20 hover:bg-border-button/40 px-3 border border-border-button rounded-sm ">
            <DiscordLogoIcon weight="fill" size={20} />
            Join our community
          </button>
        </div>
        <div className="mt-2 text-text-muted text-sm">
          Coming soon for Windows and macOS
        </div>
      </div>
    </div>
  );
}
