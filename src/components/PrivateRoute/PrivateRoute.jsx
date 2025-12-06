import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../LoaderSpinner/LoaderSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext); // ✅ FIXED useContext()
  const location = useLocation();

  console.log("PrivateRoute: Current location:", location.pathname);

  // 🔄 Show spinner while Firebase checks login state
  if (loading) {
    return <LoadingSpinner fullScreen={true} />;
  }

  // ❌ Not logged in → redirect to login
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // ✅ FIXED: must pass full location
      />
    );
  }

  // ✅ Logged in → render protected content
  return <>{children}</>;
};

export default PrivateRoute;
