export default function ProjectHowitWorks() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 bg-white px-4 py-16 text-center sm:px-6 lg:gap-10 lg:py-20">


      <div className="flex items-center justify-center flex-col text-center gap-4 max-w-3xl">
        <h2 className="text-[#1E1E1E] font-poppins text-3xl sm:text-4xl lg:text-[40px] font-semibold leading-tight tracking-[1.2px]">
          How it works
        </h2>

        <p className="text-[#7C7C7C] font-nunito text-base sm:text-lg font-normal leading-7 tracking-[-0.3px] max-w-[600px] mx-auto">
          Get started in minutes. Set up your workspace, collaborate with your team, and streamline your operations with ORGA        </p>
      </div>

      {/* Product walkthrough video */}
      <div className="w-full max-w-[1000px] px-2">
        <div className="overflow-hidden rounded-2xl border border-[#E9E6F5] bg-[#F7F6FB] p-1.5 shadow-[0_24px_70px_-30px_rgba(86,72,166,0.45)] sm:rounded-[28px] sm:p-2">
          <video
            className="block w-full rounded-xl object-contain sm:rounded-[20px]"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="See how ORGA works"
          >
            <source src="/WhatsApp%20Video%202026-08-14%20at%2011.37.22.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
