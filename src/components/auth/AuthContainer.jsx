import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";

export default function AuthContainer({ onSuccess }) {
  const [currentForm, setCurrentForm] = useState("login");

  return (
    <div className="w-full h-screen max-w-md mx-auto">
      {currentForm === "login" && (
        <Login
          onSuccess={onSuccess}
          switchToSignup={() => setCurrentForm("signup")}
          switchToReset={() => setCurrentForm("reset")}
        />
      )}

      {currentForm === "signup" && (
        <Signup
          onSuccess={onSuccess}
          switchToLogin={() => setCurrentForm("login")}
        />
      )}

      {currentForm === "reset" && (
        <ResetPassword switchToLogin={() => setCurrentForm("login")} />
      )}
    </div>
  );
}
