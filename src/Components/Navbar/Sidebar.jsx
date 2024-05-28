import React, { useEffect, useState } from "react";
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
  FaCog,
} from "react-icons/fa"; // Import icons
import "./Sidebar.css";
import logo_ngang from "../../image/logo_ngang.jpg";
import UserService from "../../Api/UserService";

const Sidebar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [empId, setEmpId] = useState(null);

  useEffect(() => {
    const fetchEmpId = async () => {
      try {
        const response = await UserService.myId();
        setEmpId(response.data); // Assuming the ID is in the response data
      } catch (error) {
        console.error("Error fetching employee ID:", error.response);
        // Handle error...
      }
    };
    fetchEmpId();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/auth/signin");
  };
  console.log(user);

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
        <NavLink
          to="/listTracking"
          className="nav-link"
          activeclassname="active"
        >
          <FaTruck className="nav-icon" /> Tracking
        </NavLink>
        {(user.role === "MANAGER" || user.role === "INVENTORY_STAFF") && (
          <NavLink to="/grnList" className="nav-link" activeclassname="active">
            <FaFileImport className="nav-icon" /> Imports
          </NavLink>
        )}
        {/* <NavLink to="/orderList" className="nav-link" activeclassname="active">
          <FaShoppingCart className="nav-icon" /> Orders
        </NavLink> */}
        {(user.role === "MANAGER" || user.role === "SALES") && (
          <NavLink
            to="/orderList"
            className="nav-link"
            activeclassname="active"
          >
            <FaShoppingCart className="nav-icon" /> Orders
          </NavLink>
        )}
        {user.role === "MANAGER" && ( // Render NavLink only if user's role is MANAGER
          <NavLink
            to="/manager/userList"
            className="nav-link"
            activeclassname="active"
          >
            <FaUsers className="nav-icon" /> Manage Employee
          </NavLink>
        )}
        <NavLink
          to={`/updateUser/${empId}`}
          className="nav-link"
          activeClassName="active"
        >
          <FaCog className="nav-icon" /> Profile
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
