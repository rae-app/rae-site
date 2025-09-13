function page() {
  return (
    <div className="min-h-dvh w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 max-w-[1400px] mx-auto text-black leading-relaxed sm:leading-[2vw] font-bold text-lg sm:text-xl lg:text-[2vw] flex flex-col z-40">
      <div className="flex flex-col w-full shrink-0 h-[25vh] sm:h-[30vh] items-center justify-center px-4">
        <div className="w-full text-center h-fit z-40 text-base sm:text-lg lg:text-[2vw] leading-tight sm:leading-relaxed" style={{ fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', color: '#353839' }}>
          {`"We would rather be dead, than build something Mid"`.toUpperCase()}
        </div>
        <div className="z-40 text-right mt-2 sm:mt-4 text-sm sm:text-base lg:text-[1.5vw]" style={{ fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', color: '#353839' }}> - Founders, RAE</div>
      </div>
      <div className="text-black z-40 grid grid-cols-1 sm:grid-cols-2 grid-rows-4 sm:grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
        <div className="bg-zinc-950 rounded-xl relative text-white p-4 sm:p-6 lg:p-8 text-base sm:text-lg lg:text-2xl xl:text-3xl font-medium flex min-h-[200px] sm:min-h-[250px] transform hover:scale-[1.02] transition-all duration-300 shadow-2xl hover:shadow-3xl" style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 size-[calc(100%-16px)] sm:size-[calc(100%-24px)] z-10 bg-zinc-900 blur-md"></div>
          <div className="z-40 leading-relaxed">
            In sheer pain of watching everyone scramble the web to search for
            tools that fit their specific need, we put them all in one basket
            and are delivering them to your doorstep. Making AI finally feel
            like your Assistant.
          </div>
        </div>
        <div className="size-full bg-black rounded-xl overflow-hidden relative outline-black outline-2 sm:outline-4 min-h-[200px] sm:min-h-[250px] transform hover:scale-[1.02] transition-all duration-300 shadow-2xl hover:shadow-3xl" style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
          <img
            src="/assets/images/human.gif"
            className="absolute size-full object-cover"
            alt="Human interaction with technology"
          />
        </div>
        <div className="size-full bg-black rounded-xl overflow-hidden relative outline-black outline-2 sm:outline-4 min-h-[200px] sm:min-h-[250px] order-4 sm:order-3 transform hover:scale-[1.02] transition-all duration-300 shadow-2xl hover:shadow-3xl" style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
          <img
            src="/assets/images/wolf.gif"
            className="absolute size-full object-cover"
            alt="Wolf representing strength and community"
          />
        </div>
        <div className="bg-zinc-950 rounded-xl relative text-white p-4 sm:p-6 lg:p-8 text-base sm:text-lg lg:text-2xl xl:text-3xl font-medium flex min-h-[200px] sm:min-h-[250px] order-3 sm:order-4 transform hover:scale-[1.02] transition-all duration-300 shadow-2xl hover:shadow-3xl" style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 size-[calc(100%-16px)] sm:size-[calc(100%-24px)] z-10 bg-zinc-900 blur-md"></div>
          <div className="z-40 leading-relaxed">
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
