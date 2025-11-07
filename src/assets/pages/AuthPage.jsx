import React, { useState } from 'react';
import { LoginForm } from '../components/authentication/LoginForm';
import { ForgotPasswordForm } from '../components/authentication/ForgotPasswordForm';
import { ResetPasswordForm } from '../components/authentication/ResetPasswordForm';
import { Button } from '../components/authentication/Button';

const AuthPage = () => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    showForgotPassword: false,
    showResetPassword: false,
    user: null
  });

  const handleLogin = (email, password) => {
    console.log('Login attempt:', { email, password });
    setAuthState({
      isLoggedIn: true,
      showForgotPassword: false,
      showResetPassword: false,
      user: { email }
    });
  };

  const handleForgotPassword = () => {
    setAuthState({
      ...authState,
      showForgotPassword: true,
      showResetPassword: false
    });
  };

  const handleGetLink = (email) => {
    console.log('Reset link sent to:', email);
    setAuthState({
      ...authState,
      showForgotPassword: false,
      showResetPassword: true
    });
  };

  const handleResetPassword = (newPassword) => {
    console.log('Password reset successful');
    setAuthState({
      isLoggedIn: false,
      showForgotPassword: false,
      showResetPassword: false,
      user: null
    });
  };

  const handleBackToLogin = () => {
    setAuthState({
      isLoggedIn: false,
      showForgotPassword: false,
      showResetPassword: false,
      user: null
    });
  };

  const handleLogout = () => {
    setAuthState({
      isLoggedIn: false,
      showForgotPassword: false,
      showResetPassword: false,
      user: null
    });
  };

  const renderContent = () => {
    if (authState.isLoggedIn) {
      return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
          <p className="text-gray-600 mb-6">You are now logged in as {authState.user?.email}</p>
          <Button text="Logout" onClick={handleLogout} />
        </div>
      );
    }

    if (authState.showResetPassword) {
      return (
        <ResetPasswordForm 
          onSubmit={handleResetPassword}
          onBack={handleBackToLogin}
        />
      );
    }

    if (authState.showForgotPassword) {
      return (
        <ForgotPasswordForm 
          onGetLink={handleGetLink}
          onBack={handleBackToLogin}
        />
      );
    }

    return (
      <LoginForm 
        onForgotPassword={handleForgotPassword}
        onLogin={handleLogin}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to from-blue-200 via-purple-200 to-purple-300 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-96 h-96 bg-purple-300 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to from-pink-400 to-purple-600 opacity-80 rounded-tr-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600 opacity-60 rounded-tl-full"></div>
      
      <div className="relative z-10">
        {renderContent()}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Secure login powered by encrypted authentication
        </p>
      </div>
    </div>
  );
};

export default AuthPage;