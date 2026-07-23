import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function SupportHero() {
  const navigate = useNavigate();

  const handleCTA = () => {
    navigate("/auth?mode=login"); // redirects to login page
  };
  return (
    <section className="relative flex flex-col items-center overflow-hidden px-4 sm:px-6 text-center pt-12 sm:pt-16 md:pt-20">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 -z-10 w-full max-w-4xl">
        <img
          src="/Ellipse_btn _492.svg"
          alt="bg-shape"
          className="w-full h-auto opacity-90"
        />
      </div>

      {/* Headline */}
      <h1 className="max-w-4xl text-[34px] sm:text-4xl md:text-5xl font-poppins font-semibold text-gray-900 leading-[1.15]">
        Keep Your Customers Happy & Heard
        <br className="hidden sm:block" />
        With <span className="bg-linear-to-r from-[#C65CF4] to-[#96FFB2] text-transparent bg-clip-text">
          Smart Support Tools
        </span>
      </h1>

      {/* Subtext */}
      <p className="text-sm sm:text-base text-gray-500 mt-4 max-w-xl leading-7">
        A clean, powerful helpdesk to manage tickets, track issues, and deliver fast resolutions.
      </p>

      {/* CTA Button */}
      <button onClick={handleCTA}
        className="relative mt-8 flex items-center gap-2 px-6 py-3 rounded-xl bg-[#756FCC] text-white shadow-md hover:opacity-90 transition font-poppins font-medium cursor-pointer">
        Try for free
        <ArrowRight size={18} />
      </button>

      {/* Dashboard Image Below */}
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
