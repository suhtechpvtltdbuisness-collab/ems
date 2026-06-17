import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
          : "Choose a plan to get started...",
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
