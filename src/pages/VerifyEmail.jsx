import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Mail, CheckCircle2, XCircle, Loader2, ArrowRight, Send, AlertCircle, KeyRound } from "lucide-react";
import { authService } from "../service";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verifying, setVerifying] = useState(false);
  const [status, setStatus] = useState("idle"); // "idle" | "success" | "error"
  const [message, setMessage] = useState("");

  // Resend OTP state
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [resendError, setResendError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleOtpChange = (val, index) => {
    if (val && isNaN(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Move focus to next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        prevInput?.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (!email) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }
    if (otpCode.length < 6) {
      setStatus("error");
      setMessage("Please enter the complete 6-digit OTP code.");
      return;
    }

    setVerifying(true);
    setStatus("idle");
    setMessage("");

    const result = await authService.verifyOtp({ email, otp: otpCode });

    if (result.success) {
      setStatus("success");
      setMessage("Your email has been verified successfully. You are now logged in!");
      setTimeout(() => {
        authService.handlePostAuthRedirect(result.data?.subscription, navigate);
      }, 2000);
    } else {
      setStatus("error");
      setMessage(result.message || "Email verification failed.");
    }
    setVerifying(false);
  };

  const handleResend = async () => {
    if (!email) {
      setResendError("Please enter your email address to request a new code.");
      return;
    }
    if (cooldown > 0 || resendLoading) return;

    setResendLoading(true);
    setResendMessage("");
    setResendError("");

    const result = await authService.resendOtp(email);

    if (result.success) {
      setResendMessage("Verification OTP code has been sent successfully!");
      setCooldown(60);
    } else {
      setResendError(result.message || "Failed to resend verification OTP.");
    }
    setResendLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-slate-950">
      <div className="fixed inset-0 -z-10">
        <img src="/Grid_bg.svg" alt="grid background" className="w-full h-full object-cover opacity-30" />
      </div>
      
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in duration-300">
        
        {/* State Banner */}
        {status === "idle" && (
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <KeyRound className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl leading-tight">Verify Your Account</h3>
            <p className="text-white/80 text-xs mt-1">Enter your 6-digit OTP code below</p>
          </div>
        )}

        {status === "success" && (
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9 text-white animate-bounce" />
            </div>
            <h3 className="text-white font-bold text-xl leading-tight">Verification Success</h3>
            <p className="text-white/80 text-xs mt-1">Directing you to your account...</p>
          </div>
        )}

        {status === "error" && (
          <div className="bg-gradient-to-r from-rose-500 to-red-600 px-8 py-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <XCircle className="w-9 h-9 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl leading-tight">Verification Failed</h3>
            <p className="text-white/80 text-xs mt-1">Please try again</p>
          </div>
        )}

        {/* Content */}
        <div className="px-8 py-8">
          {message && (
            <p className={`text-sm text-center mb-6 ${status === "success" ? "text-emerald-600 font-medium" : "text-rose-600 font-medium"}`}>
              {message}
            </p>
          )}

          {status !== "success" && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Email Address</label>
                <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-3 h-11 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 transition-all bg-white">
                  <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 block">6-Digit OTP Code</label>
                <div className="flex justify-between gap-2 max-w-[280px] mx-auto">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      className="w-10 h-11 border border-gray-300 rounded-lg text-center text-md font-bold text-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none bg-gray-50/50"
                      required
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={verifying || otp.join("").length < 6 || !email}
                className="w-full h-11 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 text-sm shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {verifying ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</>
                ) : (
                  "Verify OTP Code"
                )}
              </button>
            </form>
          )}

          {status !== "success" && (
            <div className="mt-6 pt-5 border-t border-gray-100 space-y-4">
              {resendMessage && (
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs border border-emerald-200 rounded-xl px-3 py-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{resendMessage}</span>
                </div>
              )}

              {resendError && (
                <div className="flex items-center gap-2 bg-red-50 text-red-700 text-xs border border-red-200 rounded-xl px-3 py-2.5">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{resendError}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-xs">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={cooldown > 0 || resendLoading || !email}
                  className="text-purple-600 font-semibold hover:underline cursor-pointer bg-transparent border-none disabled:opacity-60 disabled:no-underline"
                >
                  {cooldown > 0 ? `Resend Code (${cooldown}s)` : "Request New Code"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/auth?mode=login")}
                  className="text-gray-500 hover:text-gray-700 hover:underline cursor-pointer bg-transparent border-none"
                >
                  Back to Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
