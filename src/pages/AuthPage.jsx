import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LoginForm } from "../features/auth/LoginForm";
import { RegisterForm } from "../features/auth/RegisterForm";
import { ForgotPasswordForm } from "../features/auth/ForgotPasswordForm";
import { ResetPasswordForm } from "../features/auth/ResetPasswordForm";
import { authService } from "../service";

export default function AuthPage() {
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
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-gradient-to-br from-[#a8c0ff] via-[#e0c3fc] to-[#f9f9ff]">
      <img src="/bg.svg" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="" />
      <img src="/Arrow_Graphic elements.svg" className="absolute bottom-1 left-8 w-60 opacity-80" alt="" />
      <img src="/Graphic elements.svg" className="absolute top-[10px] right-[450px] w-[240px] opacity-80" alt="" />
      <img src="/Graphic elements (1).svg" className="absolute bottom-[-100px] right-[-100px] w-[400px] opacity-80" alt="" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
        {renderContent()}
      </div>
    </div>
  );
}
