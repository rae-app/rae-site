import Features from "@/components/sections/Features_new";
import Hero from "@/components/sections/Hero";
import Waitlist from "@/components/sections/Waitlist";

export default function Home() {
  return (
      <div className="font-instrument-sans flex flex-col items-center w-full z-40">
      
      <Hero />
      <Features />
      <Waitlist />
      {/* <Footer /> */}
    </div>
  );
}
