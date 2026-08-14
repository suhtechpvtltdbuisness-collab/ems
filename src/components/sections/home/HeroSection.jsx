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

      {/* Product walkthrough */}
      <div className="mt-8 sm:mt-10 max-w-6xl w-full sm:px-4">
        <div className="rounded-2xl sm:rounded-[28px] bg-linear-to-br from-[#B49DF8] via-[#F5F2FF] to-[#9DE7D1] p-px shadow-[0_24px_70px_-28px_rgba(87,75,160,0.38)]">
          <div className="overflow-hidden rounded-[calc(1rem-1px)] sm:rounded-[calc(1.75rem-1px)] bg-[#F8F8FC] ring-1 ring-black/5">
            <div className="flex h-10 sm:h-12 items-center justify-between border-b border-[#E9E7F2] bg-white/95 px-3 sm:px-5">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="size-2 sm:size-2.5 rounded-full bg-[#FF776F]" />
                <span className="size-2 sm:size-2.5 rounded-full bg-[#FFD166]" />
                <span className="size-2 sm:size-2.5 rounded-full bg-[#69D18A]" />
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-medium tracking-wide text-[#66617E]">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                ORGA in action
              </div>
              <span className="w-7 sm:w-9" aria-hidden="true" />
            </div>

            <div className="flex aspect-video w-full items-center justify-center bg-linear-to-br from-[#F7F5FC] to-[#EFEDF7]">
              <video
                className="block max-h-full w-full object-contain"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/Dash.png"
                aria-label="ORGA employee management platform walkthrough"
              >
                <source
                  src="/WhatsApp Video 2026-08-14 at 11.37.22.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs sm:text-sm text-[#77738A]">
          See how your entire workday comes together in ORGA
        </p>
      </div>

    </section>
  );
}
