import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LoginForm } from "../features/auth/LoginForm";
import { RegisterForm } from "../features/auth/RegisterForm";
import { ForgotPasswordForm } from "../features/auth/ForgotPasswordForm";
import { ResetPasswordForm } from "../features/auth/ResetPasswordForm";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";
  const [verifiedEmail, setVerifiedEmail] = useState(""); // store email for reset

  // login handler
  const handleLogin = (email, password) => {
    console.log("Login success:", email);
    localStorage.setItem("isLoggedIn", "true");
  };

  // handle sending reset link
  const handleSendResetLink = (email) => {
    console.log("Reset link sent to:", email);
    // store verified email for reset password
    setVerifiedEmail(email);
    window.location.href = "/auth?mode=reset";
  };

  // handle actual password reset
  const handleResetPassword = (newPassword) => {
    console.log("Password reset for:", verifiedEmail, "New password:", newPassword);
    // After reset, go back to login
    window.location.href = "/auth?mode=login";
  };

  const renderContent = () => {
    if (mode === "login") {
      return (
        <LoginForm
          onLogin={handleLogin}
          onRegister={() => (window.location.href = "/auth?mode=register")}
          onForgotPassword={() => (window.location.href = "/auth?mode=forgot")}
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
          email={verifiedEmail} // pass the verified email for display
          onSubmit={handleResetPassword}
          onBack={() => (window.location.href = "/auth?mode=login")}
        />
      );
    }

    return null;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-gradient-to-br from-[#a8c0ff] via-[#e0c3fc] to-[#f9f9ff]">

      {/* Background Artwork */}
      <img src="/bg.svg" className="absolute inset-0 w-full h-full object-cover opacity-60" />
      <img src="/Arrow_Graphic elements.svg" className="absolute bottom-1 left-8 w-60 opacity-80" />
      <img src="/Graphic elements.svg" className="absolute top-[10px] right-[450px] w-[240px] opacity-80" />
      <img src="/Graphic elements (1).svg" className="absolute bottom-[-100px] right-[-100px] w-[400px] opacity-80" />

      {/* Main UI */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
        {renderContent()}
        {/* <p className="text-center text-gray-600 mt-6 text-sm">
          Secure login powered by encrypted authentication
        </p> */}
      </div>
    </div>
  );
}
