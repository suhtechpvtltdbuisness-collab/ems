import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleCTA = () => {
    navigate("/auth?mode=login"); 
  };

  return (
    <section id="HeroSection" className="flex flex-col items-center text-center pt-20 relative px-4">

      {/* Background Shape */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 -z-10 w-full max-w-4xl">
        <img
          src="/Ellipse_btn _492.svg"
          alt="bg-shape"
          className="w-full h-auto opacity-90"
        />
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-5xl font-poppins font-semibold text-gray-900 leading-14">
        <span className="block">
          Manage your Team, Tasks &amp;
        </span>
        <span className="block bg-linear-to-r from-[#C65CF4] to-[#96FFB2] text-transparent bg-clip-text">
          Projects in one place
        </span>
      </h1>

      {/* Subtext */}
      <p className="text-gray-500 mt-4 max-w-xl">
        All in One Powerful EMS Platform
        From employee management to attendance tracking, task assignment, time monitoring, project planning, performance analysis, payroll, and more—ORGA helps your team work smarter, faster, and more efficiently  
      </p>

      {/* CTA Button */}
      <button
        onClick={handleCTA} 
        className="relative mt-8 flex items-center gap-2 px-6 py-3 rounded-xl bg-[#756FCC] text-white shadow-md hover:opacity-90 transition font-poppins font-medium cursor-pointer"
      >
        Try for free
        <ArrowRight size={18} />
      </button>

      {/* Dashboard Image */}
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