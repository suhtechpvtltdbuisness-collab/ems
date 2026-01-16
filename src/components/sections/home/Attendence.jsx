import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Attendance() {
  return (
    <div className="bg-white p-6 sm:p-8 md:p-[60px] grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">

      {/* Left Image */}
      <div className="bg-gray-100 p-4 sm:p-6 md:p-6 rounded-xl flex justify-center">
        <img
          src="./finance.png"
          alt="finance"
          className="w-full max-w-xs sm:max-w-sm md:max-w-full bg-white rounded-lg"
        />
      </div>

      {/* Right Content */}
      <div className="flex flex-col items-center md:items-start gap-4 sm:gap-6 md:gap-4">

        {/* Heading + Paragraph */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 sm:gap-3">
          <h1 className="text-[#292D34] font-poppins text-2xl xs:text-3xl sm:text-4xl md:text-[48px] font-semibold leading-snug sm:leading-snug md:leading-tight">
            Simplify HR, Payroll &{" "}
            <span className="block bg-linear-to-r from-[#7CF38D] to-[#50AA18] bg-clip-text text-transparent">
              Attendance
            </span>
          </h1>

          <p className="text-[#7C7C7C] font-nunito text-sm xs:text-base sm:text-lg md:text-[24px] leading-relaxed max-w-[90%] sm:max-w-[95%] md:max-w-full">
            Lorem ipsum dolor sit amet consectetur. kshi uemnamet consectetur. kshi uemnamet
          </p>
        </div>

        {/* Feature List */}
        <div className="flex flex-col gap-2 sm:gap-3 mt-2 w-full">
          {[
            "Real-time expense tracking & approvals",
            "Automated invoicing & billing",
            "Multi-currency and tax compliance",
            "Real-time budgeting & forecasting"
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2 sm:gap-3">
              <CheckCircle2
                size={24}
                className="text-white fill-[#756FCC]"
              />
              <p className="text-[#090909] font-dmsans text-sm xs:text-base sm:text-lg md:text-[24px] font-semibold leading-snug">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* Button */}
        <button className="w-fit px-5 sm:px-6 py-2 sm:py-3 rounded-lg bg-[#756FCC] text-white shadow-sm hover:opacity-90 transition flex items-center gap-2 mt-2 sm:mt-3 cursor-pointer">
          <span>Try for free</span>
          <ArrowRight size={18} />
        </button>

      </div>
    </div>
  );
}
  