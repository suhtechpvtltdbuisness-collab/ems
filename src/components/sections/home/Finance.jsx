import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Finance() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 bg-white px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-2 md:gap-14 lg:px-12 lg:py-20">

      {/* Left Section */}
      <div className="flex flex-col items-center gap-6 md:items-start">

        {/* Title + Description */}
        <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
          <h2 className="max-w-xl font-poppins text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#292D34] sm:text-4xl lg:text-[40px]">
            Smarter Financial Management for
            <span className="bg-linear-to-r from-[#7CF38D] to-[#50AA18] bg-clip-text text-transparent block">
              Growing Businesses

            </span>
          </h2>

          <p className="max-w-xl font-nunito text-base leading-7 text-[#70737A] sm:text-lg">
            Take control of your finances with ORGA's intelligent finance management platform. Automate invoicing, track expenses in real time, monitor cash flow, and gain actionable insights—all from one centralized dashboard.
          </p>
        </div>

        {/* Features */}
        <div className="flex w-full flex-col gap-3.5">
          {[
            "Real-time expense tracking & approvals",
            "Automated invoicing and payment management",
            "Tax compliance and multi-currency support",
            "Advanced budgeting and financial forecasting"
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 sm:gap-3 w-full">
              <CheckCircle2 size={20} className="mt-0.5 shrink-0 fill-[#756FCC] text-white" />
              <p className="font-dmsans text-base font-semibold leading-6 text-[#20232A] sm:text-[17px]">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={() => navigate("/auth?mode=register")}
          className="w-fit px-5 sm:px-6 py-2 sm:py-3 rounded-lg bg-[#756FCC] text-white shadow-sm hover:opacity-90 transition flex items-center gap-2 mt-2 sm:mt-3 cursor-pointer"
        >
          <span>Start Managing Smarter</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Right Image */}
      <div className="flex justify-center rounded-2xl bg-[#F4F4F7] p-4 sm:p-5">
        <img src="./finance.png" alt="Finance analytics dashboard" className="w-full rounded-xl bg-white object-contain" />
      </div>
    </section>
  );
}
