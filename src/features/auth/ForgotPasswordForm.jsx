import React, { useState } from "react";
import { Mail } from "lucide-react";
import { InputField } from "../../components/common/InputField";
import { Button } from "../../components/common/Button";

export const ForgotPasswordForm = ({ onGetLink, onBack }) => {
  const [email, setEmail] = useState("");

  const handleGetLink = () => {
    if (!email) return;
    onGetLink(email);
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-10 flex flex-col lg:flex-row gap-10">

      {/* LEFT — centered form */}
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-1 text-center lg:text-left">
          Forgot Your Password?
        </h1>

        <p className="text-gray-500 mb-6 text-center lg:text-left">
          A link will be sent to your mail to help you reset your password.
        </p>

        <div className="max-w-lg mx-auto lg:mx-0">
          <InputField
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            label="Email"
          />

          <div className="mt-4">
            <Button
              text="Get Link"
              onClick={handleGetLink}
              disabled={!email}
            />
          </div>

          <button
            type="button"
            onClick={onBack}
            className="mt-4 text-sm text-gray-400 underline hover:text-purple-600 block text-center lg:text-left"
          >
            Back to Login
          </button>
        </div>
      </div>

      {/* RIGHT — illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <img
          src="/AuthImg.svg"
          alt="Forgot Password Illustration"
          className="w-[90%] h-auto rounded-xl"
        />
      </div>
    </div>
  );
};
