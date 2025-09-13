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
          className="mt-[100px] sm:mt-[150px] lg:mt-[200px] text-xl sm:text-2xl lg:text-4xl font-medium tracking-tight w-full flex items-center justify-center text-center px-4"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', color: '#353839' }}
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
      <motion.div
        className="text-zinc-300 text-xs sm:text-sm whitespace-nowrap font-semibold overflow-hidden w-full flex items-center gap-3 px-2"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="whitespace-nowrap w-fit font-semibold text-zinc-300 text-xs sm:text-sm flex items-center gap-3"
          animate={{
            x: ["0%", "-60%", "0%"],
            opacity: [1, 1, 0.8, 1]
          }}
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          {/* Animated Spotify Icon */}
          <motion.svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-green-400 flex-shrink-0"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66.03 12.03 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.6-.12-.421.18-.78.6-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.241 1.081zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.42-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.441.539.3.719 1.02.419 1.56z"/>
          </motion.svg>

          {/* Animated Text */}
          <motion.span
            animate={{
              color: ["#d4d4d8", "#a1a1aa", "#d4d4d8"]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Now Playing
          </motion.span>

          <motion.span
            className="text-green-400"
            animate={{
              opacity: [1, 0.5, 1],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            •
          </motion.span>

          <motion.span
            animate={{
              color: ["#d4d4d8", "#22c55e", "#d4d4d8"]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            After Hours
          </motion.span>
        </motion.div>

        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 rounded-lg"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Features_new;
