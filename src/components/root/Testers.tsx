"use client";
import { Flask, SmileySadIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function Testers() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(true);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{ ease: "circInOut", duration: 0.5 }}
          className="fixed bottom-0 right-0 z-30 p-8"
        >
          <div className="size-fit rounded-sm border border-accent/70  bg-background/90 backdrop-blur-[2px] p-2 px-3 z-30 flex flex-col">
            <div className="size-2 bg-accent absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full "></div>
            {/*<button className="absolute right-0 top-0 m-3 p-2 rounded-sm border border-border text-black/80 hover:bg-border/50 hover:text-black">
            {" "}
            <XIcon />{" "}
          </button>*/}
            <div className="text-xl mr-24 tracking-tighter font-roboto-serif text-black flex justify-between items-center">
              We&apos;re looking for testers!
            </div>
            <div className="tracking-tighter text-text-muted">
              Want to be part of our journey?
            </div>
            <button className="bg-gradient-to-t cursor-pointer hover:to-accent flex justify-between items-center from-accent to-accent/80 text-white  text-sm rounded-sm mb-1 px-3 py-2 mt-6 shadow-[0px_0px_0.3px_1px_var(--color-accent),inset_0px_1px_0.8px_rgba(255,255,255,0.42)]">
              Contact us <Flask weight="fill" />
            </button>
            <button
              onClick={() => setOpen(false)}
              className="h-[36px] text-sm justify-between font-medium cursor-pointer flex gap-2 items-center bg-gradient-to-b from-border-button/5 hover:from-border-button/40 focus:from-border-button/40 to-border-button/80 px-3 border border-border-button rounded-sm "
            >
              Not interested
              <SmileySadIcon />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
