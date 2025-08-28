import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Waitlist from "@/components/sections/Waitlist";
import Footer from "@/components/ui/Footer";
import ReactLenis from "lenis/react";

export default function Home() {
  return (
    <ReactLenis root>
      <div className="font-instrument-sans  bg-hero-radial-right bg-hero-radial">
      <Navbar />
      <Hero />
      <Features />
      <Waitlist />
      <Footer />
    </div>
    </ReactLenis>
  );
}
