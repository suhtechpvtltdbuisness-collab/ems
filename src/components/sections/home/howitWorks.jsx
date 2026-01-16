export default function HowitWorks() {
  return (
    <div className="py-16 bg-white px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center text-center gap-6 md:gap-10 lg:gap-12">

      {/* Heading & Description */}
      <div className="flex flex-col items-center text-center gap-3 max-w-3xl">
        <h1 className="text-[#1E1E1E] font-poppins font-semibold 
          text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[48px] 
          leading-snug xs:leading-snug sm:leading-snug md:leading-[52px] lg:leading-[60px] 
          tracking-[1.2px] sm:tracking-[1.44px]">
          How it works
        </h1>

        <p className="text-[#7C7C7C] font-nunito text-sm xs:text-base sm:text-lg md:text-xl lg:text-[20px] 
          font-normal leading-[24px] xs:leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[32px] 
          tracking-[-0.4px] sm:tracking-[-0.48px] max-w-[600px] mx-auto">
          ORGA brings all your business operations together into one seamless workflow. From onboarding your team to assigning tasks, tracking performance, and managing projects — everything works smoothly, intuitively, and in real time.
        </p>
      </div>

      {/* Image Section */}
      <div className="flex items-center justify-center w-full mt-0 sm:mt-2">
        <img
          src="./howitworks.png"
          alt="How it works"
          className="w-full max-w-[900px] sm:max-w-[750px] md:max-w-[900px] lg:max-w-[900px] h-auto object-contain mx-auto cursor-pointer"
        />
      </div>
    </div>
  );
}
