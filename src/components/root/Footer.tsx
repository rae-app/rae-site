"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import {
  DiscordLogoIcon,
  InstagramLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["0 1", "0.5 1"],
  });
  const springY = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
  });
  const tY = useTransform(springY, [0, 1], ["-300%", "0%"]);
  const tY1 = useTransform(springY, [0, 1], ["-350%", "0%"]);
  const tY2 = useTransform(springY, [0, 1], ["-400%", "0%"]);

  return (
    <div
      ref={pageRef}
      id="contact"
      className="bg-zinc-900 text-white w-full h-fit   shrink-0 flex flex-col"
    >
      <div className="mx-auto border-x divide-x divide-zinc-800  border-zinc-800 w-full max-w-[1200px] h-full flex sm:flex-row flex-col">
        <div className="h-full w-full sm:w-fit shrink-0 flex flex-col p-8">
          <motion.div className="text-4xl flex gap-3 items-center">
            <motion.div
              style={{ scale: springY }}
              className="size-7 border-4 border-accent rounded-full"
            ></motion.div>
            <motion.div className="flex">
              <motion.div style={{ y: tY, scaleY: springY }}> R</motion.div>
              <motion.div style={{ y: tY1, scaleY: springY }}> a</motion.div>
              <motion.div style={{ y: tY2, scaleY: springY }}> e</motion.div>
            </motion.div>
          </motion.div>
          <div className="mt-4 text-zinc-300 hover:text-white hover:underline cursor-pointer">
            teamraeai@gmail.com
          </div>
          <div className=" text-zinc-300 hover:text-white hover:underline cursor-pointer">
            +91 75508 83806
          </div>
          <div className=" text-zinc-300 hover:text-white hover:underline cursor-pointer">
            Brookefield, Bengaluru, Karnataka, IN
          </div>
          <div className="text-lg mt-4">Follow for updates</div>
          <div className="flex flex-col mt-2">
            <div className="hover:underline text-zinc-300 items-center cursor-pointer hover:text-white flex gap-2">
              <DiscordLogoIcon /> Join our discord server
            </div>
            <div className="hover:underline text-zinc-300 items-center cursor-pointer hover:text-white flex gap-2">
              <XLogoIcon /> @nihaliscoding on X
            </div>
            <div className="hover:underline text-zinc-300 items-center cursor-pointer hover:text-white flex gap-2">
              <InstagramLogoIcon /> @nihal.iscooked on Instagram
            </div>
          </div>
        </div>
        <div className=" w-full  sm:flex hidden overflow-hidden relative flex flex-col p-8">
          <motion.div
            style={{ opacity: scrollYProgress }}
            className="size-full overflow-hidden relative rounded-sm"
          >
            <div className="absolute z-10 size-full flex items-start mix-blend-lighten text-transparent bg-clip-text bg-gradient-to-r from-background to-yellow-100 justify-start p-4 font-roboto-serif text-6xl tracking-tighter text-left">
              The only assistant you&apos;ll ever need
            </div>
            <motion.div>
              <img
                src="/assets/images/cloud.gif"
                className="absolute object-cover translate-y-[-120px]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="border-t border-zinc-800">
        <div className="mx-auto text-sm w-[1200px] border-x border-zinc-800 p-4 text-zinc-400">
          Copyright @2025 Rae. All rights reserved.
        </div>
      </div>
    </div>
  );
}
