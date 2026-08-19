import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginForm } from "../features/auth/LoginForm";
import { RegisterForm } from "../features/auth/RegisterForm";
import { ForgotPasswordForm } from "../features/auth/ForgotPasswordForm";
import { ResetPasswordForm } from "../features/auth/ResetPasswordForm";
import { authService } from "../service";

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";
  const [verifiedEmail, setVerifiedEmail] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      if (!authService.hasSessionHint()) return;

      const profile = await authService.getProfile();
      if (
        profile.success &&
        authService.isSubscribed(profile.data?.subscription)
      ) {
        authService.redirectToAdmin();
      }
    };
    checkSession();
  }, []);

  const handleSendResetLink = (email) => {
    setVerifiedEmail(email);
    window.location.href = "/auth?mode=reset";
  };

  const handleResetPassword = () => {
    window.location.href = "/auth?mode=login";
  };

  const handleBack = () => {
    navigate("/");
  };

  const renderContent = () => {
    if (mode === "login") {
      return (
        <LoginForm
          onRegister={() => (window.location.href = "/auth?mode=register")}
        />
      );
    }

    if (mode === "register") {
      return (
        <RegisterForm
          onLogin={() => (window.location.href = "/auth?mode=login")}
        />
      );
    }

    if (mode === "forgot") {
      return (
        <ForgotPasswordForm
          onGetLink={handleSendResetLink}
          onBack={() => (window.location.href = "/auth?mode=login")}
        />
      );
    }

    if (mode === "reset") {
      return (
        <ResetPasswordForm
          email={verifiedEmail}
          onSubmit={handleResetPassword}
          onBack={() => (window.location.href = "/auth?mode=login")}
        />
      );
    }

    return null;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-gradient-to-br from-[#a8c0ff] via-[#e0c3fc] to-[#f9f9ff]">
      <img src="/bg.svg" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="" />
      <img src="/Arrow_Graphic elements.svg" className="absolute bottom-1 left-8 hidden w-60 opacity-80 sm:block" alt="" />
      <img src="/Graphic elements.svg" className="absolute top-[10px] right-[20%] hidden w-[240px] opacity-80 md:block" alt="" />
      <img src="/Graphic elements (1).svg" className="absolute bottom-[-100px] right-[-100px] hidden w-[400px] opacity-80 sm:block" alt="" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
        {renderContent()}
        {mode === "register" && (
          <button
            type="button"
            onClick={handleBack}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/80 bg-white/75 px-5 py-2.5 text-sm font-semibold text-[#4B4863] shadow-[0_8px_24px_rgba(75,72,99,0.14)] backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-[#756FCC] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            aria-label="Back to home page"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        )}
      </div>
    </div>
  );
}
