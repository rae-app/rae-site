"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

function Features() {
  const featuresPage = useRef(null);
  const contentPage = useRef(null)
  const { scrollYProgress } = useScroll({
    target: featuresPage,
    offset: ["0 1", "1 1"],
  });
  const { scrollYProgress: contentScrollProgress } = useScroll({
    target: contentPage,
    offset: ["0 1", "1 1"],
  });
  const heightPage = useSpring(
    useTransform(scrollYProgress, [0, 1], ["5vh", "100vh"]),
    {
      stiffness: 100,
      damping: 25,
    }
  );
  const widthPage = useSpring(
    useTransform(scrollYProgress, [0, 1], ["30%", "100%"]),
    {
      stiffness: 100,
      damping: 20,
    }
  );

  const translateContent = useTransform(
    contentScrollProgress, [0, 1], ["0%", "-100%"]
  )

  const translatePage = useSpring(
    useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]),
    {
      stiffness: 100,
      damping: 20,
    }
  );
  const roundedPage = useTransform(scrollYProgress, [0, 1], ["0rem", "1rem"]);
  return (
    <div className="h-[300vh] w-[1200px]  relative z-40 flex justify-center ">
      {/* <div className="z-50 text-white">hello</div> */}
      <motion.div
        style={{
          height: heightPage,
          width: widthPage,
          translateY: translatePage,
        }}
        className=" top-[98px]   sticky   flex  overflow-hidden px-8"
      >
        <motion.div
          style={{
            borderBottomRightRadius: roundedPage,
            borderBottomLeftRadius: roundedPage,
          }}
          className="bg-zinc-950 rounded-t-2xl size-full max-h-[calc(100vh-124px)] flex items-center "
        >
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0, 1], [1, 0]), scale: useTransform(scrollYProgress, [0, 1], [1, 0]) }}
            className="bg-accent absolute size-[12px] mx-4 outline-4 outline-accent/20 rounded-full"
          ></motion.div>
          <motion.div
            style={{ opacity: scrollYProgress, y: translateContent }}
            className="text-white  h-fit w-[1140px] absolute top-0  px-5 py-4 flex flex-col"
          >
            <div className="flex flex-col gap-2 ">
              <div className="text-2xl font-semibold">FEATURE #1</div>
              <div>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum vehicula arcu in eros auctor maximus. Vestibulum
                porta, nunc vel porttitor posuere, augue justo vestibulum ante,
                vitae suscipit erat justo lacinia elit. Duis ac odio sed nulla
                venenatis suscipit. Donec urna nisi, varius quis varius quis,
                venenatis vitae urna. Nulla bibendum blandit nisl, id faucibus
                sem sollicitudin a. Quisque ut mauris ligula. Aliquam eget orci
                id dolor imperdiet fringilla ut a turpis. Maecenas non urna et
                nisi ultrices dictum nec id quam. Aliquam et rutrum nibh. Nulla
                ullamcorper vel urna a condimentum. Donec dapibus sit amet leo
                tempor ultrices. Quisque a tortor vel purus laoreet convallis
                sit amet a magna. Mauris ac euismod eros. Sed sagittis enim
                congue massa elementum, eu maximus ex tincidunt. Cras maximus
                interdum nunc non varius. Vestibulum at nibh at justo porttitor
                finibus. Pellentesque pellentesque, nisl ac volutpat posuere,
                risus lacus aliquet metus, imperdiet posuere lectus ipsum id
                elit. Integer malesuada viverra vestibulum. Cras dapibus
                fringilla magna. In eget augue sed urna finibus tempus in id
                lorem. Maecenas pulvinar tellus in viverra vulputate. Maecenas
                molestie neque et elit fermentum, quis pharetra ex imperdiet.
                Mauris vitae lectus lorem. Pellentesque vitae dolor libero.
                Aliquam accumsan faucibus vehicula. Morbi lorem odio, rhoncus ut
                metus vitae, hendrerit feugiat metus. Curabitur ornare blandit
                ultrices. Sed malesuada lectus libero. Vivamus sollicitudin
                iaculis sollicitudin. Etiam sed ligula faucibus risus mollis
                volutpat. Phasellus consectetur nisi non molestie vestibulum.
                Cras tempor est feugiat libero dapibus, eget hendrerit tellus
                pretium. Aenean faucibus ac lectus sit amet posuere. Sed aliquet
                eleifend tellus, ut ultricies libero lobortis a. In consectetur
                lobortis ligula, non pharetra neque. Pellentesque habitant morbi
                tristique senectus et netus et malesuada fames ac turpis
                egestas. In at urna vel neque aliquam dignissim. Morbi
                condimentum nec nunc nec varius. Vestibulum malesuada
                condimentum eros, ac mattis purus. Vivamus nec rhoncus dolor,
                sed malesuada arcu. Mauris non interdum ipsum, eu scelerisque
                dui.{" "}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-semibold">FEATURE #1</div>
              <div>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum vehicula arcu in eros auctor maximus. Vestibulum
                porta, nunc vel porttitor posuere, augue justo vestibulum ante,
                vitae suscipit erat justo lacinia elit. Duis ac odio sed nulla
                venenatis suscipit. Donec urna nisi, varius quis varius quis,
                venenatis vitae urna. Nulla bibendum blandit nisl, id faucibus
                sem sollicitudin a. Quisque ut mauris ligula. Aliquam eget orci
                id dolor imperdiet fringilla ut a turpis. Maecenas non urna et
                nisi ultrices dictum nec id quam. Aliquam et rutrum nibh. Nulla
                ullamcorper vel urna a condimentum. Donec dapibus sit amet leo
                tempor ultrices. Quisque a tortor vel purus laoreet convallis
                sit amet a magna. Mauris ac euismod eros. Sed sagittis enim
                congue massa elementum, eu maximus ex tincidunt. Cras maximus
                interdum nunc non varius. Vestibulum at nibh at justo porttitor
                finibus. Pellentesque pellentesque, nisl ac volutpat posuere,
                risus lacus aliquet metus, imperdiet posuere lectus ipsum id
                elit. Integer malesuada viverra vestibulum. Cras dapibus
                fringilla magna. In eget augue sed urna finibus tempus in id
                lorem. Maecenas pulvinar tellus in viverra vulputate. Maecenas
                molestie neque et elit fermentum, quis pharetra ex imperdiet.
                Mauris vitae lectus lorem. Pellentesque vitae dolor libero.
                Aliquam accumsan faucibus vehicula. Morbi lorem odio, rhoncus ut
                metus vitae, hendrerit feugiat metus. Curabitur ornare blandit
                ultrices. Sed malesuada lectus libero. Vivamus sollicitudin
                iaculis sollicitudin. Etiam sed ligula faucibus risus mollis
                volutpat. Phasellus consectetur nisi non molestie vestibulum.
                Cras tempor est feugiat libero dapibus, eget hendrerit tellus
                pretium. Aenean faucibus ac lectus sit amet posuere. Sed aliquet
                eleifend tellus, ut ultricies libero lobortis a. In consectetur
                lobortis ligula, non pharetra neque. Pellentesque habitant morbi
                tristique senectus et netus et malesuada fames ac turpis
                egestas. In at urna vel neque aliquam dignissim. Morbi
                condimentum nec nunc nec varius. Vestibulum malesuada
                condimentum eros, ac mattis purus. Vivamus nec rhoncus dolor,
                sed malesuada arcu. Mauris non interdum ipsum, eu scelerisque
                dui.{" "}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      <div
        ref={featuresPage}
        className="h-[30vh] absolute w-full  z-[10] flex items-center justify-center  overflow-hidden pointer-events-none"
      ></div>
       <div
        ref={contentPage}
        className="h-[170vh] top-[100vh] pointer-events-none absolute w-full  z-[10] flex items-center justify-center  overflow-hidden"
      ></div>
      
    </div>
  );
}

export default Features;
