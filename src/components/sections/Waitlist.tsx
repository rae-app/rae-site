"use client";
import { HandHeartIcon, HeartIcon } from "@phosphor-icons/react/dist/ssr";
import React, { useRef, useState, useEffect, FormEvent } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { addToWaitlist, getWaitlistCount } from "@/app/actions/waitlist";

export default function Waitlist() {
  const pageRef = useRef(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [waitlistCount, setWaitlistCount] = useState(265);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["0 1", "1 1"],
  });

  const scaleT = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const count = await getWaitlistCount();
        setWaitlistCount(count);
      } catch (error) {
        console.error("Failed to fetch waitlist count:", error);
      }
    };
    fetchCount();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || !email.trim()) return;

    setIsSubmitting(true);
    setStatus("idle");

    try {
      // await addToWaitlist({ email });
      setEmail("");
      setStatus("success");
      // Update count after successful submission
      const newCount = await getWaitlistCount();
      setWaitlistCount(newCount);
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={pageRef}
      id="waitlist"
      className="border-b border-border relative h-[calc(100vh-300px)] flex flex-col p-8 relative items-center justify-center overflow-hidden"
    >
      {status === "success" && (
        <>
          <div className="absolute flex bg-accent sm:bg-transparent size-full z-[29] items-center justify-center">
            <motion.div
              initial={{ scale: 0.1, rotate: -40, y: "40vh" }}
              animate={{ scale: 1, rotate: 0, y: "0vh" }}
              transition={{ delay: 0, duration: 0.4, ease: "easeInOut" }}
              className="absolute right-0 flex items-center justify-center"
            >
              <HeartIcon weight="fill" size={1500} className="text-accent " />
            </motion.div>
            <motion.div
              initial={{ scale: 0.05, rotate: 20, y: "40vh" }}
              animate={{ scale: 1, rotate: 0, y: "0vh" }}
              transition={{ delay: 0.2, duration: 0.3, ease: "easeInOut" }}
              className="absolute left-[200px]  flex items-center justify-center"
            >
              <HeartIcon weight="fill" size={1500} className="text-accent " />
            </motion.div>
          </div>
        </>
      )}
      {status === "success" && (
        <>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.2 }}
            className="absolute size-full z-30 text-left sm:text-center  text-white flex sm:items-center sm:justify-center flex-col p-8 "
          >
            <div className="text-3xl mb-4 font-roboto-serif tracking-tighter flex gap-2 items-center">
              {/*<HeartIcon weight="fill" className="hidden sm:block" />*/}
              Your support means the world to us!
              {/*<HeartIcon weight="fill" className="hidden sm:block" />*/}
            </div>
            <div className="text-3xl font-roboto-serif tracking-tighter">
              We'll notify you soon
            </div>
            <div className="tracking-tighter text-red-100">
              Keep a look out for an email from us
            </div>
          </motion.div>
        </>
      )}
      <motion.div
        style={{ scale: scaleT }}
        className="absolute left-[50%] bottom-[0] flex items-center justify-center opacity-80 "
      >
        <div className="size-[30vw] absolute border bottom-0 translate-y-1/2 border-border  rounded-full " />
        <div className="size-[20vw] absolute border bottom-0 translate-y-1/2 border-border/90 rounded-full " />
        <div className="size-[40vw] absolute border bottom-0 translate-y-1/2 border-border/80 rounded-full " />
        <div className="size-[45vw] absolute border bottom-0 translate-y-1/2 border-border/70 rounded-full " />
        <div className="size-[45vw] absolute border bottom-0 translate-y-1/2 border-border/65 rounded-full " />
        <div className="size-[50vw] absolute border bottom-0 translate-y-1/2 border-border/60 rounded-full " />
        <div className="size-[60vw] absolute border bottom-0 translate-y-1/2 border-border/40 rounded-full " />
      </motion.div>
      <div
        style={{ opacity: status == "success" ? 0 : 1 }}
        className="size-full z-20 flex flex-col items-center justify-center"
      >
        <div className="font-roboto-serif text-accent text-3xl tracking-tighter">
          Get notified when we launch
        </div>
        <div className="tracking-tighter text-text-muted">
          Join the waitlist,{" "}
          <span className="text-accent">{waitlistCount}</span> already have
        </div>

        {status === "error" && (
          <div className="text-red-600 text-sm mt-2">
            Something went wrong. Please try again.
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full sm:w-fit">
          <motion.div className="flex sm:flex-row flex-col w-full sm:w-fit gap-2 mt-4">
            <input
              type="email"
              placeholder="Your email here"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              required
              disabled={isSubmitting}
              className="h-[36px] focus:bg-white focus:border-accent outline-none border px-3 border-zinc-600 bg-white/90 rounded-sm sm:w-[350px] disabled:opacity-50"
            />
            <PrimaryButton
              type="submit"
              disabled={isSubmitting || !email.trim()}
              className="h-[36px]"
            >
              <HandHeartIcon weight="fill" size={20} />
              {isSubmitting ? "Joining..." : "Lets go"}
            </PrimaryButton>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
