import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 bg-hero-radial-right bg-hero-radial bg-white">
      <div className="text-center md:text-left max-w-4xl">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-black leading-snug mb-4">
          MAKE YOUR DESKTOP
        </h1>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black leading-tight mb-6">
          SMARTER
        </h2>

        {/* Sub-Heading */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 mb-8 leading-relaxed">
          <span className="block">
            Kowl is an invisible desktop assistant that takes
          </span>
          <span className="block">
             care of tasks for you,right on your screen.
          </span>
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button className="bg-black text-white px-6 py-3 rounded-lg shadow-md cursor-pointer w-full sm:w-auto">
            KNOW MORE
          </button>
          <button className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition cursor-pointer w-full sm:w-auto">
            JOIN WAITLIST
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
