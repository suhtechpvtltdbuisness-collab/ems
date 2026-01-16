// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { InputField } from '../../components/common/InputField';
import { Button } from '../../components/common/Button';

export const LoginForm = ({ onForgotPassword, onLogin, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (email && password) {
      onLogin(email, password);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-10 flex flex-col lg:flex-row gap-10">

      {/* LEFT SIDE — Centered Form */}
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-1 text-center lg:text-left">
          Login
        </h1>

        <p className="text-gray-500 mb-6 text-center lg:text-left">
          Please login to continue your account.
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

          <InputField
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            label="Password"
          />

          <div className="mt-4">
            <Button
              text="Login"
              onClick={handleSubmit}
              disabled={!email || !password}
            />
          </div>

          {/* Register Link */}
          <button
            onClick={onRegister}
            className="w-full text-center mt-4 text-gray-400"
          >
            Don’t have an account?{" "}
            <span className="text-purple-600 hover:text-purple-700">
              Register
            </span>
          </button>

          {/* Forgot Password */}
          <button
            onClick={onForgotPassword}
            className="w-full text-center mt-2 "
          >
            <span className="text-purple-600 hover:text-purple-700">
              Forgot password?
            </span>
          </button>
        </div>
      </div>

      {/* RIGHT SIDE — Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <img
          src="/AuthImg.svg"
          alt="Login Illustration"
          className="w-[90%] h-auto rounded-xl"
        />
      </div>
    </div>
  );
};
