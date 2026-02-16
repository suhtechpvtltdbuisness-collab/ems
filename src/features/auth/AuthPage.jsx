import { useState } from "react";
import { RegisterForm } from "../features/auth/RegisterForm";
import { LoginForm } from "../features/auth/LoginForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      {isLogin ? (
        <LoginForm
          onLoginSuccess={(data) => {
            console.log("Logged in:", data);
            localStorage.setItem("isLoggedIn", "true");
          }}
          onRegister={() => setIsLogin(false)}
        />
      ) : (
        <RegisterForm
          onRegister={(data) => {
            console.log("Registered:", data);
            localStorage.setItem("isLoggedIn", "true");
          }}
          onLogin={() => setIsLogin(true)}
        />
      )}
    </>
  );
}