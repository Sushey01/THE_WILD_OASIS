import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../services/useUser";

const fullPageStyle = {
  height: "100vh",
  backgroundColor: "#111827",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return (
      <div style={fullPageStyle}>
        <h2 style={{ color: "#E5EBE7", fontSize: "16px" }}>Loading...</h2>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
