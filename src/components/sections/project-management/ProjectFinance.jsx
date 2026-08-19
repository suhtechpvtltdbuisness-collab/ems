import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProjectFinance() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 bg-white px-4 py-16 sm:px-6 md:grid-cols-2 md:gap-12 lg:py-20">

      {/* Left Section */}
      <div className="flex flex-col items-center md:items-start gap-6 md:gap-4">

        {/* Title + Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
          <h2 className="text-[#292D34] font-poppins text-3xl sm:text-4xl lg:text-[40px] font-semibold leading-tight">
            Everything You Need to Plan
            <span className="bg-linear-to-r from-[#7CF38D] to-[#50AA18] bg-clip-text text-transparent block">
              Projects Successfully
            </span>
          </h2>

          <p className="text-[#7C7C7C] font-nunito text-base sm:text-lg leading-7 max-w-xl">
            Break work into milestones, assign teams, set timelines, and track every deliverable with ease.
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-4 mt-2 w-full">
          {[
            "Create and manage project milestones",
            "Assign tasks and responsibilities",
            "Track progress in real time",
            "Collaborate with teams seamlessly"
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 w-full">
              <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-white fill-[#756FCC]" />
              <p className="text-[#090909] font-dmsans text-base sm:text-lg font-semibold leading-7">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={() => navigate("/pricing")}
          className="w-fit px-6 py-3 rounded-lg bg-[#756FCC] text-white shadow-sm hover:opacity-90 transition flex items-center gap-2 mt-2 md:mt-3 cursor-pointer"
        >
          <span>Try for free</span>
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Right Image */}
      <div className="flex justify-center rounded-2xl bg-[#F5F5F8] p-4 sm:p-6">
        <img src="/finance.png" alt="finance" className="w-full max-w-xl bg-white rounded-xl" />
      </div>

    </div>
  );
}
