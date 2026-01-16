export default function ProjectHowitWorks() {
  return (
    <div className="py-16 bg-white px-4 flex flex-col items-center justify-center text-center gap-12 md:gap-20 lg:gap-[60px]">


      <div className="flex items-center justify-center flex-col text-center gap-4 max-w-3xl">
        <h1 className="text-[#1E1E1E] font-poppins text-[32px] md:text-[40px] lg:text-[48px] font-semibold leading10] md:leading-[52px] lg:leading-14 tracking-[1.44px]">
          How it works
        </h1>

        <p className="text-[#7C7C7C] font-nunito text-[16px] md:text-[20px] lg:text-[24px] font-normal leading-[26px] md:leading-[30px] lg:leading-[31px] tracking-[-0.48px] max-w-[600px] mx-auto">
          Lorem ipsum dolor sit amet consectetur. kshi uemnamet consectetur. kshi uemnamet
        </p>
      </div>

      {/* Image Section */}
      <div className="flex items-center justify-center w-full">
        <img
          src="./howitworks.png"
          alt="How it works"
          className="w-full max-w-[900px] h-auto object-contain px-2 cursor-pointer"
        />
      </div>
    </div>
  );
}
