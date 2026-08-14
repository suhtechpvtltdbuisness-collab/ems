export default function HowitWorks() {
  return (
    <div className="py-16 bg-white px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center text-center gap-6 md:gap-10 lg:gap-12">

      {/* Heading & Description */}
      <div className="flex flex-col items-center text-center gap-3 max-w-3xl">
        <h1 className="text-[#1E1E1E] font-poppins font-semibold 
          text-2xl xs:text-3xl sm:text-4xl lg:text-[40px]
          leading-snug lg:leading-[48px]
          tracking-[1.2px] sm:tracking-[1.44px]">
          How it works
        </h1>

        <p className="text-[#7C7C7C] font-nunito text-sm xs:text-base sm:text-lg
          font-normal leading-[24px] xs:leading-[26px] sm:leading-[28px]
          tracking-[-0.4px] sm:tracking-[-0.48px] max-w-[600px] mx-auto">
          ORGA brings all your business operations together into one seamless workflow. From onboarding your team to assigning tasks, tracking performance, and managing projects — everything works smoothly, intuitively, and in real time.
        </p>
      </div>

      {/* Product walkthrough video */}
      <div className="w-full max-w-[1000px] mt-0 sm:mt-2">
        <div className="overflow-hidden rounded-2xl sm:rounded-[28px] border border-[#E9E6F5] bg-[#F7F6FB] p-1.5 sm:p-2 shadow-[0_24px_70px_-30px_rgba(86,72,166,0.45)]">
          <video
            className="block w-full rounded-xl sm:rounded-[20px] object-contain"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="See how ORGA works"
          >
            <source
              src="/WhatsApp%20Video%202026-08-14%20at%2011.37.22.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
