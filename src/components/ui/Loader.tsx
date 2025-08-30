"use client";
import { motion } from "motion/react";
import React, { useState, useEffect } from "react";

const Loader = () => {
  const [loaded, setLoaded] = useState(false); // after circle finishes
  const [textDone, setTextDone] = useState(false); // after text finishes

  // 🔹 Start timer once circle finishes
  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => {
        setTextDone(true);
      }, 1600); // adjust this duration to match text animation
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  return (
    <motion.div
      initial={{ y: "0%" }}
      animate={{ y: textDone ? "-100%" : "0%" }}
      transition={{ duration: 1, ease: "circInOut" }}
      className="fixed z-[10000] bg-zinc-950 size-full flex items-center justify-center"
    >
      <div className="flex items-center">
        {/* Circle */}
        <svg width={50} height={50} viewBox="0 0 100 100">
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            strokeWidth="14"
            stroke="#ffffff"
            strokeDasharray="100"
            pathLength={100}
            initial={{ strokeDashoffset: 100, stroke: "#ffffff" }}
            animate={{
              strokeDashoffset: [100, 52, 42, 0],
              stroke: loaded ? "#e53437" : "#ffffff",
            }}
            onAnimationComplete={() => setLoaded(true)}
            transition={{ duration: 1, ease: "circInOut", delay: 0.1 }}
            fill="none"
          />
        </svg>

        {/* Text */}
        <motion.div
          initial={{ width: "0px" }}
          animate={{
            width: loaded ? "120px" : "0px",
            marginLeft: loaded ? "10px" : "0px",
          }}
          transition={{ duration: 1, ease: "circInOut" }}
          className="text-6xl relative text-left font-bold text-white overflow-hidden"
        >
          <div className="z-20 text-white">Rae</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;
