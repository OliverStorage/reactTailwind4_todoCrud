import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  if (currentUser === undefined) return null;
  return currentUser ? children : <Navigate to="/login" replace />;
}
