"use client";

import { useSmoothScroll } from "@/hooks/useScroll";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { EnvelopeIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

const Navbar = ({}) => {
  const { scrollToSection } = useSmoothScroll();
  return (
    <div className="h-[58px] z-50 shrink-0 flex w-full border-b border-border fixed top-0 bg-gradient-to-b  from-background to-background/20 backdrop-blur-xs ">
      <div className="mx-auto border-x border-border px-8 w-full sm:max-w-[1600px] h-full flex items-center ">
        <button
          onClick={() => scrollToSection("home")}
          className="text-xl cursor-pointer font-medium sm:flex hidden !m-0 flex gap-1 items-center "
        >
          <div className="size-5 shrink-0 relative">
            <Image
              src="/assets/favicon/rae.png"
              className=" size-full absolute"
              alt="Rae logo"
              width={20}
              height={20}
            />
          </div>
          {/*<div className=" size-4 rounded-full border-3 border-accent "></div>{" "}*/}
          Rae
        </button>
        {/*<div className="ml-auto gap-2 text-sm flex h-full items-center"></div>*/}

        <div className=" h-full sm:ml-auto w-full sm:w-fit text-sm flex gap-2 items-center">
          <div
            onClick={() => scrollToSection("features")}
            className="cursor-pointer border border-transparent hover:border-border h-[32px] px-2 hover:bg-border/40 flex items-center rounded-sm transition-colors duration-75"
          >
            Features
          </div>
          <div
            onClick={() => scrollToSection("about")}
            className="cursor-pointer border border-transparent hover:border-border h-[32px] px-2 hover:bg-border/40 flex items-center rounded-sm transition-colors duration-75"
          >
            About
          </div>
          <div
            onClick={() => scrollToSection("contact")}
            className="cursor-pointer border border-transparent hover:border-border h-[32px] px-2 hover:bg-border/40 flex items-center rounded-sm transition-colors mr-4 duration-75"
          >
            Contact
          </div>
          {/*<div
            onClick={toggleTheme}
            className="cursor-pointer h-[28px] px-2 hover:bg-border/40 flex items-center rounded-sm"
          >
            Theme
          </div>*/}
          {/*<PrimaryButton className="h-[28px]">
            <div className="h-[12px] aspect-square grid grid-cols-2 grid-rows-2 gap-[2px]">
              <div className="bg-white"></div>
              <div className="bg-white"></div>
              <div className="bg-white"></div>
              <div className="bg-white"></div>
            </div>{" "}
            Download
          </PrimaryButton>*/}
          <PrimaryButton
            onClick={() => scrollToSection("waitlist")}
            className="h-[32px] ml-auto sm:ml-0"
          >
            <EnvelopeIcon weight="fill" size={20} />
            <span className="hidden sm:flex">Join waitlist</span>
            <span className="flex sm:hidden">Waitlist</span>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
