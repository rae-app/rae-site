"use client";
import { DiscordLogoIcon, EnvelopeIcon } from "@phosphor-icons/react/dist/ssr";
import { useScroll, motion, useTransform, useSpring } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useSmoothScroll } from "@/hooks/useScroll";

export default function Landing() {
  const [pos, setPos] = useState([0, 0]);
  const screenRef = useRef([0, 0]);

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

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      setPos([e.clientX - screenRef.current[0] / 2, e.clientY - screenRef.current[1] / 2]);
    }
    if (document) {
      screenRef.current = [window.innerWidth, window.innerHeight];
      document.addEventListener("mousemove", handleMove);
    }

    return () => {
      document.removeEventListener("mousemove", handleMove);
    };
  }, []);

  useEffect(() => {
    console.log(pos);
  }, [pos]);

  const scroll = useSmoothScroll();
  return (
    <div
      id="home"
      ref={pageRef}
      className="sm:h-[calc(100vh-58px)] h-fit shrink-0 border-b border-border flex overflow-hidden relative items-start sm:items-center sm:justify-center py-14 sm:py-12"
    >
      <motion.div
        style={{ left: tX }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className="absolute  flex sm:hidden"
      >
        <motion.div
          animate={{ x: pos[0] / 20, y: pos[1] / 20 }}
          className="size-[400px] absolute border bottom-0 translate-y-1/2 border-red-200/40 rounded-full "
        />
        <motion.div
          animate={{ x: pos[0] / 30, y: pos[1] / 30 }}
          className="size-[500px] absolute border bottom-0 translate-y-1/2 border-red-200/60 rounded-full "
        />
        <motion.div
          animate={{ x: pos[0] / 45, y: pos[1] / 45 }}
          className="size-[550px] absolute border bottom-0 translate-y-1/2 border-red-200/65 rounded-full "
        />
        <motion.div
          animate={{ x: pos[0] / 50, y: pos[1] / 50 }}
          className="size-[600px] absolute border bottom-0 translate-y-1/2 border-red-200/70 rounded-full "
        />
        <motion.div
          animate={{ x: pos[0] / 70, y: pos[1] / 70 }}
          className="size-[600px] absolute border bottom-0 translate-y-1/2 border-red-200/80 rounded-full "
        />
        <motion.div
          animate={{ x: pos[0] / 90, y: pos[1] / 90 }}
          className="size-[600px] absolute border bottom-0 translate-y-1/2 border-red-300 rounded-full "
        />
        <motion.div
          animate={{ x: pos[0] / 100, y: pos[1] / 100 }}
          className="size-[800px] absolute border bottom-0 translate-y-1/2 border-red-200/90 rounded-full "
        />
      </motion.div>
      <motion.div
        style={{ left: tX }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className="absolute z-[21]  hidden sm:flex"
      >
        <motion.div
          animate={{ x: pos[0] / 10, y: pos[1] / 10 }}
          className="size-[20vw] z-20 absolute border bottom-0 translate-y-1/2 border-red-200/90 rounded-full "
        />
        <motion.div
          animate={{ x: pos[0] / 20, y: pos[1] / 20 }}
          className="size-[30vw] z-20 absolute border bottom-0 translate-y-1/2 border-red-300  rounded-full "
        />
        <motion.div
          animate={{ x: pos[0] / 30, y: pos[1] / 30 }}
          className="size-[40vw] z-20 absolute border bottom-0 translate-y-1/2 border-red-200/80 rounded-full "
        />

        <motion.div
          animate={{ x: pos[0] / 45, y: pos[1] / 45 }}
          className="size-[45vw] z-20 absolute border bottom-0 translate-y-1/2 border-red-200/65 rounded-full "
        />
        <motion.div
          animate={{ x: pos[0] / 50, y: pos[1] / 50 }}
          className="size-[50vw] backdrop-blur-[4px] z-[15] absolute border bottom-0 translate-y-1/2 border-red-200/60 rounded-full "
        />
        <motion.div
          transition={{ ease: "easeInOut", duration: 0.05 }}
          animate={{ x: pos[0] / 100, y: pos[1] / 100 }}
          className="size-[60vw] backdrop-blur-[4px] absolute border bottom-0 translate-y-1/2 border-red-300 rounded-full "
        />
      </motion.div>
      <motion.div
        animate={{ opacity: 0.8 }}
        initial={{ opacity: 0 }}
        style={{ right: tX2 }}
        className="absolute right-[-30%] bottom-0  rotate-180 sm:flex hidden"
      >
        <motion.div
          animate={{ x: pos[0] / 10, y: pos[1] / 10 }}
          className="size-[20vw] absolute border bottom-0 translate-y-1/2 border-red-200/90 rounded-full "
        />
        <motion.div
          animate={{ x: pos[0] / 20, y: pos[1] / 20 }}
          className="size-[30vw] absolute border bottom-0 translate-y-1/2 border-red-300 rounded-full "
        />
        <motion.div
          animate={{ x: pos[0] / 30, y: pos[1] / 30 }}
          className="size-[40vw] absolute border bottom-0 translate-y-1/2 border-red-200/80 rounded-full "
        />
        <motion.div
          animate={{ x: pos[0] / 45, y: pos[1] / 45 }}
          className="size-[45vw] absolute border bottom-0 translate-y-1/2 border-red-200/70 rounded-full "
        />
        <motion.div
          animate={{ x: pos[0] / 70, y: pos[1] / 70 }}
          className="size-[50vw] absolute border bottom-0 translate-y-1/2 border-red-200/60 rounded-full "
        />
        <motion.div
          animate={{ x: pos[0] / 100, y: pos[1] / 100 }}
          className="size-[60vw] absolute border bottom-0 translate-y-1/2 border-red-200/40 rounded-full "
        />
      </motion.div>
      <div className=" flex flex-col z-30 p-8 sm:p-8 items-center sm:justify-center justify-start">
        <div className="text-5xl  font-roboto-serif text-accent tracking-tighter">
          Make your desktop smarter
        </div>
        <div className="tracking-tighter mt-4 text-text-muted text-left sm:text-center  ">
          Rae is a AI desktop assistant that can literally do anything <br></br>
          Made by developers, for developers.
        </div>
        <div className="flex sm:flex-row flex-col w-full sm:w-fit gap-2 mt-8">
          <PrimaryButton
            className="h-[36px]"
            onClick={() => scroll.scrollToSection("waitlist")}
          >
            <EnvelopeIcon weight="fill" size={20} />
            Join the waitlist
          </PrimaryButton>
          <a
            href="https://discord.gg/F9y8AqY5xE"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[36px] text-sm font-medium cursor-pointer flex gap-2 items-center bg-gradient-to-b from-border-button/5 hover:from-border-button/40 focus:from-border-button/40 to-border-button/80 px-3 border border-border-button rounded-sm "
          >
            <DiscordLogoIcon weight="fill" size={20} />
            Join our community
          </a>
        </div>
        <div className="mt-4 sm:mt-2 text-text-muted text-sm">
          Coming soon for Windows and macOS
        </div>
      </div>
    </div>
  );
}
