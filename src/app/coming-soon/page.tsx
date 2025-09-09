function page() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 max-w-[1400px] mx-auto text-black leading-relaxed sm:leading-[2vw] font-bold text-lg sm:text-xl lg:text-[2vw] z-40">
      <div className="flex flex-col items-center justify-center gap-4">
        <img
          src={`/assets/images/dragon.gif?t=${Date.now()}`}
          className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-transparent border-none shadow-none mb-2"
          alt="Dragon representing innovation and power"
          style={{
            background: 'transparent',
            border: 'none',
            boxShadow: 'none'
          }}
          loading="eager"
        />
        <div className="text-center h-fit z-40 text-base sm:text-lg lg:text-[2vw] leading-tight sm:leading-relaxed">
        Hold tight—we’re cooking the unexpected 
        </div>
      </div>
    </div>
  );
}

export default page;
