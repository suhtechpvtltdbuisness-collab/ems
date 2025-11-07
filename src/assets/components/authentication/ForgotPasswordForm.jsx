import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { InputField } from './InputField';
import { Button } from './Button';

export const ForgotPasswordForm = ({ onGetLink, onBack }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (email) {
      onGetLink(email);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to from-purple-600 to-pink-500 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white"></div>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-center mb-2">Forgot Your Password?</h1>
      <p className="text-gray-500 text-center mb-6">
        A link will be sent to your mail to help your<br />reset your password.
      </p>

      <InputField
        type="email"
        placeholder="Value"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={Mail}
      />

      <div className="mb-4">
        <Button text="Get Link" onClick={handleSubmit} disabled={!email} />
      </div>

      <button
        onClick={onBack}
        className="w-full text-center text-gray-600 hover:text-purple-600 transition-colors underline"
      >
        Back to Login
      </button>
    </div>
  );
};