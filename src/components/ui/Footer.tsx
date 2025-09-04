"use client";
import { useScroll, useSpring, motion, useTransform, MotionValue } from "motion/react";
import React, { useRef } from "react";

function AnimatedLetter({
  letter,
  index,
  scrollYProgress,
}: {
  letter: string;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const y = useSpring(
    useTransform(scrollYProgress, [index * 0.1, 1], ["-100%", "0%"]),
    { stiffness: 100, damping: 20 }
  );

  return <motion.div style={{ y }}>{letter}</motion.div>;
}

function Footer() {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["0 1", "0.75 1"],
  });

  const circleScale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  const letters = "Rae.".split("");

  return (
    <footer
      ref={footerRef}
      className="bg-zinc-950 flex-col relative flex items-center justify-center w-full h-fit"
    >
      <div className="max-w-[1400px] w-full flex px-4 sm:px-6 lg:px-16 min-h-[400px]">
        <div className="w-[40%] flex gap-2 pr-8 pb-8 flex-col border-r shrink-0 border-zinc-800">
          <div className="text-white shrink-0 mt-12 h-[80px] text-[82px] font-bold gap-4 flex items-center overflow-hidden">
            <motion.div
              style={{ scale: circleScale }}
              className="border-[12px]  border-accent aspect-square rounded-full shrink-0 size-[64px]"
            />
            <div className="flex">
              {letters.map((letter, index) => (
                <AnimatedLetter
                  key={index + "rae-letter"}
                  letter={letter}
                  index={index}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full h-full gap-4">{/* contact */}</div>
        </div>
      </div>
      <div className="h-[80px] justify-center border-t border-zinc-800 w-full items-center flex">
        <div className="max-w-[1400px] w-full px-4 sm:px-6 lg:px-8 font-bold text-zinc-500">
          COPYRIGHT @ 2025 RAE. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
