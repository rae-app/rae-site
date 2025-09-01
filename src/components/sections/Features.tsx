"use client";
import {
  ArrowElbowDownLeftIcon,
  CornersOutIcon,
  MicrophoneIcon,
  PushPinIcon
} from "@phosphor-icons/react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const stops = [30, 60, 150]

const Features = () => {
  const [notch, setNotch] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["0 1", "1 1"],
  });
  // Use spring for translateY
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const yTranslate = useSpring(rawY, { stiffness: 400, damping: 60 });
  useEffect(() => {
    console.log("hello");
    const onScroll = () => {
      if (pageRef.current) {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        if (scrollPosition > (windowHeight * stops[0]) / 100) {
          setNotch(true);
          if (scrollPosition > (windowHeight * stops[1]) / 100) {
            setOverlay(true);
          } else {
            setOverlay(false);
          }
        } else {
          setNotch(false);
          setOverlay(false);
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });
  // Array of size configs: [default, overlay]
  const sizeConfigs = [
    {
      width: "200px",
      height: "40px",
      maxWidth: "1400px",
      marginBottom: "30vh",
      className: "mb-[20vh]"
    },
    {
      width: "600px",
      height: "60px",
      maxWidth: "1400px",
      marginBottom: "40vh",
      className: "mb-[20vh]"
    }
  ];

  let activeIdx = 0;
  if (overlay) activeIdx = 1;
  // else default (0)
  const activeSize = sizeConfigs[activeIdx];

  return (
    <div
      ref={pageRef}
      className="max-w-[1400px] w-full  flex items-start justify-center overflow-hidden h-[60vh] z-40 relative"
    >
      <motion.div
        style={{ y: yTranslate }}
        className="size-full flex pointer-events-none  items-end justify-center absolute left-0 bottom-full"
      >
        
        <AnimatePresence>
          {notch && (
            <>
              <div className={`absolute ${overlay ? "bottom-[50vh]" : "bottom-[40vh]"}  left-1/2 -translate-x-1/2 transition-transform -translate-y-1/2 text-4xl h-fit font-medium tracking-tight`}>
                <AnimatePresence>
                  {
                    <>
                      <motion.div
                        initial={{ y: "0px", opacity: 0  }}
                        animate={{ y: "0px", opacity: 1 }}
                        exit={{ y: "0px", opacity:0 }}
                        key={overlay ? "overlay" : "not-overlay"}
                        transition={{
                          type: "tween",
                          ease: "circInOut",
                          duration: 0.5,}}
                      >
                        {overlay ? <>Meant to help you</> : <>Always on top</>}
                      </motion.div>
                    </>
                  }
                </AnimatePresence>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  width: activeSize.width,
                  height: activeSize.height,
                  maxWidth: activeSize.maxWidth,
                  marginBottom: activeSize.marginBottom,
                  
                }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`bg-zinc-950 relative rounded-xl overflow-hidden ${activeSize.className}`}
              >
                <AnimatePresence>
                  {overlay == false && (
                    <>
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
                    </>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {overlay && (
                    <motion.div
                      initial={{ y: "0%", opacity: 1 }}
                      animate={{ y: "0", opacity: 1 }}
                      exit={{ y: "0%", opacity: 1 }}
                      transition={{
                        type: "tween",
                        ease: "circInOut",
                        duration: 0.1,
                      }}
                      className="size-full flex outline-1 outline-zinc-600  absolute items-center  overflow-hidden pointer-events-auto"
                    >
                      <div className="h-full aspect-square shrink-0 border-r border-zinc-700 flex items-center justify-center">
                        <div className="size-[10px] shrink-0 bg-accent rounded-full relative mx-4">
                          <div className="bg-accent/20 size-[20px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full animate-ping absolute "></div>
                          <div className="bg-accent/30 size-[15px] left-1/2  -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full animate-ping absolute "></div>
                          <div className="bg-accent/40 size-[10px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full animate-ping absolute "></div>
                        </div>
                      </div>
                      <div className="text-sm w-full h-full flex border-r border-zinc-700 items-center px-4 text-zinc-400 font-semibold whitespace-nowrap">
                        Whats 800 + 245?
                      </div>
                      <div className="h-full border-r border-zinc-700 hover:text-accent  text-white flex items-center justify-center hover:bg-zinc-900 text-xl aspect-square shrink-0">
                        <ArrowElbowDownLeftIcon />
                      </div>
                      <div className="h-full border-r border-zinc-700 text-white flex items-center justify-center text-xl aspect-square shrink-0">
                        <MicrophoneIcon />
                      </div>
                      <div className="h-full border-r border-zinc-700 text-white flex items-center justify-center text-xl aspect-square shrink-0">
                        <PushPinIcon />
                      </div>
                      <div className="h-full text-white flex items-center justify-center text-xl aspect-square shrink-0">
                        <CornersOutIcon />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Features;
