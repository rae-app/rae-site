"use client";
import {
  ArrowElbowDownLeftIcon,
  CornersOutIcon,
  MicrophoneIcon,
  PushPinIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const APP_CONSTANTS = {
  notch: {
    width: "250px",
    height: "40px",
  },
  overlay: {
  
    width: "600px",
    height: "60px",
  },
  features: {
    
    width: "1400px",
    height: "1200px", // fixed height for consistency
  },
};

const Features_new = () => {
  const [scroll, setScroll] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [state, setState] = useState<"notch" | "overlay" | "features">("notch");
  useEffect(() => {
    const onScroll = () => {
      setScroll(window.scrollY);
      setWindowHeight(window.innerHeight);
      // Use fixed pixel values for triggers
      if (window.scrollY > 300 && window.scrollY <= 800) {
        setState("overlay");
      } else if (window.scrollY > 800) {
        setState("features");
      } else {
        setState("notch");
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["0 0", "1 1"],
  });
  const pageHeight = useTransform(scrollYProgress, [0, 1], [800, 1200]);
  return (
    <motion.div
      ref={pageRef}
      className="min-h-[1300px] relative z-40 flex flex-col justify-start w-full"
    >
      <div className="absolute w-full h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "circInOut" }}
          className="mt-[200px] text-3xl font-medium tracking-tight w-full flex items-center justify-center"
        >
          Always at your service <br />
          Rae is built to be your AI companion, ready to assist you anytime,
          anywhere.
        </motion.div>
      </div>

      <motion.div
        style={{ height: pageHeight }}
        className=" w-full flex items-center justify-center sticky top-[400px]"
      >
        <motion.div
          initial={{
            height: "20px",
            width: "20px",
            backgroundColor: "#111111",
          }}
          whileInView={{
            height: APP_CONSTANTS[state].height,
            width: APP_CONSTANTS[state].width,
            backgroundColor: state === "features" ? "#111111FF" : "#111111",
          }}
          viewport={{ once: true }}
          transition={{ type: "tween", duration: 0.2, ease: "easeInOut" }}
          className="max-w-[1340px] backdrop-blur-2xl absolute overflow-hidden top-0 flex rounded-xl"
        >
          <AnimatePresence>
            {state === "notch" && <Notch />}
            {state === "overlay" && <Overlay />}
            {state === "features" && <Features />}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Features = () => {
  const [showFirstVideo, setShowFirstVideo] = useState(false);
  const [showMiddleVideo, setShowMiddleVideo] = useState(false);
  const [showLastVideo, setShowLastVideo] = useState(false);

  useEffect(() => {
    // Stagger the video loading with different delays
    const firstVideoTimer = setTimeout(() => {
      setShowFirstVideo(true);
    }, 500); // First video loads almost immediately

    const middleVideoTimer = setTimeout(() => {
      setShowMiddleVideo(true);
    }, 1200); // Middle video loads after 1200ms

    const lastVideoTimer = setTimeout(() => {
      setShowLastVideo(true);
    }, 1500); // Last video loads after 1500ms

    return () => {
      clearTimeout(firstVideoTimer);
      clearTimeout(middleVideoTimer);
      clearTimeout(lastVideoTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full p-4 absolute items-center flex flex-col gap-4 bg-transparent "
    >
      <div className="flex  w-full flex-col p-4 rounded-2xl bg-black size-full">
        <div className="w-full h-2/3 overflow-hidden rounded-xl">
          {showFirstVideo ? (
            <motion.video
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src="/assets/notch.mp4"
              autoPlay
              muted
              loop
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 animate-pulse flex items-center justify-center">
              <div className="text-zinc-400 text-sm animate-pulse"></div>
            </div>
          )}
        </div>
        <div className="flex pb-4 justify-between gap-4 h-1/2">
          <div className="w-1/2 h-full flex flex-col text-white mt-4">
            <div className="text-3xl font-medium">Interact with other apps</div>
            <div className="text-xl font-medium text-zinc-400 mb-4">
              Rae allows you to generate content for other apps running on your
              system
            </div>
            <div className="bg-black rounded-xl h-full relative w-full overflow-hidden">
              {showMiddleVideo ? (
                <motion.video
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src="/assets/type.mp4"
                  autoPlay
                  muted
                  loop
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div className="w-full h-full bg-zinc-800 animate-pulse flex items-center justify-center">
                  <div className="text-zinc-400 text-sm animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
          <div className="w-1/2  h-full flex flex-col text-white mt-4">
            <div className="text-3xl font-medium">Screen reading</div>
            <div className="text-xl font-medium text-zinc-400 mb-4">
              Rae can read your screen and provide context-aware assistance to
              help you with your tasks.
            </div>
            <div
              style={{ height: "100%" }}
              className="bg-black rounded-xl w-full overflow-hidden"
            >
              {showLastVideo ? (
                <motion.video
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src="/assets/screen.mp4"
                  autoPlay
                  muted
                  loop
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div className="w-full h-full bg-zinc-800 animate-pulse flex items-center justify-center">
                  <div className="text-zinc-400 size-full text-sm animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Overlay = () => {
  const buttonBase =
    "h-full border-r border-zinc-700 text-white flex items-center justify-center text-xl aspect-square shrink-0 transition-colors hover:text-accent hover:bg-zinc-900 cursor-pointer";

  const prompts = [
    "Whats 800 + 245?",
    "Translate 'hello' to Spanish",
    "Tell me a fun fact",
    "Summarize this paragraph",
    "Write a short poem",
    "Whats the capital of Japan?",
  ];

  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % prompts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: "0%", opacity: 1 }}
      animate={{ y: "0", opacity: 1 }}
      exit={{ y: "0%", opacity: 1 }}
      transition={{ type: "tween", ease: "circInOut", duration: 0.1 }}
      className="size-full flex absolute items-center overflow-hidden pointer-events-auto"
    >
      {/* 🔹 Toggle indicator */}
      <div
        className="h-full aspect-square shrink-0 border-r border-zinc-700 flex items-center justify-center cursor-pointer"
        onClick={() => setActive((prev) => !prev)}
      >
        <AnimatePresence>
          {active ? (
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="size-[10px] shrink-0 bg-accent rounded-full relative mx-4"
            >
              <div className="bg-accent/20 size-[20px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full animate-ping absolute"></div>
              <div className="bg-accent/30 size-[15px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full animate-ping absolute"></div>
              <div className="bg-accent/40 size-[10px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full animate-ping absolute"></div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              className="size-[10px] shrink-0 bg-zinc-500 rounded-full mx-4"
            ></motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🔹 Cycling prompts */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index + "prompt"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-sm w-full h-full flex items-center px-4 text-zinc-200 font-semibold whitespace-nowrap"
        >
          {prompts[index]}
        </motion.div>
      </AnimatePresence>

      {/* 🔹 Buttons */}
      <div className={buttonBase}>
        <ArrowElbowDownLeftIcon />
      </div>
      <div className={buttonBase}>
        <MicrophoneIcon />
      </div>
      <div className={buttonBase}>
        <PushPinIcon />
      </div>
      <div className={`${buttonBase} border-r-0`}>
        <CornersOutIcon />
      </div>
    </motion.div>
  );
};

const Notch = () => {
  return (
    <motion.div
      initial={{ y: "0%", opacity: 0 }}
      animate={{ y: "0", opacity: 1 }}
      exit={{ y: "0%", opacity: 0 }}
      transition={{
        type: "tween",
        ease: "circInOut",
        duration: 0.1,
      }}
      className="size-full flex items-center absolute  overflow-hidden"
    >
      <div className="size-[10px] shrink-0 bg-accent rounded-full relative mx-4">
        <div className="bg-accent/20 size-[20px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full animate-ping absolute "></div>
        <div className="bg-accent/30 size-[15px] left-1/2  -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full animate-ping absolute "></div>
        <div className="bg-accent/40 size-[10px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full animate-ping absolute "></div>
      </div>
      <div className="text-zinc-300 text-sm whitespace-nowrap font-semibold overflow-hidden w-full">
        <motion.div
          className="whitespace-nowrap w-fit font-semibold text-zinc-300 text-sm"
          animate={{ x: ["0%", "-50%", "0%"] }} // scroll left, then back
          transition={{
            duration: 8, // total duration
            ease: "linear",
            repeat: Infinity,
          }}
        >
          Fake Plastic Trees - Radiohead
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Features_new;
