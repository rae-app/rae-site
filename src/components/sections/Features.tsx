"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

function Features() {
  const featuresPage = useRef(null);
  const contentPage = useRef(null);

  const { scrollYProgress } = useScroll({
    target: featuresPage,
    offset: ["0 1", "1 1"],
  });

  const { scrollYProgress: contentScrollProgress } = useScroll({
    target: contentPage,
    offset: ["0 1", "1 1"],
  });

  // --- transforms must be outside JSX ---
  const heightPage = useSpring(
    useTransform(scrollYProgress, [0, 1], ["5vh", "100vh"]),
    { stiffness: 100, damping: 25 }
  );

  const widthPage = useSpring(
    useTransform(scrollYProgress, [0, 1], ["30%", "100%"]),
    { stiffness: 100, damping: 20 }
  );

  const translateContent = useTransform(
    contentScrollProgress,
    [0, 1],
    ["0%", "-100%"]
  );

  const translatePage = useSpring(
    useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]),
    { stiffness: 100, damping: 20 }
  );

  const roundedPage = useTransform(scrollYProgress, [0, 1], ["0rem", "1rem"]);

  const circleOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const circleScale = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="h-[300vh] w-[1400px] relative z-40 flex justify-center">
      <motion.div
        style={{
          height: heightPage,
          width: widthPage,
          translateY: translatePage,
        }}
        className="top-[98px] sticky flex overflow-hidden px-8"
      >
        <motion.div
          style={{
            borderBottomRightRadius: roundedPage,
            borderBottomLeftRadius: roundedPage,
          }}
          className="bg-zinc-950 rounded-t-2xl size-full max-h-[calc(100vh-124px)] flex items-center relative"
        >
          {/* circle */}
          <motion.div
            style={{ opacity: circleOpacity, scale: circleScale }}
            className="bg-accent absolute size-[12px] mx-4 outline-4 outline-accent/20 rounded-full"
          />

          {/* content */}
          <motion.div
            style={{ opacity: scrollYProgress, y: translateContent }}
            className="text-white h-fit w-[1140px] absolute top-0 px-5 py-4 flex flex-col"
          >
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-semibold">FEATURE #1</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum vehicula arcu in eros auctor maximus...
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-8">
              <div className="text-2xl font-semibold">FEATURE #2</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum vehicula arcu in eros auctor maximus...
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* invisible scroll triggers */}
      <div
        ref={featuresPage}
        className="h-[30vh] absolute w-full z-[10] flex items-center justify-center overflow-hidden pointer-events-none"
      />
      <div
        ref={contentPage}
        className="h-[170vh] top-[100vh] pointer-events-none absolute w-full z-[10] flex items-center justify-center overflow-hidden"
      />
    </div>
  );
}

export default Features;
