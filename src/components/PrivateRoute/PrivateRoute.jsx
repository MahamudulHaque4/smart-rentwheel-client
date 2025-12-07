import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../LoaderSpinner/LoaderSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  console.log("PrivateRoute: Current location:", location.pathname);

  if (loading) {
    return <LoadingSpinner fullScreen={true} />;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }
  return <>{children}</>;
};

export default PrivateRoute;
