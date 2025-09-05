import React, { useState } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";


export type AccordionItem = {
  question: string;
  answer: string;
};

interface AccordionProps {
  items: AccordionItem[];
  fontSize?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  fontSize = "text-2xl",
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col gap-4">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          animate={{
            opacity: openIndex === null ? 1 : openIndex === idx ? 1 : 0.8 ,
            filter:
              openIndex === null ? "blur(0px)" : openIndex === idx ? "blur(0px)" : `blur(${( Math.abs(openIndex - idx))/2 }px)`,
          }}
          className={`hover:bg-yellow-50/20 transition-colors cursor-pointer select-none overflow-hidden relative p-4 rounded-xl flex flex-col gap-2 w-full  ${fontSize}`}
        >
          <motion.div
            className="bg-zinc-900 overflow-hidden rounded-b-xl flex flex-col w-full text-white size-full absolute left-0 top-0"
            animate={{ height: openIndex === idx ? "auto" : "0%" }}
            transition={{ duration: 0.2, ease: "circInOut" }}
          >
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 size-[calc(100%-24px)] bg-zinc-800 blur-lg" ></div>
            <div className="p-4 flex flex-col gap-2 z-40">
              <div className="font-bold flex justify-between w-full items-center">
                {item.question}
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="text-black"
                >
                  <CaretDownIcon color="white" className="text-xl" />
                </motion.div>
              </div>
              <motion.div
                transition={{ duration: 0.2, ease: "circInOut" }}
                className="font-medium overflow-hidden"
              >
                {item.answer}
              </motion.div>
            </div>
          </motion.div>
          <div className="font-bold flex justify-between w-full items-center">
            {item.question}
            <motion.div
              animate={{ rotate: openIndex === idx ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="text-black"
            >
              <CaretDownIcon className="text-xl" />
            </motion.div>
          </div>
          <AnimatePresence>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.2, ease: "circInOut" }}
                className="font-medium overflow-hidden opacity-0"
              >
                {item.answer}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default Accordion;

export const defaultAccordionItems: AccordionItem[] = [
  {
    question: "why should i choose this over other products?",
    answer:
      "with intelligent context management , we are able to offer our service at a lower price than our friends over the block",
  },
  {
    question: "what are we doing different?",
    answer:
      "we are offering you the best of the best , with focus on implementing the very best tools from every segment.",
  },
  {
    question: "why does it look so good ?",
    answer: "because you only deserve the best.",
  },
  {
    question: "when is it aviable for me?",
    answer:
      "currently open to beta testers, and as soon as we secure a bag to deliver it to your doorstep!",
  },
  {
    question: "is my data safe?",
    answer:
      "your data is safer with us than it is with you. It's all encrypted with no way for us or any third party team to get hold of it .",
  },
];
