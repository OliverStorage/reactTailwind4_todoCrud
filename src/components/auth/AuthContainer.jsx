import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";

export default function AuthContainer({ onSuccess }) {
  const [currentForm, setCurrentForm] = useState("login");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/todos");
    }
  }, [currentUser, navigate]);

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
