import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Waitlist from "@/components/sections/Waitlist";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <div className="font-instrument-sans">
      <Navbar />
      <Hero />
      <Features />
      <Waitlist />
      <Footer />
    </div>
  );
}
