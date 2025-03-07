import { Navigate, Outlet } from "react-router-dom";

// Function to check if the user is authenticated using localStorage
const isAuthenticated = () => {
  return localStorage.getItem("authToken") !== null;
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
