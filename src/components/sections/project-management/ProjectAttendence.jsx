import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProjectAttendence() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 bg-white px-4 py-16 sm:px-6 md:grid-cols-2 md:gap-12 lg:py-20">

      {/* Left Image */}
      <div className="flex justify-center rounded-2xl bg-[#F5F5F8] p-4 sm:p-6">
        <img
          src="./finance.png"
          alt="dashboard"
          className="w-full max-w-xl bg-white rounded-xl"
        />
      </div>

      {/* Right Content */}
      <div className="flex flex-col items-center md:items-start gap-6 md:gap-4">

        {/* Heading + Paragraph */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
          <h2 className="text-[#292D34] font-poppins text-3xl sm:text-4xl lg:text-[40px] font-semibold leading-tight">
            Visual Dashboards to
            <span className="block bg-linear-to-r from-[#7CF38D] to-[#50AA18] bg-clip-text text-transparent">
              Monitor Every Task
            </span>
          </h2>

          <p className="text-[#7C7C7C] font-nunito text-base sm:text-lg leading-7 max-w-xl">
            Monitor project health, task completion rates, upcoming deadlines, and team performance through interactive dashboards designed to keep your projects on track.
          </p>
        </div>

        {/* Feature List */}
        <div className="flex flex-col gap-4 mt-2 w-full">
          {[
            "Employee Onboarding & Profile Management",
            " Leave & Attendance Tracking",
            "Payroll Processing & Automation",
            " Document & Policy Management"
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
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
    </div>
  );
}
