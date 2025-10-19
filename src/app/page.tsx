import { EnvelopeIcon } from "@phosphor-icons/react/dist/ssr";
import React from "react";

export default function page() {
  return (
    <div className="h-[calc(100vh-52px)] flex items-center justify-center py-12">
      <div className=" flex flex-col items-center justify-center">
        <div className="text-5xl  font-roboto-serif text-accent tracking-tighter">
          Make your desktop smarter
        </div>
        <div className="tracking-tighter mt-4 text-text-muted text-center  ">
          Rae is a AI desktop assistant that can literally do anything <br></br>
          Made by developers, for developers.
        </div>
        <div className="flex gap-2 mt-4">
          <button className="button rounded-sm flex gap-2 items-center text-sm text-background dark:text-white px-3 h-[36px]   shadow-button bg-gradient-to-t from-black to-zinc-800 dark:from-accent/80 dark:to-accent">
            <EnvelopeIcon weight="fill" size={20} />
            Join the waitlist
          </button>
          <button className="h-[36px] px-3 border rounded-sm ">
            View latest updates
          </button>
        </div>
      </div>
    </div>
  );
}
