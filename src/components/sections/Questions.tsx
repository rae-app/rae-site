
"use client";
import React from "react";
import Accordion, { AccordionItem } from "../ui/accordion/Accordion";

const questions: AccordionItem[] = [
  {
    question: "Why should I choose this over other products?",
    answer:
      "With intelligent context management, we’re able to offer our service at a lower price than our competitors.",
  },
  {
    question: "What are we doing differently?",
    answer:
      "We’re bringing you the best of the best, focusing on implementing top tools and practices from every segment.",
  },
  {
    question: "Why does it look so good?",
    answer: "Because you deserve nothing less than the best.",
  },
  {
    question: "When is it available for me?",
    answer:
      "It’s currently open to beta testers, and will be available to everyone as soon as we secure a smooth delivery process!",
  },
  {
    question: "Is my data safe?",
    answer:
      "Your data is safer with us than anywhere else. Everything is encrypted, with no way for us or any third party to access it.",
  },
];


const Questions = () => {
  return (
    <div className="min-h-[80vh] w-full flex justify-center">
      <div className="max-w-[1400px] h-fit px-8 w-full flex flex-col rounded-xl mb-12" style={{ fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', color: '#353839' }}>
        <Accordion items={questions} fontSize="text-3xl" />
      </div>
    </div>
  );
};

export default Questions;
