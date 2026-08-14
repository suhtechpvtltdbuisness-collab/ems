import { ChevronDown, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../service";
import { trackBookDemo } from "../../utils/analytics";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUseCasesOpen, setIsUseCasesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [subscription, setSubscription] = useState(null);

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
      } catch {
        // Ignore malformed cached profile data.
      }
    }

    const subscriptionStr = localStorage.getItem("subscription");
    if (subscriptionStr) {
      try {
        setSubscription(JSON.parse(subscriptionStr));
      } catch {
        // Ignore malformed cached subscription data.
      }
    }

    if (authService.hasSessionHint()) {
      authService.getProfile().then((profile) => {
        if (!profile.success) return;
        if (profile.data?.user) setUserProfile(profile.data.user);
        setSubscription(profile.data?.subscription || null);
      });
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

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
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    authService.redirectToAdmin();
  };

  const hasActivePlan = authService.hasActiveSubscription(subscription);

  return (
    <nav className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-50 bg-white/90 backdrop-blur-xl border-b border-[#756FCC]/10">

      {/* Logo */}
      <div
        className="flex items-center gap-2 z-20 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/Orga Logo (1).svg" alt="ORGA home" className="h-8 sm:h-9 w-auto" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-7 text-[#292D34] font-medium">

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

        <Link
          to="/demo"
          onClick={() => trackBookDemo("navbar")}
          className="hover:text-[#756FCC]"
        >
          Book a Demo
        </Link>
      </div>

      {/* Desktop Right Section */}
      <div className="hidden lg:flex items-center gap-3">

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
              <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-xl">





                {userProfile && (
                  <div className="mb-1 border-b border-gray-100 px-5 py-3">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {userProfile.name || `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim() || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {userProfile.email}
                    </p>
                  </div>
                )}

                {hasActivePlan ? (
                  <button
                    onClick={goToAdmin}
                    className="flex w-full items-center gap-3 whitespace-nowrap px-5 py-3 text-left text-sm font-semibold text-[#756FCC] transition-colors hover:bg-[#F5F4FF] cursor-pointer"
                  >
                    <LayoutDashboard size={16} />
                    Login to Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/pricing");
                      setIsProfileOpen(false);
                    }}
                    className="block w-full whitespace-nowrap px-5 py-3 text-left text-sm font-semibold transition-colors hover:bg-gray-100 cursor-pointer"
                  >
                    Upgrade Plan
                  </button>
                )}

                {(isLoggedIn || isRegistered) && (
                  <button
                    onClick={handleLogout}
                    className="mt-1 flex w-full items-center gap-3 border-t border-gray-100 px-5 py-3 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 cursor-pointer"
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
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#756FCC]/20 bg-white text-[#292D34] lg:hidden"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed left-0 top-20 flex max-h-[calc(100dvh-5rem)] w-full flex-col gap-2 overflow-y-auto bg-white px-4 py-5 shadow-xl lg:hidden">

          <p className="px-3 pt-1 text-xs font-bold uppercase tracking-wider text-[#64748B]">Explore</p>
          <Link className="rounded-xl px-3 py-3 font-medium hover:bg-[#F5F4FF]" to="/solutions" onClick={() => setIsMenuOpen(false)}>
            Solutions
          </Link>

          <Link className="rounded-xl px-3 py-3 font-medium hover:bg-[#F5F4FF]" to="/pricing" onClick={() => setIsMenuOpen(false)}>
            Pricing
          </Link>

          <Link
            to="/demo"
            className="rounded-xl px-3 py-3 font-medium hover:bg-[#F5F4FF]"
            onClick={() => {
              trackBookDemo("navbar");
              setIsMenuOpen(false);
            }}
          >
            Book a Demo
          </Link>

          <div className="my-2 h-px bg-gray-100" />
          <p className="px-3 text-xs font-bold uppercase tracking-wider text-[#64748B]">Use cases</p>
          {[
            ["/project-management", "Project Management"],
            ["/hrms", "HRMS"],
            ["/finance-mgmt", "Finance Management"],
            ["/support", "Support"],
          ].map(([to, label]) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-3 py-3 font-medium hover:bg-[#F5F4FF]"
            >
              {label}
            </Link>
          ))}

          <div className="my-2 h-px bg-gray-100" />

          {!isRegistered ? (
            <>
              <button
                onClick={() => {
                  goLogin();
                  setIsMenuOpen(false);
                }}
                className="w-full min-h-12 py-3 bg-[#756FCC] text-white rounded-xl font-semibold"
              >
                Login
              </button>

              <button
                onClick={() => {
                  goRegister();
                  setIsMenuOpen(false);
                }}
                className="w-full min-h-12 py-3 border border-[#756FCC] text-[#756FCC] rounded-xl font-semibold"
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

              {isLoggedIn && hasActivePlan && (
                <button
                  onClick={goToAdmin}
                  className="w-full py-2 bg-[#756FCC] text-white rounded-lg"
                >
                  Login to Dashboard
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

              {!hasActivePlan && (
                <button
                  onClick={() => {
                    navigate("/pricing");
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-2 border border-[#756FCC] text-[#756FCC] rounded-lg"
                >
                  Upgrade Plan
                </button>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
}
