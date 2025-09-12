"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import HeroButton from "../ui/button/HeroButton";
import { useLenis } from "lenis/react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const Hero: React.FC = () => {
  const lenis = useLenis();
  const router = useRouter();

  const [users, setUsers] = useState(0);

  useEffect(() => {
    const supabaseMain = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_MAIN_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_MAIN_KEY!
    );

    let channel: any;

    const subscribeToChanges = async () => {
      // Get initial count
      const { count } = await supabaseMain
        .from("waitlist_dev")
        .select("*", { count: "exact", head: true });
      setUsers(count ?? 0);

      // Subscribe to INSERT events
      const channel = supabaseMain
        .channel("custom-insert-channel")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "waitlist_dev" },
          async () => {
            // When an insert happens, re-fetch the count
            const { count } = await supabaseMain
              .from("waitlist_dev")
              .select("*", { count: "exact", head: true });
            setUsers(count ?? 0);
          }
        )
        .subscribe();

      console.log("Channel subscribed:", channel.state);

      return () => {
        supabaseMain.removeChannel(channel);
      };
    };

    subscribeToChanges();

    return () => {
      if (channel) supabaseMain.removeChannel(channel);
    };
  }, []);

  return (
    <section className="relative mb-8 sm:mb-12 w-full min-h-[calc(75vh)] max-w-[1400px] sm:h-[calc(100vh-150px)] flex items-end justify-start px-4 sm:px-6 lg:px-8 py-3 sm:py-6">
      <div className="flex flex-col items-center   mb-[20px]">
        <div className="text-center  md:text-left ">
          {/* Heading */}
          <div className="flex flex-col font-medium">
            <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl  lg:text-[5vw] text-black leading-tight lg:leading-[5vw]">
              {" "}
              MAKE YOUR DESKTOP
            </div>
            <div className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl  lg:text-[6vw] text-black mb-4 sm:mb-6 leading-tight ">
              {" "}
              SMARTER
            </div>
          </div>

          {/* Sub-Heading */}
          <div className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black mb-6 sm:mb-8 leading-normal max-w-md sm:max-w-xl md:max-w-none mx-auto md:mx-0 z-[100000] relative">
            Rae is a desktop assistant that takes care of tasks for you, right
            on your screen.
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center md:justify-start">
            <HeroButton
              onClick={() => lenis?.scrollTo(950)}
              colors={{
                border: "#000000FF",
                backgroundStart: "#1A1A1AFF",
                backgroundEnd: "#3B3B3BFF",
                hoverBackground: "#141414FF",
                innerStart: "#3B3B3BFF",
                innerEnd: "#1A1A1AFF",
              }}
              className="w-full sm:w-auto text-base py-4 px-6"
            >
              KNOW MORE
            </HeroButton>
            <HeroButton
              onClick={() => router.push("/info/waitlist")}
              colors={{
                border: "#000000FF",
                backgroundStart: "#dc2626",
                backgroundEnd: "#791717FF",
                hoverBackground: "#5F0C0CFF",
                innerStart: "#791717FF",
                innerEnd: "#b91c1c",
              }}
              className="w-full sm:w-auto text-base py-4 px-6"
            >
              JOIN WAITLIST
            </HeroButton>
            <div className=" gap-2  z-40 ml-auto text-black    font-black flex px-12 items-center justify-center text-lg relative">
              <div className="opacity-80">
                <div className="absolute size-full left-0 top-0 rounded-full bg-yellow-50 z-10 blur-[10px]"></div>
                <div className="absolute size-full left-0 top-0 rounded-full bg-yellow-50 z-10 blur-[20px]"></div>
                <div className="absolute size-full left-0 top-0 rounded-full bg-yellow-50 z-10 blur-[40px]"></div>
                <div className="absolute size-full left-0 top-0 rounded-full bg-yellow-50 z-10 blur-[100px]"></div>
              </div>
              <div className="flex  overflow-hidden h-[20px]  relative z-40">
                {users
                  .toString()
                  .split("")
                  .map((l, i) => {
                    return (
                      <div
                        // key={"waitlist " + l + " " + i}
                        key={"waitlist" + i}
                        className="w-[12px] "
                      >
                        <AnimatePresence mode="sync">
                          <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: "0%", opacity: 1 }}
                            exit={{ y: "-100%", opacity: 0 }}
                            transition={{ duration: 1, ease: "circInOut" }}
                            className="w-[12px] absolute leading-5 top-0 flex items-center justify-center "
                            key={"waitlist " + l + " " + i}
                          >
                            {l}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    );
                  })}
              </div>
              <span className="z-40">ONBOARDED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
