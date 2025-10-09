import { Navigate } from "react-router-dom";

// ✅ Simple simulated authentication check
const isAuthenticated = true; // change to false to test

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
