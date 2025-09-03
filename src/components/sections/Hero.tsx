import React from "react";
import HeroButton from "../ui/button/HeroButton";

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[calc(100dvh)] flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 ">
      <div className="text-center font-bold md:text-left ">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[5vw] text-black lg:leading-[5vw]  ">
          MAKE YOUR DESKTOP
        </h1>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[6vw] text-black mb-6">
          SMARTER
        </h2>

        {/* Sub-Heading */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black  mb-8 leading-6">
          Rae is an invisible desktop assistant that takes care of tasks for
          you, right on your screen.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start ">
          <HeroButton className="text-base py-4 px-6">KNOW MORE</HeroButton>
          <HeroButton colors={{
            border: "#6C1011",
            hoverBackground: "#921012FF",
            innerStart: "#FF3B3EFF",
            innerEnd: "#FC1D21FF",
            backgroundStart: "#FC1D21FF",
            backgroundEnd: "#FF3B3EFF",
          }} className="text-base py-4 px-6">JOIN WAITLIST</HeroButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;
