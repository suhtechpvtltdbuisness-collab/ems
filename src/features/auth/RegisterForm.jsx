import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    agree: false,
  });

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
      localStorage.setItem("isRegistered", "true");
      setToast({
        type: "success",
        title: "Account Created Successfully",
        message: authService.isSubscribed(result.data?.subscription)
          ? "Redirecting to dashboard..."
          : "Choose a plan to get started...",
      });

      onRegister?.(result.data);

      setTimeout(() => {
        authService.handlePostAuthRedirect(result.data?.subscription, navigate);
      }, 1500);
    } else {
      setToast({
        type: "error",
        title: "Failed To Create Account",
        message: result.message,
      });
    }

    setLoading(false);
  };

  const handleGoogleSignup = () => {
    setGoogleLoading(true);

    setTimeout(() => {
      setGoogleLoading(false);

      setToast({
        type: "success",
        title: "Signed in Successfully",
        message: "Redirecting to home...",
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    }, 2000);
  };

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />

      {!toast && (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-center mb-1">
            Create Account
          </h1>
          <p className="text-gray-500 text-center text-sm mb-6">
            Sign up to get started with our platform
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
                <span className="text-xs text-gray-400">
                  or continue with
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <button
                onClick={handleGoogleSignup}
                disabled={googleLoading}
                className={`w-full flex items-center justify-center gap-3 border border-purple-600 rounded-full py-2.5 transition ${
                  googleLoading
                    ? "bg-white cursor-not-allowed"
                    : "hover:bg-gray-50"
                }`}
              >
                {googleLoading ? (
                  <>
                    <img src="/loader.svg" alt="loading" className="w-5 h-5" />
                    <span className="text-sm font-medium text-purple-600">
                      Signing you in...
                    </span>
                  </>
                ) : (
                  <>
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium text-purple-600">
                      Continue with Google
                    </span>
                  </>
                )}
              </button>
            </>
          )}

          <p className="text-sm text-gray-400 text-center mt-6">
            Already have an account?{" "}
            <button
              onClick={onLogin}
              className="text-purple-600 font-medium hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      )}
    </>
  );
};