import React from "react";

export default function About() {
  return (
    <div id="about" className=" border-b border-border flex flex-col p-8">
      <div className="text-3xl font-roboto-serif tracking-tighter text-accent">
        About us
      </div>
      <div className="mt-4 wrap-anywhere text-wrap">
        In sheer pain of watching everyone scramble the web to search for tools
        that fit their specific need, we put them all in one basket and are
        delivering them to your doorstep.
        <br></br> <br></br>
        It all began when one of us was creating a similar product. We realized
        that there were no tools available that could do things for us quickly
        and easily. So, we decided to create our own.
        <br></br> <br></br>
        Brought to you by{" "}
        <a
          href="https://github.com/amoreX"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-accent cursor-pointer"
        >
          Nihal
        </a>
        ,{" "}
        <a
          href="https://github.com/kushagra2503"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-accent cursor-pointer"
        >
          Kushagra
        </a>{" "}
        and{" "}
        <a
          href="https://github.com/ronishrohan"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-accent cursor-pointer"
        >
          Ronish
        </a>
      </div>
    </div>
  );
}
