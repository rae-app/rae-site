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
    height: "2200px", // increased height to show all videos fully
  },
};

const RESPONSIVE_CONSTANTS = {
  mobile: {
    notch: { width: "200px", height: "35px" },
    overlay: { width: "350px", height: "50px" },
    features: { width: "350px", height: "800px" },
  },
  tablet: {
    notch: { width: "220px", height: "37px" },
    overlay: { width: "500px", height: "55px" },
    features: { width: "700px", height: "1300px" },
  },
};

const Features_new = () => {
  const [scroll, setScroll] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [state, setState] = useState<"notch" | "overlay" | "features">("notch");
  const [mobile, setMobile] = useState(false)
  // Get responsive constants based on screen size
  const getConstants = () => {
    if (windowWidth < 640) {
      
      return RESPONSIVE_CONSTANTS.mobile;
    };
    if (windowWidth < 1024) return RESPONSIVE_CONSTANTS.tablet;
    return APP_CONSTANTS;
  };
  
  useEffect(() => {
    const onScroll = () => {
      setScroll(window.scrollY);
      
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
      // Use fixed pixel values for triggers
      if (window.scrollY > 300 && window.scrollY <= 800) {
        setState("overlay");
      } else if (window.scrollY > 800) {
        setState("features");
      } else {
        setState("notch");
      }
    };

    // Set initial window dimensions
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    if(window.innerWidth < 640) setMobile(true)

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["0 0", "1 1"],
  });

  const constants = getConstants();
  const pageHeight = useTransform(scrollYProgress, [0, 1], [800, 2200]);
  const pageHeightMobile = useTransform(scrollYProgress, [0, 1], [800, 800]);
  return (
    <motion.div
      ref={pageRef}
      className="min-h-[2200px] relative z-40 flex flex-col justify-start w-full"
    >
      <div className="absolute w-full h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "circInOut" }}
          className="mt-[100px] sm:mt-[150px] lg:mt-[200px] text-lg sm:text-xl lg:text-3xl font-medium tracking-tight w-full flex items-center justify-center text-center px-4"
        >
          Always at your service <br />
          Rae is built to be your AI companion, ready to assist you anytime,
          anywhere.
        </motion.div>
      </div>

      <motion.div
        style={{ height: mobile ? pageHeightMobile : pageHeight }}
        className="w-full flex items-center justify-center sticky top-[200px] sm:top-[250px] lg:top-[400px]"
      >
        <motion.div
          initial={{
            height: "20px",
            width: "20px",
            backgroundColor: "#111111",
          }}
          whileInView={{
            height: constants[state].height,
            width: constants[state].width,
            backgroundColor: state === "features" ? "#111111FF" : "#111111",
          }}
          viewport={{ once: true }}
          transition={{ type: "tween", duration: 0.2, ease: "easeInOut" }}
          className="max-w-[1340px] backdrop-blur-2xl absolute overflow-hidden top-0 flex rounded-xl mx-4 sm:mx-6 lg:mx-0"
        >
          <AnimatePresence>
            {state === "notch" && <Notch />}
            {state === "overlay" && <Overlay />}
            {state === "features" && <Features isMobile={mobile} />}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Features = ({isMobile = false} : {isMobile?: boolean}) => {
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
      className="h-full w-full p-2 sm:p-4 absolute items-center flex flex-col gap-2 sm:gap-4 bg-transparent"
    >
      <div className="flex w-full flex-col p-2 sm:p-4 rounded-2xl bg-black size-full">
        <div className="w-full h-[200px] shrink-0 sm:h-[40vw] overflow-hidden rounded-xl mb-2 sm:mb-0">
          {showFirstVideo ? (
            <motion.video
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src="/videos/notch.mp4"
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
        <div className="flex flex-col sm:flex-row pb-2 sm:pb-4 justify-between gap-2 sm:gap-4 h-3/5 sm:h-1/2">
          <div className="w-full sm:w-full h-1/2 sm:h-full flex flex-col text-white mt-2 sm:mt-4">
            <div className="text-3xl font-medium">Anytime</div>
            <div className="text-xl font-medium text-zinc-400 mb-4">
              Call Rae anywhere, just by typing @rae
            </div>
            <div className="bg-black rounded-xl flex-1 relative w-full overflow-hidden min-h-0">
              {showMiddleVideo ? (
                <motion.video
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src="/videos/at-rae.mp4"
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
          <div className="w-full  h-full flex flex-col text-white mt-4">
            <div className="text-3xl font-medium">Anywhere</div>
            <div className="text-xl font-medium text-zinc-400 mb-4">
              Rae pops up to help when you copy or highlight text
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
                  src="/videos/insert.mp4"
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
        {!isMobile && <>
        <div className="flex pb-4 justify-between gap-4 h-1/2">
          <div className="w-full h-full flex flex-col text-white mt-4">
            <div className="text-3xl font-medium">Active listening</div>
            <div className="text-xl font-medium text-zinc-400 mb-4">
              Rae reads your screen and provides context-aware assistance to help
            </div>
            <div className="bg-black rounded-xl h-full relative w-full overflow-hidden min-h-[300px]">
              {showMiddleVideo ? (
                <motion.video
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src="/videos/listening.mp4"
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
          <div className="w-full  h-full flex flex-col text-white mt-4">
            <div className="text-3xl font-medium">Tool support</div>
            <div className="text-xl font-medium text-zinc-400 mb-4">
              Rae supports a wide range of tools and applications to help you get things done
            </div>
            <div className="bg-black rounded-xl flex-1 w-full overflow-hidden min-h-[300px]">
              {showLastVideo ? (
                <motion.video
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src="/videos/tools.mp4"
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
        </div></>}
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
            <motion.div className="relative mx-4">
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="size-2 rounded-full bg-gradient-to-br from-red-400 to-red-500 shadow-xl shadow-red-400/70 ring-2 ring-red-300/40"
              />

              <motion.div
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute w-6 h-6 bg-red-400/25 rounded-full -ml-2 blur-sm"
              />

              <motion.div
                animate={{
                  scale: [1, 2.2, 1],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.5,
                }}
                className="absolute w-8 h-8 bg-red-400/15 rounded-full -ml-3 blur-lg"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              className="size-2 shrink-0 bg-gray-400 shadow-gray-400/30 rounded-full mx-4"
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
          className="text-xs sm:text-sm w-full h-full flex items-center px-2 sm:px-4 text-zinc-200 font-semibold whitespace-nowrap overflow-hidden"
        >
          <span className="truncate">{prompts[index]}</span>
        </motion.div>
      </AnimatePresence>

      {/* 🔹 Buttons */}
      <div className={`${buttonBase} text-base sm:text-xl`}>
        <ArrowElbowDownLeftIcon />
      </div>
      <div className={`${buttonBase} text-base sm:text-xl`}>
        <MicrophoneIcon />
      </div>
      <div className={`${buttonBase} text-base sm:text-xl`}>
        <PushPinIcon />
      </div>
      <div className={`${buttonBase} border-r-0 text-base sm:text-xl`}>
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
      className="size-full flex items-center absolute  overflow-hidden" // notch
    >
      <div className="relative mx-4">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="size-2 rounded-full bg-gradient-to-br from-red-400 to-red-500 shadow-xl shadow-red-400/70 ring-2 ring-red-300/40"
        />

        <motion.div
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute w-6 h-6 bg-red-400/25 rounded-full -ml-2 blur-sm"
        />

        <motion.div
          animate={{
            scale: [1, 2.2, 1],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5,
          }}
          className="absolute w-8 h-8 bg-red-400/15 rounded-full -ml-3 blur-lg"
        />
      </div>
      <div className="text-zinc-300 text-xs sm:text-sm whitespace-nowrap font-semibold overflow-hidden w-full">
        <motion.div
          className="whitespace-nowrap w-fit font-semibold text-zinc-300 text-xs sm:text-sm"
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
