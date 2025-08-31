"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

const stops = [30, 60];

const Features = () => {
  const [notch, setNotch] = useState(false);
  const [overlay, setOverlay] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["0 1", "1 1"],
  });
  const yTranslate = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 100, damping: 20,
  });
  useEffect(() => {
    console.log("hello");
    const onScroll = () => {
      // console.log(pageRef.current);
      if (pageRef.current) {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        if (scrollPosition > (windowHeight * stops[0]) / 100) {
          setNotch(true);
          if(scrollPosition > (windowHeight * stops[1]) / 100) {
            console.log("overlay");
            setOverlay(true);
          }
          else{
            setOverlay(false);
          }
        } else {
          setNotch(false);
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });
  return (
    <div
      ref={pageRef}
      className="max-w-[1400px] w-full flex items-start justify-center h-dvh z-40 relative"
    >
      <motion.div
        style={{ y: yTranslate }}
        className="size-full flex  items-end justify-center absolute left-0 bottom-full"
      >
        <AnimatePresence>
          {notch && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, width: overlay ? "40%" : "20%", height: overlay ? "60px" : "40px" }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-zinc-950 mb-[20vh]  rounded-xl"
              ></motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Features;
