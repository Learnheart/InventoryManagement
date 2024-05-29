import React, { useState, useEffect } from "react";
import UserService from "../../Api/UserService";
import { useParams, useNavigate } from "react-router-dom";
import "../Product/Product.css";
import "../Authentication/Login.css";
import { useAuth } from "../../Context/AuthContext";
import "./user.css";

const UpdateUser = () => {
  const { user } = useAuth();
  const { empId } = useParams();
  const navigate = useNavigate();

  // State variables to store user information
  const [empName, setEmpName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [roleDisabled, setRoleDisabled] = useState(true); // Initially, role is disabled

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const response = await UserService.getUser(empId);
      const userData = response.data;
      setEmpName(userData.empName);
      setPhoneNumber(userData.phoneNumber);
      setAddress(userData.address);
      setRole(userData.role);
      // Enable role selection only if the user's role is MANAGER
      setRoleDisabled(user.role !== "MANAGER");
    } catch (error) {
      console.error("Error fetching user data:", error);
      setErrMsg("Failed to fetch user data");
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        empName,
        phoneNumber,
        address,
        role,
      };
      await UserService.updateUserInfo(empId, updatedUser);
      navigate("/manager/userList"); // Redirect to user list after successful update
    } catch (error) {
      console.error("Error updating user:", error);
      setErrMsg("Failed to update user");
    }
  };

  return (
    <div className="register-container">
      <main className="form-content">
        <h3 className="title">Update User ID: {empId}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="empName">Name*</label>
            <input
              type="text"
              name="empName"
              value={empName}
              onChange={(e) => setEmpName(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone number*</label>
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              className="form-select"
              aria-label="Choose role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              disabled={roleDisabled} // Disable role selection based on roleDisabled state
            >
              <option value="">Select a role</option>
              <option value="MANAGER">Manager</option>
              <option value="INVENTORY_STAFF">Inventory staff</option>
              <option value="SALES">Sales</option>
            </select>
          </div>
          {errMsg && <p className="error">{errMsg}</p>}
          <button type="submit" className="button">Update User</button>
        </form>
      </main>
    </div>
  );
};

export default UpdateUser;
