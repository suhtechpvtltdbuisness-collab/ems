import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="
        w-full px-[60px] pt-[60px] pb-[30px]
        flex flex-col
        bg-[linear-gradient(90deg,#FFFFFF_0%,#B1F6BB_100%)]
      "
    >
      <div className="w-full flex flex-wrap justify-between items-start gap-y-4">
        {/* Left Logo Column */}
        <div className="flex flex-col gap-4 min-w-[220px] max-w-[350px]">
          <img
            src="/Orga Logo (1).svg"
            alt="logo"
            className="w-[120px] h-auto"
          />

          <p className="text-[#1B223C] font-nunito text-[18px]">
            Empowering teams with efficiency and innovation. Delivering smart solutions that simplify work and accelerate growth.
          </p>
        </div>

        {/* Orga Links */}
        <div className="flex flex-col gap-3 min-w-[200px] mt-6 md:mt-0">
          <h3 className="text-[#1B223C] font-poppins font-semibold text-[20px]">
            Orga
          </h3>

          <ul className="flex flex-col gap-2 text-[#1B223C] font-nunito text-[18px]">

            <li>
              <Link
                to="/demo"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-[#756FCC]"
              >
                Book a Demo
              </Link>
            </li>

            <li>
              <Link
                to="/pricing"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-[#756FCC]"
              >
                Pricing
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-[#756FCC]"
              >
                Contact Us
              </Link>
            </li>

          </ul>
        </div>

        {/* Use Cases */}
        <div className="flex flex-col gap-3 min-w-[200px] mt-6 md:mt-0">
          <h3 className="text-[#1B223C] font-poppins font-semibold text-[20px]">
            Use Cases
          </h3>

          <ul className="flex flex-col gap-2 text-[#1B223C] font-nunito text-[18px]">

            <li>
              <Link
                to="/project-management"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-[#756FCC]"
              >
                Project Management
              </Link>
            </li>

            <li>
              <Link
                to="/hrms"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-[#756FCC]"
              >
                HRMS
              </Link>
            </li>

            <li>
              <Link
                to="/finance-mgmt"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-[#756FCC]"
              >
                Finance Management
              </Link>
            </li>

            <li>
              <Link
                to="/support"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-[#756FCC]"
              >
                Support
              </Link>
            </li>

          </ul>
        </div>

        {/* Solutions */}
        <div className="flex flex-col gap-3 min-w-[200px] mt-6 md:mt-0">
          <h3 className="text-[#1B223C] font-poppins font-semibold text-[20px]">
            Solutions
          </h3>

          <ul className="flex flex-col gap-2 text-[#1B223C] font-nunito text-[18px]">

            <li>
              <Link
                to="/solutions"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-[#756FCC]"
              >
                Project Organizer
              </Link>
            </li>

            <li>
              <Link
                to="/solutions"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-[#756FCC]"
              >
                Online Project Board
              </Link>
            </li>

            <li>
              <Link
                to="/solutions"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-[#756FCC]"
              >
                Task Board
              </Link>
            </li>

          </ul>
        </div>
      </div>

      {/* Bottom Row with Privacy Policy and Terms of Service */}
      <div className="w-full border-t border-[#1B223C]/10 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[#1B223C]/75 font-nunito text-[14px]">
        <p>© 2026 Suhtech ORGA. All rights reserved.</p>
        <div className="flex gap-6">
          <Link
            to="/privacy"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-[#756FCC] transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-[#756FCC] transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
