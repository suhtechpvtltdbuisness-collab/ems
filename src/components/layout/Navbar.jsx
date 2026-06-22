import { ChevronDown, Menu, X, User, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../service";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUseCasesOpen, setIsUseCasesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  const navigate = useNavigate();

  const isRegistered = localStorage.getItem("isRegistered");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsUseCasesOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    const userDataStr = localStorage.getItem("userData");
    if (userDataStr) {
      try {
        setUserProfile(JSON.parse(userDataStr));
      } catch (e) {}
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goLogin = () => navigate("/auth?mode=login");
  const goRegister = () => navigate("/auth?mode=register");

  const handleLogout = async () => {
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    await authService.logout();
    localStorage.removeItem("isRegistered");
    navigate("/");
    window.location.reload();
  };

  const goToAdmin = () => {
    authService.redirectToAdmin();
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-8 z-50 bg-white/20 backdrop-blur-lg border-b border-white/10">

      {/* Logo */}
      <div
        className="flex items-center gap-2 z-20 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/Orga Logo (1).svg" alt="Logo" className="h-8" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-[#292D34] font-medium">

        {/* Use Cases */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsUseCasesOpen(!isUseCasesOpen)}
            className="flex items-center gap-1 hover:text-[#756FCC]"
          >
            Use Cases
            <ChevronDown
              size={16}
              className={`transition ${isUseCasesOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isUseCasesOpen && (
            <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg w-56 py-3 ">
              <Link to="/project-management" className="block px-4 py-2 hover:text-[#756FCC]">
                Project Management
              </Link>
              <Link to="/hrms" className="block px-4 py-2 hover:text-[#756FCC]">
                HRMS
              </Link>
              <Link to="/support" className="block px-4 py-2 hover:text-[#756FCC]">
                Support
              </Link>
              <Link to="/finance-mgmt" className="block px-4 py-2 hover:text-[#756FCC]">
                Finance Management
              </Link>
            </div>
          )}
        </div>

        <Link to="/solutions" className="hover:text-[#756FCC]">
          Solutions
        </Link>

        <Link to="/pricing" className="hover:text-[#756FCC]">
          Pricing
        </Link>

        <Link to="/demo" className="hover:text-[#756FCC]">
          Book a Demo
        </Link>
      </div>

      {/* Desktop Right Section */}
      <div className="hidden md:flex items-center gap-4">

        {!isRegistered ? (
          <>
            <button
              onClick={goLogin}
              className="px-5 py-2 rounded-lg bg-[#756FCC] text-white hover:bg-[#645db7]"
            >
              Login
            </button>

            <button
              onClick={goRegister}
              className="px-5 py-2 rounded-lg border border-[#756FCC] text-[#756FCC] hover:bg-[#756FCC] hover:text-white"
            >
              Get Started
            </button>
          </>
        ) : (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#756FCC] bg-white text-[#756FCC]"
            >
              <User size={18} />
              Profile
              <ChevronDown size={18} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border-[#756FCC] py-2">





                {userProfile && (
                  <div className="px-4 py-3 border-b border-gray-100 mb-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {userProfile.name || `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim() || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {userProfile.email}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => {
                    navigate("/pricing");
                    setIsProfileOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 font-medium cursor-pointer"
                >
                  Upgrade Plan
                </button>

                {(isLoggedIn || isRegistered) && (
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-500 font-medium cursor-pointer border-t border-gray-100 mt-1"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-20 left-0 w-full bg-white shadow-lg md:hidden px-8 py-6 space-y-4">

          <Link to="/solutions" onClick={() => setIsMenuOpen(false)}>
            Solutions
          </Link>

          <Link to="/pricing" onClick={() => setIsMenuOpen(false)}>
            Pricing
          </Link>

          <Link to="/demo" onClick={() => setIsMenuOpen(false)}>
            Book a Demo
          </Link>

          <hr />

          {!isRegistered ? (
            <>
              <button
                onClick={() => {
                  goLogin();
                  setIsMenuOpen(false);
                }}
                className="w-full py-2 bg-[#756FCC] text-white rounded-lg"
              >
                Login
              </button>

              <button
                onClick={() => {
                  goRegister();
                  setIsMenuOpen(false);
                }}
                className="w-full py-2 border border-[#756FCC] text-[#756FCC] rounded-lg"
              >
                Get Started
              </button>
            </>
          ) : (
            <>
              {userProfile && (
                <div className="px-2 py-3 mb-2 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {userProfile.name || `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim() || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {userProfile.email}
                  </p>
                </div>
              )}
              {!isLoggedIn && (
                <button
                  onClick={() => {
                    goLogin();
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-2 bg-[#756FCC] text-white rounded-lg"
                >
                  Login
                </button>
              )}

              {isLoggedIn && (
                <button
                  onClick={() => {
                    goToAdmin();
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-2 bg-[#756FCC] text-white rounded-lg"
                >
                  Dashboard
                </button>
              )}

              {(isLoggedIn || isRegistered) && (
                <button
                  onClick={handleLogout}
                  className="w-full py-2 border border-red-500 text-red-500 rounded-lg flex items-center justify-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              )}

              <button
                onClick={() => {
                  navigate("/pricing");
                  setIsMenuOpen(false);
                }}
                className="w-full py-2 border border-[#756FCC] text-[#756FCC] rounded-lg"
              >
                Upgrade Plan
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
