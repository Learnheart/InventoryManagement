import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import {
  FaHome,
  FaBox,
  FaTruck,
  FaFileImport,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa"; // Import icons
import "./Sidebar.css";
import logo_ngang from "../../image/logo_ngang.jpg";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/signin");
  };

  return (
    <div className="sidebar">
      <img src={logo_ngang} alt="KANBAN Logo" />
      <Nav className="flex-column">
        <NavLink to="/dashboard" className="nav-link" activeclassname="active">
          <FaHome className="nav-icon" /> Dashboard
        </NavLink>
        <NavLink to="/products" className="nav-link" activeclassname="active">
          <FaBox className="nav-icon" /> Manage Product
        </NavLink>
        <NavLink to="/tracking" className="nav-link" activeclassname="active">
          <FaTruck className="nav-icon" /> Tracking
        </NavLink>
        <NavLink to="/grnList" className="nav-link" activeclassname="active">
          <FaFileImport className="nav-icon" /> Import
        </NavLink>
        <NavLink to="/orderList" className="nav-link" activeclassname="active">
          <FaShoppingCart className="nav-icon" /> Orders
        </NavLink>
        <NavLink
          to="/manage-employee"
          className="nav-link"
          activeclassname="active"
        >
          <FaUsers className="nav-icon" /> Manage Employee
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
