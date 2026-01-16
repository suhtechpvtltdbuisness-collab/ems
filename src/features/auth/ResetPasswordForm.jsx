// src/components/ResetPasswordForm.jsx
import React, { useState } from "react";
import { Lock } from "lucide-react";
import { InputField } from "../../components/common/InputField";
import { Button } from "../../components/common/Button";

export const ResetPasswordForm = ({ onSubmit, onBack }) => {
  const [password, setPassword] = useState("");

  const handleReset = () => {
    if (!password) return;
    onSubmit(password);
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-10 flex flex-col lg:flex-row gap-10">

      {/* LEFT — centered form */}
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-1 text-center lg:text-left">
          Reset Password
        </h1>

        <p className="text-gray-500 mb-6 text-center lg:text-left">
          Set a new password for your account.
        </p>

        <div className="max-w-lg mx-auto lg:mx-0">
          <InputField
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            label="New Password"
          />

          <div className="mt-4">
            <Button
              text="Reset Password"
              onClick={handleReset}
              disabled={!password}
            />
          </div>

          <button
            type="button"
            onClick={onBack}
            className="mt-4 text-sm text-gray-600 hover:text-purple-600 underline block text-center lg:text-left"
          >
            Back to Login
          </button>
        </div>
      </div>

      {/* RIGHT — illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <img
          src="/AuthImg.svg"
          alt="Reset Password Illustration"
          className="w-[90%] h-auto rounded-xl"
        />
      </div>
    </div>
  );
};
