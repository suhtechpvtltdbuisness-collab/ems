import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PRICING_TAGLINE } from "../../../config/subscriptionPlans";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleCTA = () => {
    navigate("/auth?mode=register");
  };

  return (
    <section id="HeroSection" className="flex flex-col items-center text-center pt-12 sm:pt-16 md:pt-20 relative px-4 sm:px-6 overflow-hidden">

      {/* Background Shape */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 -z-10 w-full max-w-4xl">
        <img
          src="/Ellipse_btn _492.svg"
          alt="bg-shape"
          className="w-full h-auto opacity-90"
        />
      </div>

      {/* Headline */}
      <h1 className="max-w-4xl text-[34px] sm:text-4xl md:text-5xl font-poppins font-semibold text-gray-900 leading-[1.15]">
        <span className="block">
          Manage your Team, Tasks &amp;
        </span>
        <span className="block bg-linear-to-r from-[#C65CF4] to-[#96FFB2] text-transparent bg-clip-text">
          Projects in one place
        </span>
      </h1>

      {/* Subtext */}
      <p className="text-sm sm:text-base text-gray-500 mt-4 max-w-xl leading-6 sm:leading-7">
        All-in-One Powerful EMS Platform.
        From employee management to attendance tracking, task assignment, time monitoring, project planning, performance analysis, payroll, and more—ORGA helps your team work smarter, faster, and more efficiently.
        <span className="block mt-2 text-sm text-[#756FCC] font-medium">{PRICING_TAGLINE}</span>
      </p>

      {/* CTA Button */}
      <button
        onClick={handleCTA}
        className="relative mt-7 flex min-h-12 items-center gap-2 px-6 py-3 rounded-xl bg-[#756FCC] text-white shadow-md hover:opacity-90 transition font-poppins font-medium cursor-pointer"
      >
        Try for free
        <ArrowRight size={18} />
      </button>

      {/* Dashboard Image */}
      <div className="mt-5 sm:mt-2 max-w-6xl w-full px-0 sm:px-4 pt-0">
        <img
          src="/Dash.png"
          alt="Dashboard preview"
          className="w-full rounded-xl sm:rounded-3xl"
        />
      </div>

    </section>
  );
}
