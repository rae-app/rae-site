function page() {
  return (
    <div className="min-h-dvh w-full  px-8 pb-12 max-w-[1400px]  text-black leading-[2vw]  font-bold  text-[2vw]  flex flex-col  z-40">
      <div className="flex flex-col w-full shrink-0 h-[30vh] items-center justify-center">
        <div className=" w-full text-center   h-fit z-40 ">
          {`"We would rather be dead, than build something Mid"`.toUpperCase()}
        </div>
        <div className="z-40 text-right mt-4"> - Founders, RAE</div>
      </div>
      <div className="text-black z-40 grid grid-cols-2 grid-rows-2 gap-8">
        <div className="bg-zinc-950 rounded-xl relative text-white p-8 text-3xl font-medium flex">
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 size-[calc(100%-24px)] z-10 bg-zinc-900 blur-md"></div>
          <div className="z-40">
            In sheer pain of watching everyone scramble the web to search for
            tools that fit their specific need, we put them all in one basket
            and are delivering them to your doorstep. Making AI finally feel
            like your Assistant.
          </div>
        </div>
        <div className="size-full bg-black rounded-xl overflow-hidden relative  outline-black outline-4">
          <img
            src="/assets/images/image1.jpeg"
            className="absolute size-full object-cover "
            alt=""
          />
        </div>
        <div className="size-full bg-black rounded-xl overflow-hidden relative  outline-black outline-4">
          <img
            src="/assets/images/build.jpg"
            className="absolute size-full object-cover "
            alt=""
          />
        </div>
        <div className="bg-zinc-950 rounded-xl relative text-white p-8 text-3xl font-medium flex">
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 size-[calc(100%-24px)] z-10 bg-zinc-900 blur-md"></div>
          <div className="z-40">
            The goal of Rae. is to not just awe you but also your friends.
            Fueled by a community, whose goal is to leave a mark on mankind.
            Join us as its only you that can truly help Rae rise. Be a part of
            something you would tell your grandchildren about.
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
