"use client";
import {
  EnvelopeOpenIcon,
  Flask,
  Smiley,
  SmileySadIcon,
  XLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function Testers() {
  const [open, setOpen] = useState(false);
  const [interested, setInterested] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsMobile(userAgent.includes("Mobile") || userAgent.includes("Android"));
  }, []);

  useEffect(() => {
    // Check if user has already interacted with the testers popup
    const showShowTesters = localStorage.getItem("showShowTesters");
    if (showShowTesters === "true") {
      return; // Don't show the popup if user already interacted
    }

    const timeout = setTimeout(() => {
      setOpen(true);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  const [clicked, setClicked] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            y: "100%",
            width: isMobile ? "100%" : "450px",
            height: isMobile ? "auto" : "230px",
          }}
          animate={{
            y: "0%",
            width: isMobile ? "100%" : interested ? "600px" : "450px",
            height: isMobile ? "auto" : interested ? "280px" : "230px",
          }}
          exit={{ y: "100%" }}
          transition={{ ease: "circInOut", duration: 0.5 }}
          className="fixed  bottom-0 right-0 z-50 p-8"
        >
          <div className="size-full rounded-sm border border-accent/70  bg-background/90 backdrop-blur-[2px] p-2 px-3 z-30 flex flex-col">
            <div className="size-2 bg-accent absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full "></div>
            {/*<button className="absolute right-0 top-0 m-3 p-2 rounded-sm border border-border text-black/80 hover:bg-border/50 hover:text-black">
            {" "}
            <XIcon />{" "}
          </button>*/}
            <div className="text-xl  tracking-tighter font-roboto-serif text-black flex justify-between items-center">
              {interested
                ? "You can contact us through these"
                : "We're looking for testers!"}
            </div>
            <div className="tracking-tighter text-text-muted">
              {interested
                ? "Choose which one you prefer"
                : "Want to be part of our journey?"}
            </div>
            <button
              onClick={() => {
                if (!interested) {
                  setInterested(true);
                } else {
                  localStorage.setItem("showShowTesters", "true");
                  window.open("https://twitter.com/nihaliscoding", "_blank");
                  setClicked(true);
                }
              }}
              className="bg-gradient-to-t h-[40px] mt-auto w-full cursor-pointer hover:to-accent flex justify-between items-center from-accent to-accent/80 text-white  text-sm rounded-sm  px-3 py-2  shadow-[0px_0px_0.3px_1px_var(--color-accent),inset_0px_1px_0.8px_rgba(255,255,255,0.42)] mb-2"
            >
              {interested ? (
                <>
                  Text our founder on twitter <XLogoIcon weight="fill" />
                </>
              ) : (
                <>
                  Contact us <Flask weight="fill" />
                </>
              )}
            </button>
            <AnimatePresence>
              {interested && (
                <>
                  <motion.button
                    initial={{ height: "0px" }}
                    animate={{ height: "40px" }}
                    transition={{ ease: "circInOut", duration: 0.5 }}
                    onClick={() => {
                      localStorage.setItem("showShowTesters", "true");
                      window.open("mailto:teamraeai@gmail.com", "_blank");
                      setClicked(true);
                    }}
                    className="bg-gradient-to-t    w-full cursor-pointer hover:to-accent flex justify-between items-center from-accent to-accent/80 text-white  text-sm rounded-sm   shadow-[0px_0px_0.3px_1px_var(--color-accent),inset_0px_1px_0.8px_rgba(255,255,255,0.42)] overflow-hidden mb-2"
                  >
                    <div className="size-full flex px-3 py-2 justify-between items-center whitespace-nowrap">
                      Mail us <EnvelopeOpenIcon weight="fill" />
                    </div>
                  </motion.button>
                </>
              )}
            </AnimatePresence>
            <button
              onClick={() => {
                localStorage.setItem("showShowTesters", "true");
                setOpen(false);
              }}
              className="h-[40px] text-sm justify-between font-medium cursor-pointer flex gap-2 items-center bg-gradient-to-b from-border-button/5 hover:from-border-button/40 focus:from-border-button/40 to-border-button/80 px-3 border border-border-button rounded-sm mb-1"
            >
              {clicked ? (
                <>
                  Done <Smiley />
                </>
              ) : (
                <>
                  {interested
                    ? "Sorry clicked the wrong button"
                    : "Not interested"}
                  <SmileySadIcon />
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
