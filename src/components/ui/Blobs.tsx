"use client";
import React, { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  animate,
} from "motion/react";

const SPRING = { stiffness: 80, damping: 60, mass: 0.1 };
const RANGE_VW = 30; // -15..15

const Blobs = () => {
  // Interactive Layer (mouse-driven)
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);

  const x = useSpring(tx, SPRING);
  const y = useSpring(ty, SPRING);

  const xNeg = useTransform(x, (v) => -v);
  const yNeg = useTransform(y, (v) => -v);
  const x06 = useTransform(x, (v) => v * 0.6);
  const y06 = useTransform(y, (v) => v * 0.6);
  const xNeg08 = useTransform(x, (v) => -v * 0.8);
  const yNeg08 = useTransform(y, (v) => -v * 0.8);

  const tWhite1 = useMotionTemplate`translate(${x}vw, ${y}vw)`;
  const tAccent1 = useMotionTemplate`translate(${xNeg}vw, ${yNeg}vw)`;
  const tWhite2 = useMotionTemplate`translate(${x06}vw, ${y06}vw)`;
  const tAccent2 = useMotionTemplate`translate(${xNeg08}vw, ${yNeg08}vw)`;

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * RANGE_VW;
      const ny = (e.clientY / window.innerHeight - 0.5) * RANGE_VW;
      tx.set(nx);
      ty.set(ny);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [tx, ty]);

  // --- Idle Layer (self-animating) ---
  const ix = useMotionValue(0);
  const iy = useMotionValue(0);

  const isx = useSpring(ix, SPRING);
  const isy = useSpring(iy, SPRING);

  const idle1 = useMotionTemplate`translate(${isx}vw, ${isy}vw)`;
  const idle2 = useMotionTemplate`translate(${-isx}vw, ${-isy}vw)`;

  useEffect(() => {
    // loop idle animation between random points
    const loop = () => {
      animate(ix, (Math.random() - 0.5) * RANGE_VW, {
        duration: 8,
        ease: "easeInOut",
        onComplete: loop,
      });
      animate(iy, (Math.random() - 0.5) * RANGE_VW, {
        duration: 10,
        ease: "easeInOut",
      });
    };
    loop();
  }, [ix, iy]);

  return (
    <div className="fixed inset-0 bg-yellow-50 flex items-center justify-center overflow-hidden">
      <div className="z-10 size-full fixed pointer-events-none backdrop-blur-[100px]" />

      {/* ---------- Idle Layer (always animating) ---------- */}
      <motion.div
        style={{ transform: idle1 }}
        className="bg-accent/30 size-[60vw] absolute rounded-full z-0 left-[10vw] top-[10vw] will-change-transform transform-gpu"
      />
      <motion.div
        style={{ transform: idle2 }}
        className="bg-accent/20 size-[50vw] absolute rounded-full z-0 right-[5vw] bottom-[5vw] will-change-transform transform-gpu"
      />

      {/* ---------- Interactive Layer (mouse-driven) ---------- */}
      {/* White Blob 1 (above accent) */}
      <motion.div
        style={{ transform: tWhite1 }}
        className="bg-white size-[40vw] absolute rounded-full z-[1] left-[20vw] bottom-[-20vw] will-change-transform transform-gpu"
        aria-hidden
      />

      {/* Accent Blob 1 */}
      <motion.div
        style={{ transform: tAccent1 }}
        className="bg-accent/40 size-[50vw] absolute rounded-full z-0 left-[5vw] bottom-[-5vw] will-change-transform transform-gpu"
        aria-hidden
      />

      {/* White Blob 2 (above accent) */}
      <motion.div
        style={{ transform: tWhite2 }}
        className="bg-white size-[30vw] absolute rounded-full z-[1] right-[30vw] top-[0vw] will-change-transform transform-gpu"
        aria-hidden
      />

      {/* Accent Blob 2 */}
      <motion.div
        style={{ transform: tAccent2 }}
        className="bg-accent/30 size-[50vw] absolute rounded-full z-0 right-[10vw] top-[5vw] will-change-transform transform-gpu"
        aria-hidden
      />
    </div>
  );
};

export default Blobs;
