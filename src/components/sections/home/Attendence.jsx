import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Attendance() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 bg-white px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-2 md:gap-14 lg:px-12 lg:py-20">

      {/* Left Image */}
      <div className="order-2 flex justify-center rounded-2xl bg-[#F4F4F7] p-4 sm:p-5 md:order-1">
        <img
          src="./finance.png"
          alt="Workforce management dashboard"
          className="w-full rounded-xl bg-white object-contain"
        />
      </div>

      {/* Right Content */}
      <div className="order-1 flex flex-col items-center gap-6 md:order-2 md:items-start">

        {/* Heading + Paragraph */}
        <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
          <h2 className="max-w-xl font-poppins text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#292D34] sm:text-4xl lg:text-[40px]">
            Smarter Workforce Management{" "}
            <span className="block bg-linear-to-r from-[#7CF38D] to-[#50AA18] bg-clip-text text-transparent">
              Starts Here

            </span>
          </h2>

          <p className="max-w-xl font-nunito text-base leading-7 text-[#70737A] sm:text-lg">
            Transform the way you manage employees with seamless HR, payroll, and attendance automation designed for modern businesses.
          </p>
        </div>

        {/* Feature List */}
        <div className="flex w-full flex-col gap-3.5">
          {[
            "Centralized employee records",
            "Payroll automation & salary management",
            "Attendance and leave approvals",
            "Performance tracking & HR insights"
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2 sm:gap-3">
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 fill-[#756FCC] text-white"
              />
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
          <span>Get Started Today</span>
          <ArrowRight size={18} />
        </button>

      </div>
    </section>
  );
}
