import React, { useState, useEffect } from "react";
import { Mail, Lock, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { InputField } from "../../components/common/InputField";
import { Button } from "../../components/common/Button";
import { Toast } from "../../components/common/Toast";
import { authService } from "../../service";

export const RegisterForm = ({ onRegister, onLogin }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [toast, setToast] = useState(null);
  
  // OTP-specific states
  const [isSuccess, setIsSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    agree: false,
  });

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async () => {
    if (step === 1) {
      if (!form.email) return;
      setStep(2);
      return;
    }

    if (!form.name || !form.password || !form.agree) return;

    setLoading(true);

    const userData = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    const result = await authService.register(userData);

    if (result.success) {
      setRegisteredEmail(form.email);
      setIsSuccess(true);
      setToast({
        type: "success",
        title: "Account Created Successfully",
        message: "Verification OTP has been sent.",
      });
    } else {
      setToast({
        type: "error",
        title: "Failed To Create Account",
        message: result.message,
      });
    }

    setLoading(false);
  };

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

  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      setOtpError("Please enter all 6 digits.");
      return;
    }

    setVerifying(true);
    setOtpError("");

    const result = await authService.verifyOtp({ email: registeredEmail, otp: otpCode });

    if (result.success) {
      setToast({
        type: "success",
        title: "Verification Successful",
        message: authService.isSubscribed(result.data?.subscription)
          ? "Redirecting to dashboard..."
          : "Redirecting...",
      });

      onRegister?.(result.data);

      setTimeout(() => {
        authService.handlePostAuthRedirect(result.data?.subscription, navigate);
      }, 1500);
    } else {
      setOtpError(result.message || "Failed to verify OTP.");
      setToast({
        type: "error",
        title: "Verification Failed",
        message: result.message,
      });
    }
    setVerifying(false);
  };

  const handleResend = async () => {
    if (cooldown > 0 || resendLoading) return;

    setResendLoading(true);
    const result = await authService.resendOtp(registeredEmail);

    if (result.success) {
      setToast({
        type: "success",
        title: "Success",
        message: "Verification OTP resent successfully!",
      });
      setCooldown(60);
    } else {
      setToast({
        type: "error",
        title: "Error",
        message: result.message || "Failed to resend verification OTP.",
      });
    }
    setResendLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse.credential) {
      setToast({
        type: "error",
        title: "Google Signup Failed",
        message: "No credential received from Google",
      });
      return;
    }

    setGoogleLoading(true);

    const result = await authService.googleLogin(credentialResponse.credential);

    if (result.success) {
      localStorage.setItem("isRegistered", "true");
      setToast({
        type: "success",
        title: "Account Created Successfully",
        message: authService.isSubscribed(result.data?.subscription)
          ? "Redirecting to dashboard..."
          : "Choose a plan from ₹499/month to get started...",
      });

      onRegister?.(result.data);

      setTimeout(() => {
        authService.handlePostAuthRedirect(result.data?.subscription, navigate);
      }, 1500);
    } else {
      setToast({
        type: "error",
        title: "Signup Failed",
        message: result.message,
      });
    }

    setGoogleLoading(false);
  };

  const handleGoogleError = () => {
    setToast({
      type: "error",
      title: "Google Signup Failed",
      message: "An error occurred with Google Sign-In",
    });
  };

  if (isSuccess) {
    return (
      <>
        <Toast toast={toast} onClose={() => setToast(null)} />
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-purple-600 animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Enter Verification Code</h1>
          <p className="text-gray-500 text-sm text-center mb-6">
            We've sent a 6-digit verification code to <strong className="text-gray-800">{registeredEmail}</strong>.
          </p>

          <form onSubmit={handleVerifyOtp} className="w-full space-y-6">
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
                  className="w-11 h-12 border border-gray-300 rounded-lg text-center text-lg font-bold text-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none bg-gray-50/50"
                  required
                />
              ))}
            </div>

            {otpError && (
              <p className="text-xs text-red-500 text-center font-medium">
                {otpError}
              </p>
            )}

            <button
              type="submit"
              disabled={verifying || otp.join("").length < 6}
              className="w-full h-11 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 text-sm shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {verifying ? "Verifying..." : "Verify Code"}
            </button>
          </form>

          <div className="w-full space-y-4 mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={cooldown > 0 || resendLoading}
                className="text-purple-600 font-semibold hover:underline cursor-pointer bg-transparent border-none disabled:opacity-60 disabled:no-underline"
              >
                {cooldown > 0 ? `Resend Code (${cooldown}s)` : "Resend Code"}
              </button>
            </p>

            <button
              type="button"
              onClick={onLogin}
              className="text-xs text-gray-500 hover:text-gray-700 font-medium hover:underline cursor-pointer bg-transparent border-none"
            >
              Back to Login
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />

      {!toast && (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-center mb-1">
            Create Account
          </h1>
          <p className="text-gray-500 text-center text-sm mb-6">
            7-day free trial · paid plans from ₹499/month ($9) · extra seats at ₹51 each ($1)
          </p>

          <InputField
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            icon={Mail}
            disabled={step === 2}
            className={step === 2 ? "bg-gray-100 cursor-not-allowed" : ""}
          />

          {step === 2 && (
            <>
              <InputField
                label="Full Name"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
              />

              <InputField
                label="Password"
                type="password"
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                icon={Lock}
              />

              <label className="flex items-start gap-2 text-xs text-gray-500 mt-2">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                  className="mt-0.5"
                />
                <span>
                  I agree with the{" "}
                  <span className="text-blue-600 cursor-pointer">
                    Terms of use
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-600 cursor-pointer">
                    Privacy Policy
                  </span>
                </span>
              </label>
            </>
          )}

          <div className="mt-6">
            <Button
              text="Signup for free"
              onClick={handleSubmit}
              loading={loading}
              disabled={
                (step === 1 && !form.email) ||
                (step === 2 && (!form.name || !form.password || !form.agree))
              }
            />
          </div>

          {step === 1 && (
            <>
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  or
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="flex justify-center w-full">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  size="large"
                  width="384px"
                />
              </div>
            </>
          )}

          <p className="text-sm text-gray-400 text-center mt-6">
            Already have an account?{" "}
            <button
              onClick={onLogin}
              className="text-purple-600 font-medium hover:underline cursor-pointer bg-transparent border-none"
            >
              Login
            </button>
          </p>
        </div>
      )}
    </>
  );
};
