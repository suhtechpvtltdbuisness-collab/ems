import { Navigate, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { authService } from "./service";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Common Components
import ScrollToTop from "./components/common/ScrollToTop";

// Home Page Sections
import HeroSection from "./components/sections/home/HeroSection";
import FeaturesSection from "./components/sections/home/FeaturesSection";
import HowitWorks from "./components/sections/home/howitWorks";
import Finance from "./components/sections/home/Finance";
import Attendnce from "./components/sections/home/Attendence";
import Profitablity from "./components/sections/home/Profitably";
import Customers from "./components/sections/home/Customers";
import IntegrationSection from "./components/sections/home/IntegrationSection";
import FreeTrialSection from "./components/sections/home/FreeTrialSection";
import TestimonialsSection from "./components/sections/home/TestimonialsSection";

// Pricing Section
import PricingSection from "./components/sections/pricing/Price";

// Project Management Sections
import ProjectHero from "./components/sections/project-management/ProjectHero";
import ProjectFeature from "./components/sections/project-management/ProjectFeature";
import ProjectHowitWorks from "./components/sections/project-management/ProjecthowitWorks";
import ProjectFinance from "./components/sections/project-management/ProjectFinance";
import ProjectAttendence from "./components/sections/project-management/ProjectAttendence";
import ProjectProfitable from "./components/sections/project-management/ProjectProfitable";
import ProjectBusiness from "./components/sections/project-management/ProjectBusiness";
import ProjectFreeTrialSection from "./components/sections/project-management/ProjectFreeTrialSection";

// Finance Management Sections
import FinanceHero from "./components/sections/finance-management/FinanceHero";

// HRMS Sections
import HRMSHero from "./components/sections/hrms/HrmsHero";

// Support Sections
import SupportHero from "./components/sections/support/SupportHero";

// Project Organizer Sections
import ProjectOrganizerHero from "./components/sections/project-organizer/ProjectOrganizerHero";
import ProjectOrganizerWorks from "./components/sections/project-organizer/ProjectOrganizerWorks";
import ProjectOrganizerTeam from "./components/sections/project-organizer/ProjectOrganizerTeam";
import ProjectOrganizerTeamEvent from "./components/sections/project-organizer/ProjectOrganizerTeamEvent";
import ProjectOrganizerBacklog from "./components/sections/project-organizer/ProjectOrganizerBacklog";
import ProjectOrganizerTrial from "./components/sections/project-organizer/ProjectOrganizerTrial";

// Pages
import AuthPage from "./pages/AuthPage";
import SolutionsPage from "./pages/SolutionsPage";
import Demo from "./pages/DemoPage";
import EmpPersonalInfo from "./pages/employee/EmpPersonalInfo";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";

// ======================
// PROTECTED ROUTE
// ======================
const ProtectedRoute = ({ children }) => {
  const [authState, setAuthState] = useState("loading");

  useEffect(() => {
    const verifySession = async () => {
      if (!authService.hasSessionHint()) {
        setAuthState("unauthenticated");
        return;
      }

      const profile = await authService.getProfile();
      setAuthState(profile.success ? "authenticated" : "unauthenticated");
    };

    verifySession();
  }, []);

  if (authState === "loading") {
    return null;
  }

  return authState === "authenticated" ? children : <Navigate to="/auth?mode=login" replace />;
};

// ======================
// MAIN APP COMPONENT
// ======================
function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>

        {/* AUTH PAGE */}
        <Route
          path="/auth"
          element={
            <div className="relative min-h-screen w-full overflow-x-hidden">
              <AuthPage />
            </div>
          }
        />

        {/* SOLUTIONS PAGE */}
        <Route
          path="/solutions"
          element={
            <div className="relative min-h-screen w-full overflow-x-hidden">
              <div className="pt-0">
                <Navbar />
                <SolutionsPage />
                <Footer />
              </div>
            </div>
          }
        />

        {/* SOLUTION DEDICATED PAGES */}
        <Route
          path="/solutiondedipages"
          element={
            <div className="relative min-h-screen w-full overflow-x-hidden">
              <div className="pt-20">
                <Navbar />
                <ProjectOrganizerHero />
                <ProjectOrganizerWorks />
                <ProjectOrganizerTeam />
                <ProjectOrganizerTeamEvent />
                <ProjectOrganizerBacklog />
                <ProjectOrganizerTrial />
                <Footer />
              </div>
            </div>
          }
        />

        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <div className="relative min-h-screen w-full overflow-x-hidden">
              <div className="fixed inset-0 -z-10">
                <img src="/Grid_bg.svg" alt="grid background" className="w-full h-full object-cover" />
              </div>
              <div className="pt-20">
                <Navbar />
                <HeroSection />
                <FeaturesSection />
                <HowitWorks />
                <Finance />
                <Attendnce />
                <Profitablity />
                <Customers />
                <PricingSection />
                <IntegrationSection />
                <FreeTrialSection />
                <TestimonialsSection />
                <Footer />
              </div>
            </div>
          }
        />

        {/* PROJECT MANAGEMENT PAGE */}
        <Route
          path="/project-management"
          element={
            <div className="relative min-h-screen w-full overflow-x-hidden">
              <div className="fixed inset-0 -z-10">
                <img src="/Grid_bg.svg" alt="grid background" className="w-full h-full object-cover" />
              </div>
              <div className="pt-20">
                <Navbar />
                <ProjectHero />
                <ProjectFeature />
                <ProjectHowitWorks />
                <ProjectFinance />
                <ProjectAttendence />
                <ProjectProfitable />
                <ProjectBusiness />
                <ProjectFreeTrialSection />
                <Footer />
              </div>
            </div>
          }
        />

        {/* FINANCE MANAGEMENT PAGE */}
        <Route
          path="/finance-mgmt"
          element={
            <div className="relative min-h-screen w-full overflow-x-hidden">
              <div className="fixed inset-0 -z-10">
                <img src="/Grid_bg.svg" alt="grid background" className="w-full h-full object-cover" />
              </div>
              <div className="pt-20">
                <Navbar />
                <FinanceHero />
                <ProjectFeature />
                <ProjectHowitWorks />
                <ProjectFinance />
                <ProjectAttendence />
                <ProjectProfitable />
                <ProjectBusiness />
                <ProjectFreeTrialSection />
                <Footer />
              </div>
            </div>
          }
        />

        {/* HRMS PAGE */}
        <Route
          path="/hrms"
          element={
            <div className="relative min-h-screen w-full overflow-x-hidden">
              <div className="fixed inset-0 -z-10">
                <img src="/Grid_bg.svg" alt="grid background" className="w-full h-full object-cover" />
              </div>
              <div className="pt-20">
                <Navbar />
                <HRMSHero />
                <ProjectFeature />
                <ProjectHowitWorks />
                <ProjectFinance />
                <ProjectAttendence />
                <ProjectProfitable />
                <ProjectBusiness />
                <ProjectFreeTrialSection />
                <Footer />
              </div>
            </div>
          }
        />

        {/* SUPPORT PAGE */}
        <Route
          path="/support"
          element={
            <div className="relative min-h-screen w-full overflow-x-hidden">
              <div className="fixed inset-0 -z-10">
                <img src="/Grid_bg.svg" alt="grid background" className="w-full h-full object-cover" />
              </div>
              <div className="pt-20">
                <Navbar />
                <SupportHero />
                <ProjectFeature />
                <ProjectHowitWorks />
                <ProjectFinance />
                <ProjectAttendence />
                <ProjectProfitable />
                <ProjectBusiness />
                <ProjectFreeTrialSection />
                <Footer />
              </div>
            </div>
          }
        />

        {/* DEMO PAGE */}
        <Route
          path="/demo"
          element={
            <div className="relative min-h-screen w-full overflow-x-hidden">
              <div className="fixed inset-0 -z-10">
                <img src="/Grid_bg.svg" alt="grid background" className="w-full h-full object-cover" />
              </div>
              <div className="pt-20">
                <Navbar />
                <Demo />
                <Footer />
              </div>
            </div>
          }
        />

        {/* PRICING PAGE */}
        <Route
          path="/pricing"
          element={
            <div className="relative min-h-screen w-full overflow-x-hidden">
              <div className="fixed inset-0 -z-10">
                <img src="/Grid_bg.svg" alt="grid background" className="w-full h-full object-cover" />
              </div>
              <div className="pt-20">
                <Navbar />
                <PricingSection />
                <Footer />
              </div>
            </div>
          }
        />

        {/* EMPLOYEE PERSONAL INFO PAGE */}
        <Route
          path="/employee-details"
          element={
            <ProtectedRoute>
              <div className="relative min-h-screen w-full overflow-x-hidden">
                <div className="pt-20">
                  <Navbar />
                  <EmpPersonalInfo />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* PRIVACY POLICY */}
        <Route
          path="/privacy"
          element={
            <div className="relative min-h-screen w-full overflow-x-hidden">
              <div className="fixed inset-0 -z-10">
                <img src="/Grid_bg.svg" alt="grid background" className="w-full h-full object-cover" />
              </div>
              <div className="pt-20">
                <Navbar />
                <PrivacyPage />
                <Footer />
              </div>
            </div>
          }
        />
        <Route
          path="/pages/privacy"
          element={<Navigate to="/privacy" replace />}
        />

        {/* TERMS OF SERVICE */}
        <Route
          path="/terms"
          element={
            <div className="relative min-h-screen w-full overflow-x-hidden">
              <div className="fixed inset-0 -z-10">
                <img src="/Grid_bg.svg" alt="grid background" className="w-full h-full object-cover" />
              </div>
              <div className="pt-20">
                <Navbar />
                <TermsPage />
                <Footer />
              </div>
            </div>
          }
        />
        <Route
          path="/pages/terms"
          element={<Navigate to="/terms" replace />}
        />

      </Routes>
    </>
  );
}

export default App;