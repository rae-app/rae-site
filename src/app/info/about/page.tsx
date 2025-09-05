
function page() {
  return (
    <div className="min-h-dvh w-full  px-8 pb-12 max-w-[1400px]  text-black leading-[2vw]  font-bold  text-[2vw]  flex flex-col  z-40">
      
      <div className="flex flex-col w-full shrink-0 h-[30vh] items-center justify-center">
        <div className=" w-full text-center   h-fit z-40 ">
          {`"I would rather be dead, than build something Mid"`.toUpperCase()}
        </div>
        <div className="z-40 text-right mt-4"> - TEAM, RAE</div>
      </div>
      <div className="text-black z-40 grid grid-cols-2 grid-rows-2 gap-8">
        <div className="bg-black rounded-xl text-white p-8 text-3xl font-medium">
          Built by engineers challenging mediocrity. In sheer pain of watching
        everyone scramble the web to search for tools that fit their specific
        need, we put them all in one basket and are delivering them to your
        doorstep. 
        </div>
        <div className="size-full bg-black rounded-xl overflow-hidden relative  outline-black outline-4" >
          <img src="/assets/images/image1.jpeg" className="absolute size-full object-cover " alt="" />
        </div>
        <div className="size-full bg-black rounded-xl overflow-hidden relative  outline-black outline-4" >
          <img src="/assets/images/build.jpg" className="absolute size-full object-cover " alt="" />
        </div>
        <div className="bg-black rounded-xl text-white p-8 text-3xl font-medium">
          The goal of Rae. is to not just awe you but also your friends.
        Tighten your belts , and hold your horses , because we are bringing you
        something truly epic. Something you would tell your grandchildren about.
        </div>
      </div>
    </div>
  );
}

export default page;
