"use client";
import { useScroll, useSpring, motion, useTransform, MotionValue } from "motion/react";
import React, { useRef } from "react";
import Card from "./Card";

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
    offset: ["0 1", "0.5 1"],
  });

  const circleScale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  const letters = "Rae.".split("");

  return (
    <footer
      ref={footerRef}
      className="bg-zinc-950 flex-col relative flex items-center justify-center w-full h-fit mt-8 sm:mt-12 lg:mt-16"
    >
      <div className="max-w-[1400px] w-full flex px-4 sm:px-6 lg:px-16 min-h-[250px] sm:min-h-[300px] lg:min-h-[400px]">
        <div className="w-full sm:w-[40%] flex gap-2 pr-0 sm:pr-8 pb-4 sm:pb-6 lg:pb-8 flex-col border-r-0 sm:border-r shrink-0 border-zinc-800">
          <div className="flex flex-col w-full h-full gap-4">{/* contact */}</div>
        </div>
        <div
          className="hidden sm:flex w-[80%] items-center justify-start pl-3 pr-3 gap-8"
          suppressHydrationWarning
        >
          <div className="w-[500px] aspect-[3/2] flex-shrink-0">
            <Card variant="image" className="w-full h-full">
              <img
                src="/assets/images/cloud.gif"
                alt="Cloud animation"
              />
            </Card>
          </div>
          <div className="flex flex-col items-start justify-start -mt-50 ml-8">
            <div className="text-white shrink-0 h-[50px] sm:h-[60px] lg:h-[80px] text-[50px] sm:text-[60px] lg:text-[82px] font-bold gap-2 sm:gap-3 lg:gap-4 flex items-center overflow-hidden">
              <motion.div
                style={{ scale: circleScale }}
                className="border-[6px] sm:border-[8px] lg:border-[12px] border-accent aspect-square rounded-full shrink-0 size-[40px] sm:size-[48px] lg:size-[64px]"
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
            <div className="font-bold text-zinc-500 text-lg lg:text-lg text-center mt-8 ml-8">
              Redefining AI Assistant
            </div>
          </div>
        </div>
      </div>
      <div className="h-[50px] sm:h-[60px] lg:h-[80px] justify-center border-t border-zinc-800 w-full items-center flex">
        <div className="max-w-[1400px] w-full px-4 sm:px-6 lg:px-8 font-bold text-zinc-500 text-xs sm:text-sm text-center sm:text-left">
          COPYRIGHT @ 2025 RAE. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
