import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUseCasesOpen, setIsUseCasesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsUseCasesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goLogin = () => navigate("/auth?mode=login");
  const goRegister = () => navigate("/auth?mode=register");

  const scrollToHero = () => {
    const heroSection = document.getElementById("HeroSection");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-8
      z-50 bg-white/20 backdrop-blur-lg border-b border-white/10">

      {/* Logo */}
      <div className="flex items-center gap-2 z-20 cursor-pointer" onClick={() => navigate("/")}>
        <img src="/Orga Logo (1).svg" alt="Logo" className="h-8" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-[#292D34] font-medium">

        {/* Use Cases Dropdown */}
        <div className="relative group" ref={dropdownRef}>
          <button
            onClick={() => setIsUseCasesOpen(!isUseCasesOpen)}
            className="flex items-center gap-1 cursor-pointer hover:text-[#756FCC] transition"
          >
            Use Cases
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${isUseCasesOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isUseCasesOpen && (
            <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg w-56 py-3 z-50 border border-gray-100">
              <Link to="/project-management" className="block px-4 py-2 hover:text-[#756FCC] cursor-pointer">
                Project Management
              </Link>
              <Link to="/hrms" className="block px-4 py-2 hover:text-[#756FCC] cursor-pointer">
                HRMS
              </Link>
              <Link to="/support" className="block px-4 py-2 hover:text-[#756FCC] cursor-pointer">
                Support
              </Link>
              <Link to="/finance-mgmt" className="block px-4 py-2 hover:text-[#756FCC] cursor-pointer">
                Finance Management
              </Link>
            </div>
          )}
        </div>

        {/* Solutions */}
        <Link to="/solutions" className="cursor-pointer hover:text-[#756FCC] transition">
          Solutions
        </Link>


        <Link to="/pricing" className="cursor-pointer hover:text-[#756FCC] transition">
          Pricing
        </Link>

        <Link
          to="/demo"

          className="cursor-pointer hover:text-[#756FCC] transition"
        >
          Book a Demo
        </Link>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={goLogin}
          className="px-5 py-2 rounded-lg bg-[#756FCC] text-white shadow-sm hover:opacity-90 transition cursor-pointer"
        >
          Login
        </button>

        <button
          onClick={goRegister}
          className="px-5 py-2 rounded-lg border border-[#756FCC] text-[#756FCC] hover:bg-[#756FCC] hover:text-white transition cursor-pointer"
        >
          Get Started
        </button>
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-all duration-300 z-20"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed top-20 left-0 w-full bg-white shadow-lg md:hidden transition-all duration-300 ease-in-out 
          ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <div className="flex flex-col px-8 py-6 space-y-4">

          {/* Mobile Use Cases */}
          <details className="group border-b border-gray-100 pb-2">
            <summary className="flex items-center justify-between cursor-pointer text-[#292D34] hover:text-[#756FCC] py-2">
              Use Cases
              <ChevronDown size={16} className="transition-transform duration-300 group-open:rotate-180" />
            </summary>

            <div className="mt-2 bg-white shadow-md rounded-lg border border-gray-100 py-2">
              <Link
                to="/project-management"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 block hover:bg-gray-100 hover:text-[#756FCC]"
              >
                Project Management
              </Link>

              <Link
                to="/hrms"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 block hover:bg-gray-100 hover:text-[#756FCC]"
              >
                HRMS
              </Link>

              <Link
                to="/support"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 block hover:bg-gray-100 hover:text-[#756FCC]"
              >
                Support
              </Link>

              <Link
                to="/finance-mgmt"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 block hover:bg-gray-100 hover:text-[#756FCC]"
              >
                Finance Management
              </Link>
            </div>
          </details>

          {/* Solutions */}
          {/* <details className="group border-b border-gray-100 pb-2">
            <summary className="flex items-center justify-between cursor-pointer text-[#292D34] hover:text-[#756FCC] py-2">
              Solutions
              <ChevronDown size={16} className="transition-transform duration-300 group-open:rotate-180" />
            </summary>
          </details> */}
          <Link
            to="/solutions"
            onClick={() => setIsMenuOpen(false)}
            className="py-2 border-b border-gray-100 block hover:text-[#756FCC]"
          >
            Solutions
          </Link>

          {/* Pricing */}
          <Link
            to="/pricing"
            onClick={() => setIsMenuOpen(false)}
            className="py-2 border-b border-gray-100 block hover:text-[#756FCC]"
          >
            Pricing
          </Link>

          {/* Demo */}
          {/* <Link
            to="/demo"
            onClick={() => setIsMenuOpen(false)}
            className="py-2 border-b border-gray-100 block hover:text-[#756FCC]"
          >
            Book a Demo
          </Link> */}
          <Link
            to="/demo"
            onClick={() => {
              setIsMenuOpen(false);
            }}
            className="py-2 border-b border-gray-100 block hover:text-[#756FCC]"
          >
            Book a Demo
          </Link>

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <button
              onClick={() => {
                goLogin();
                setIsMenuOpen(false);
              }}
              className="w-full px-5 py-3 rounded-lg bg-[#756FCC] text-white shadow-sm hover:opacity-90 transition"
            >
              Login
            </button>

            <button
              onClick={() => {
                goRegister();
                setIsMenuOpen(false);
              }}
              className="w-full px-5 py-3 rounded-lg border border-[#756FCC] text-[#756FCC] hover:bg-[#756FCC] hover:text-white transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
