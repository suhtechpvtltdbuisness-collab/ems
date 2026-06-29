import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { InputField } from "../../components/common/InputField";
import { Button } from "../../components/common/Button";
import { Toast } from "../../components/common/Toast";
import { authService } from "../../service";

export const LoginForm = ({ onRegister }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) return;

    setLoading(true);

    const result = await authService.login(form);

    if (result.success) {
      setToast({
        type: "success",
        title: "Login Successful",
        message: authService.isSubscribed(result.data?.subscription)
          ? "Redirecting to dashboard..."
          : "Choose a plan from ₹499/month to get started...",
      });

      setTimeout(() => {
        authService.handlePostAuthRedirect(result.data?.subscription, navigate);
      }, 1500);
    } else {
      setToast({
        type: "error",
        title: "Login Failed",
        message: result.message,
      });
    }

    setLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse.credential) {
      setToast({
        type: "error",
        title: "Google Login Failed",
        message: "No credential received from Google",
      });
      return;
    }

    setLoading(true);

    const result = await authService.googleLogin(credentialResponse.credential);

    if (result.success) {
      setToast({
        type: "success",
        title: "Login Successful",
        message: authService.isSubscribed(result.data?.subscription)
          ? "Redirecting to dashboard..."
          : "Choose a plan from ₹499/month to get started...",
      });

      setTimeout(() => {
        authService.handlePostAuthRedirect(result.data?.subscription, navigate);
      }, 1500);
    } else {
      setToast({
        type: "error",
        title: "Login Failed",
        message: result.message,
      });
    }

    setLoading(false);
  };

  const handleGoogleError = () => {
    setToast({
      type: "error",
      title: "Google Login Failed",
      message: "An error occurred with Google Sign-In",
    });
  };

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />

      {!toast && (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

          <InputField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            icon={Mail}
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            icon={Lock}
          />

          <div className="mt-6">
            <Button
              text="Login"
              onClick={handleSubmit}
              loading={loading}
              disabled={!form.email || !form.password}
            />
          </div>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-wider">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
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

          <p className="text-sm text-gray-400 text-center mt-6">
            Don't have an account?{" "}
            <button
              onClick={onRegister}
              className="text-purple-600 font-medium hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      )}
    </>
  );
};
