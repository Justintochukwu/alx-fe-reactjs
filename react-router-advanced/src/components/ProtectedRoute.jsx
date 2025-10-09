import { Navigate } from "react-router-dom";

// ✅ Simulated authentication hook
function useAuth() {
  const user = { loggedIn: true }; // change to false to simulate not logged in
  return user && user.loggedIn;
}

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
