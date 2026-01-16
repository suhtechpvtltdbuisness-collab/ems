import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProjectOrganizerHero() {
  const navigate = useNavigate();

  const handleCTA = () => {
    navigate("/auth?mode=login");
  };

  return (
    <section className="relative flex flex-col items-center text-center pt-24 px-4 overflow-hidden">

      
      <img
        src="/Ellipse_new 492.svg"
        alt="bg-shape"
        className="absolute top-[-160px] right-[-80px] w-[380px] md:w-[700px] opacity-90 pointer-events-none -z-10 
        max-w-none"
      />

      {/* Headline */}
      <h1 className="text-[32px] sm:text-4xl md:text-5xl font-poppins font-semibold text-gray-900 leading-tight break-words">

        
        <span className="block">
          Project Organizer for Easy
        </span>

        {/* Second line – gradient */}
        <span className="bg-gradient-to-r from-[#C65CF4] to-[#96FFB2] text-transparent bg-clip-text block">
          Project Management
        </span>
      </h1>

      {/* Subtext */}
      <p className="text-gray-500 mt-4 max-w-[90%] sm:max-w-2xl mx-auto leading-relaxed">
        A clean, powerful helpdesk to manage tickets, track issues,
        and deliver fast resolutions.
      </p>

      {/* CTA Button */}
      <button
        onClick={handleCTA}
        className="mt-8 flex items-center gap-2 px-6 py-3 rounded-xl bg-[#756FCC] text-white shadow-md hover:opacity-90 transition font-poppins font-medium cursor-pointer"
      >
        Try for free
        <ArrowRight size={18} />
      </button>

      {/* Dashboard Preview */}
      <div className="mt-12 max-w-6xl w-full px-2 sm:px-4">
        <img
          src="/Dash.png"
          alt="Dashboard preview"
          className="w-full rounded-3xl "
        />
      </div>
    </section>
  );
}
