import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PRICING_TAGLINE } from "../../../config/subscriptionPlans";

export default function HRMSHero() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center text-center pt-20">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 -z-10 w-full max-w-4xl">
        <img
          src="/Ellipse_btn _492.svg"
          alt="bg-shape"
          className="w-full h-auto opacity-90"
        />
      </div>

      <h1 className="text-5xl md:text-5xl font-poppins font-semibold text-gray-900 leading-14">
        Your All-in-One HR Suite
        <br />
        From{" "}
        <span className="bg-linear-to-r from-[#C65CF4] to-[#96FFB2] text-transparent bg-clip-text">
          Hiring to Payroll
        </span>
      </h1>

      <p className="text-gray-500 mt-4 max-w-xl font-nunito">
        Simplify employee management with automated attendance, payroll,
        onboarding, and more.
        <span className="block mt-2 text-sm text-[#756FCC] font-medium">
          {PRICING_TAGLINE}
        </span>
      </p>

      <button
        onClick={() => navigate("/pricing")}
        className="relative mt-8 flex items-center gap-2 px-6 py-3 rounded-xl bg-[#756FCC] text-white shadow-md hover:opacity-90 transition font-poppins font-medium cursor-pointer"
      >
        View plans
        <ArrowRight size={18} />
      </button>

      <div className="mt-2 max-w-6xl w-full px-4 pt-0">
        <img
          src="/Dash.png"
          alt="Dashboard preview"
          className="w-full rounded-3xl"
        />
      </div>
    </section>
  );
}
