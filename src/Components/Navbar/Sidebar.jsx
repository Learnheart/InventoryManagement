import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/signin");
  };

  return (
    <div className="sidebar bg-light">
      {/* Sidebar content */}
      <Nav className="flex-column">
        <NavLink to="/dashboard" className="nav-link" activeclassname="active">
          Dashboard
        </NavLink>
        <NavLink to="/reports" className="nav-link" activeclassname="active">
          Manage product
        </NavLink>
        <NavLink to="/settings" className="nav-link" activeclassname="active">
          Tracking
        </NavLink>
        <NavLink to="/settings" className="nav-link" activeclassname="active">
          Import
        </NavLink>
        <NavLink to="/settings" className="nav-link" activeclassname="active">
          Orders
        </NavLink>
        <NavLink to="/settings" className="nav-link" activeclassname="active">
          Manage Employee
        </NavLink>
      </Nav>
      <div className="setting mt-3">
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
