import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UserAPI from "../data/api";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await UserAPI.get("/test"); // simple API to verify token
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
