import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import AuthService from "../../Api/AuthService";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import logo from "../../image/logo.jpg";

const NUMBER = /^[0-9\b]+$/;

function RegistrationPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [empName, setEmpName] = useState("");
  const [validEmpName, setValidEmpName] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);

  const [address, setAddress] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);

  const [role, setRole] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidEmpName(!NUMBER.test(empName));
  }, [empName]);

  useEffect(() => {
    setValidPhoneNumber(
      phoneNumber.length === 0 ||
        (NUMBER.test(phoneNumber) && phoneNumber.length === 10)
    );
  }, [phoneNumber]);

  useEffect(() => {
    setValidPassword(password.length > 0);
  }, [password]);

  const handleSubmit = async () => {
    if (!validEmpName || !validPhoneNumber || !validPassword) {
      setErrMsg("Please make sure that all fields are filled correctly!");
      return;
    }

    setErrMsg("");

    const registerData = {
      empName: empName,
      phoneNumber: phoneNumber,
      address: address,
      password: password,
      role: role,
    };
    const response = await AuthService.register(registerData);
    console.log(response);

    if (response.status === 200 && response.data) {
      navigate(`/manager/userList`);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
      setErrMsg(response.data.message);
    }
  };

  return (
    <div className="register-container">
      <aside className="left-side">
        {/* Sử dụng đúng tên biến import */}
        <img src={logo} alt="KANBAN Logo" />
      </aside>
      <main className="form-content">
        <div className="header">
          {errMsg && <p className="error-message">{errMsg}</p>}
        </div>
        <h3 className="title">Create an account</h3>
        <div className="form-group">
          <label htmlFor="empName">Name*</label>
          <input
            type="text"
            name="empName"
            onChange={(e) => setEmpName(e.target.value)}
            required
            autoComplete="off"
          />
          {empName && !validEmpName && (
            <p className="error-message">Invalid Name</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone number*</label>
          <input
            type="text"
            name="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            autoComplete="off"
          />
          {phoneNumber && !validPhoneNumber && (
            <p className="error-message">Invalid Phone number</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input-container">
            <input
              type={togglePassword ? "text" : "password"}
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="toggle-password"
              onClick={() => setTogglePassword(!togglePassword)}
            >
              {!togglePassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </div>
          </div>
          {password && !validPassword && (
            <p className="error-message">Password cannot be empty</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            className="form-select"
            aria-label="Choose role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a role
            </option>
            <option value="MANAGER">Manager</option>
            <option value="INVENTORY_STAFF">Inventory staff</option>
            <option value="SALES">Sales</option>
          </select>
        </div>
        <div className="button" onClick={handleSubmit}>
          <span>Sign Up</span>
        </div>
      </main>
    </div>
  );
}

export default RegistrationPage;
