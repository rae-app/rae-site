"use client";
import React, { useEffect, useState } from "react";
import HeroButton from "../ui/button/HeroButton";
import { useLenis } from "lenis/react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const Hero: React.FC = () => {
  const lenis = useLenis();
  const router = useRouter();

  const [users, setUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const supabaseMain = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_MAIN_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_MAIN_KEY!
        );

        const { data } = await supabaseMain.from("waitlist").select("*");
        setUsers(data?.length || 0);
      } catch (error) {
        console.log(error);
        setUsers(0);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="relative mb-8 sm:mb-12 w-full min-h-[calc(75vh)] sm:min-h-[calc(80vh)] flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="text-center font-bold md:text-left">
        {/* Heading */}
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[5vw] text-black leading-tight lg:leading-[5vw]" style={{ fontFamily: 'Varela Round' }}>
          make your desktop
        </h1>
        <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[6vw] mb-4 sm:mb-6 leading-tight text-red-500" style={{ fontFamily: 'Story Script' }}>
          smarter
        </h2>

        {/* Sub-Heading */}
        <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-8 sm:mb-12 leading-normal max-w-md sm:max-w-xl md:max-w-none mx-auto md:mx-0" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', color: '#353839' }}>
          Rae is a desktop assistant that takes care of tasks for you, right on
          your screen.
        </p>

        {/* CTA */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center md:justify-start">
          <HeroButton
            onClick={() => lenis?.scrollTo(950)}
            colors={{
              border: "#2d2d2d",
              backgroundStart: "#545454",
              backgroundEnd: "#8f8f8f",
              hoverBackground: "#424242",
              innerStart: "#6e6e6e",
              innerEnd: "#aaaaaa",
            }}
            className="w-full sm:w-auto text-base py-4 px-6"
          >
            KNOW MORE
          </HeroButton>
          <HeroButton
            onClick={() => router.push("/info/waitlist")}
            colors={{
              border: "#7e0f07", //sabse neeche wala line
              backgroundStart: "#9e1309", //border ka left part
              backgroundEnd: "#e21b0c", //border ka right part
              hoverBackground: "#9f2e16",// beech ka width
              innerStart: "#bb160a",
              innerEnd: "#F44336",
            }}
            className="w-full sm:w-auto text-base py-4 px-6 pt-4"
          >
            JOIN WAITLIST
          </HeroButton>
          <div className=" px-12 py-2 gap-2 rounded-lg ml-auto  flex items-end justify-center text-3xl">
            <div
              
              className=" "
            >
              {users}
            </div>
            <span className="text-lg" style={{ color: '#353839', transform: 'translateY(-5px)' }}>ONBOARDED</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
