// src/components/RegisterForm.jsx
import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { InputField } from "../../components/common/InputField";
import { Button } from "../../components/common/Button";

export const RegisterForm = ({ onRegister, onLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (firstName && lastName && email && password) {
      onRegister({ firstName, lastName, email, password });
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-10 flex flex-col lg:flex-row gap-10">

      {/* LEFT — Centered Form */}
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-1 text-center lg:text-left">
          Welcome to Orga
        </h1>

        <p className="text-gray-500 mb-6 text-center lg:text-left">
          Please enter your details to get started.
        </p>

        <div className="max-w-lg mx-auto lg:mx-0">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              icon={User}
              label="First Name"
            />

            <InputField
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              icon={User}
              label="Last Name"
            />
          </div>

          <InputField
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            label="Email"
          />

          <InputField
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            label="Password"
          />

          <div className="mt-4">
            <Button
              text="Signup"
              onClick={handleSubmit}
              disabled={!firstName || !lastName || !email || !password}
            />
          </div>

          {/* Login Link */}
          <button
            onClick={onLogin}
            className="w-full text-center mt-4 text-gray-400"
          >
            Already have an account?{" "}
            <span className="text-purple-600 hover:text-purple-700">
              Login
            </span>
          </button>
        </div>
      </div>

      {/* RIGHT — Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <img
          src="/AuthImg.svg"
          alt="Signup Illustration"
          className="w-[90%] h-auto rounded-xl"
        />
      </div>
    </div>
  );
};
