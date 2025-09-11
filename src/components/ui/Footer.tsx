"use client";
import {
  useScroll,
  useSpring,
  motion,
  useTransform,
  MotionValue,
} from "motion/react";
import React, { useRef, useState } from "react";
import { DiscordLogoIcon, XLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Card from "./Card";

// Import Bad Script font
import './courgette-font.css';

function AnimatedLetter({
  letter,
  index,
  scrollYProgress,
  totalLetters = 10,
  isHovered = false,
}: {
  letter: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  totalLetters?: number;
  isHovered?: boolean;
}) {
  const animationDelay = index / totalLetters;
  const y = useSpring(
    useTransform(scrollYProgress, [animationDelay, 1], ["-100%", "0%"]),
    { stiffness: 100, damping: 20 },
  );

  // Light red-200 to red-300 for hover effect
  const themeColors = ["#ffffff", "#fecaca", "#fca5a5"];

  return (
    <motion.div
      style={{ y }}
      animate={{
        color: isHovered ? themeColors[index % themeColors.length] : "#ffffff",
        textShadow: isHovered ? "0 0 8px rgba(255, 255, 255, 0.3)" : "none",
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.05, // Stagger the color change
      }}
    >
      {letter}
    </motion.div>
  );
}

function Footer() {
  const footerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["0 1", "0.5 1"],
  });

  const circleScale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  const letters = "Rae".split("");
  const taglineText = "The First True AI Assistant";
  const taglineLetters = taglineText.split("");

  return (
    <footer
      ref={footerRef}
      className="bg-zinc-950 flex-col relative flex items-center justify-center w-full h-fit mt-8 sm:mt-12 lg:mt-16"
    >
      <div className="w-full flex min-h-[250px] sm:min-h-[300px] lg:min-h-[400px]">
        {/* LEFT SECTION (RAE + logo + contacts) */}
        <div
          className="w-full sm:w-[40%] flex gap-2 pr-0 sm:pr-8 pb-4 sm:pb-6 lg:pb-8 flex-col border-r border-zinc-800"
          suppressHydrationWarning
        >
          <div className="flex  flex-col min-w-full h-full gap-6">
            {/* RAE + logo */}
            <div className="flex px-10 py-4 items-center gap-2 overflow-hidden">
              <motion.div
                style={{ scale: circleScale }}
                className="border-[6px] sm:border-[8px] lg:border-[12px] border-accent aspect-square rounded-full shrink-0 size-[40px] sm:size-[48px] lg:size-[64px]"
              />
              <div className="flex text-white text-[50px] sm:text-[60px] lg:text-[82px] font-bold">
                {letters.map((letter, index) => (
                  <AnimatedLetter
                    key={index + "rae-letter"}
                    letter={letter}
                    index={index}
                    scrollYProgress={scrollYProgress}
                    totalLetters={letters.length}
                  />
                ))}
              </div>
            </div>

            
            {/* Contacts */}
            <div className="flex px-10 py-6 flex-col gap-4 text-zinc-400 text-base sm:text-lg"> 
              {/* Email */}
              <a
                href="mailto:teamraeai@gmail.com"
                className="hover:text-white transition-colors"
              >
                Email: teamraeai@gmail.com
              </a>

              {/* Phone */}
              <span>Phone: +91 75508 83806</span>

              {/* Address */}
              <span>Address: Brookefield, Bengaluru</span>

              {/* Socials */}
              <div className="flex gap-4 mt-6">
                <a
                  href="https://discord.gg/jbCj6vXq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 127.14 96.36"
                    className="w-6 h-6 fill-zinc-400 hover:fill-white"
                  >
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.5,0a72.06,72.06,0,0,0-3.36,6.9A97.68,97.68,0,0,0,49,6.9,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6,1.06,80.21a105.73,105.73,0,0,0,31.9,16.15,77.7,77.7,0,0,0,6.84-11.14,68.42,68.42,0,0,1-10.82-5.17c.91-.66,1.8-1.35,2.66-2.05a70.57,70.57,0,0,0,61.32,0c.87.71,1.76,1.39,2.66,2.05a68.68,68.68,0,0,1-10.84,5.18,77.52,77.52,0,0,0,6.84,11.13,105.25,105.25,0,0,0,31.92-16.13c2.62-21.53-4.47-45.39-20.18-72.16ZM42.45,65.69c-6.07,0-11-5.59-11-12.48s4.91-12.48,11-12.48,11,5.59,11,12.48S48.52,65.69,42.45,65.69Zm42.24,0c-6.07,0-11-5.59-11-12.48s4.91-12.48,11-12.48,11,5.59,11,12.48S90.76,65.69,84.69,65.69Z" />
                  </svg>
                </a>

                <a
                  href="https://x.com/thisisraeai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <XLogoIcon className="fill" size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION (Cloud + text overlay) */}
        <div className="hidden sm:flex flex-1 relative items-center justify-center">
          {/* Cloud background */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/assets/images/cloud.gif"
              alt="Cloud animation"
              className="w-full h-full object-cover opacity-60"
            />
          </div>

          {/* Centered text with animation */}
          <div className="relative z-10 flex items-center justify-center w-full h-full overflow-hidden">
            <motion.div
              className="text-center text-[28px] sm:text-[36px] lg:text-[52px] flex flex-wrap justify-center gap-x-1 gap-y-2 cursor-pointer"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontWeight: '600' }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {taglineLetters.map((letter, index) => (
                <AnimatedLetter
                  key={index + "tagline-letter"}
                  letter={letter === " " ? "\u00A0" : letter}
                  index={index}
                  scrollYProgress={scrollYProgress}
                  totalLetters={taglineLetters.length}
                  isHovered={isHovered}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="h-[50px] sm:h-[60px] lg:h-[80px] justify-center border-t border-zinc-800 w-full items-center flex">
        <div className="max-w-[1400px] w-full px-4 sm:px-6 lg:px-8 font-bold text-zinc-500 text-xs sm:text-sm text-center sm:text-left">
          COPYRIGHT @ 2025 RAE. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
