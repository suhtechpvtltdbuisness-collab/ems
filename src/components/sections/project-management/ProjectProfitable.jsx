import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ProjectProfitable() {
  return (
    <div className="bg-white p-6 md:p-[60px] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">

      {/* Left Section */}
      <div className="flex flex-col items-center md:items-start gap-6 md:gap-4">

        {/* Title + Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
          <h1 className="text-[#292D34] font-poppins text-[32px] md:text-[48px] font-semibold leading-tight">
            Know Exactly Which
            <span className="bg-linear-to-r from-[#7CF38D] to-[#50AA18] bg-clip-text text-transparent block">
              Projects Are Profitable
            </span>
          </h1>

          <p className="text-[#7C7C7C] font-nunito text-[18px] md:text-[24px] leading-relaxed max-w-[90%] md:max-w-full">
            Track project costs, billable hours, resource utilization, and revenue in real time to gain complete visibility into project profitability and business performance.
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-4 mt-2 w-full">
          {[
            " Cost & Budget Tracking",
            "Billable Hours Monitoring",
            " Revenue & Profitability Analysis",
            "Resource Utilization Insights"
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 w-full">
              <CheckCircle2 size={28} className="text-white fill-[#756FCC]" />
              <p className="text-[#090909] font-dmsans text-[18px] md:text-[24px] font-semibold leading-snug">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* Button */}
        <button className="w-fit px-6 py-3 rounded-lg bg-[#756FCC] text-white shadow-sm hover:opacity-90 transition flex items-center gap-2 mt-2 md:mt-3 cursor-pointer">
          <span>Try for free</span>
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Right Image */}
      <div className="bg-gray-100 p-4 md:p-6 rounded-xl flex justify-center">
        <img
          src="/finance.png"
          alt="project-profit-dashboard"
          className="w-full max-w-sm md:max-w-full bg-white rounded-lg"
        />
      </div>

    </div>
  );
}
