import React, { useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const { logout } = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is not authenticated
    if (!user.isAuthenticated) {
      // Navigate to the login page
      navigate("/auth/signin");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/auth/signin"); // Redirect to the login page after logout
  };
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Report;
