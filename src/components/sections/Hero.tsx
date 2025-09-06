"use client"
import React from "react";
import HeroButton from "../ui/button/HeroButton";
import { useLenis } from "lenis/react";
import { useRouter } from "next/navigation";

const Hero: React.FC = () => {
  const lenis = useLenis();
  const router = useRouter()

  return (
    <section className="relative mb-8 sm:mb-12 w-full min-h-[calc(75vh)] sm:min-h-[calc(80vh)] flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="text-center font-bold md:text-left">
        {/* Heading */}
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[5vw] text-black leading-tight lg:leading-[5vw]">
          MAKE YOUR DESKTOP
        </h1>
        <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[6vw] text-black mb-4 sm:mb-6 leading-tight">
          SMARTER
        </h2>

        {/* Sub-Heading */}
        <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black mb-6 sm:mb-8 leading-normal max-w-md sm:max-w-xl md:max-w-none mx-auto md:mx-0">
          Rae is an invisible desktop assistant that takes care of tasks for you, right on your screen.
        </p>

        {/* CTA */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center md:justify-start">
          <HeroButton onClick={() => lenis?.scrollTo(950)} className="w-full sm:w-auto text-base py-4 px-6">KNOW MORE</HeroButton>
          <HeroButton
            onClick={() => router.push("/info/waitlist")}
            colors={{
              border: "#6C1011",
              hoverBackground: "#921012FF",
              innerStart: "#FF3B3EFF",
              innerEnd: "#FC1D21FF",
              backgroundStart: "#FC1D21FF",
              backgroundEnd: "#FF3B3EFF",
            }}
            className="w-full sm:w-auto text-base py-4 px-6"
          >
            JOIN WAITLIST
          </HeroButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;
