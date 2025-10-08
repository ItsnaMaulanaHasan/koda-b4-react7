import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { userLogin } = useContext(AuthContext);
  if (userLogin?.email) {
    return children;
  } else {
    return <Navigate to="/auth/login" />;
  }
}

export default ProtectedRoute;
