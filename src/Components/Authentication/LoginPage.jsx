import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import AuthService from "../../Api/AuthService";
import { toast } from "react-toastify";
import "./Login.css";
import logo from "../../image/logo.jpg";
import logo_ngang from "../../image/logo_ngang.jpg";

const NUMBER_REGEX = /^[0-9\b]+$/;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const userRef = useRef();

  const [empId, setEmpId] = useState("");
  const [validEmpId, setValidEmpId] = useState(false);
  const [empIdFocus, setEmpIdFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [togglePassword, setTogglePassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidEmpId(NUMBER_REGEX.test(empId));
  }, [empId]);
  useEffect(() => {
    setValidPassword(password.length > 0);
  }, [password]);

  const handleSubmit = async () => {
    if (!validEmpId || !validPassword) {
      setErrMsg("Please make sure that all fields are filled correctly!");
      return;
    }

    setErrMsg("");

    try {
      const response = await AuthService.login({ empId, password });
      console.log(response);
      if (response.status === 200 && response.data && response.data.token) {
        const { data } = response;
        toast.success("Login successful!");
        const accessToken = data.token;
        login(data, accessToken);

        setTimeout(() => {
          navigate("/public/transaction-report");
        }, 0);
      } else {
        setErrMsg("Login failed. Please try again!");
        if (response.data && response.data.message) {
          toast.error(response.data.message);
          setErrMsg(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      setErrMsg("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <aside className="left-side">
        {/* Thêm logo và tiêu đề nếu cần */}
        <img src={logo} alt="KANBAN Logo" />
      </aside>
      <main className="form-content">
        <div className="header">
        <img src={logo_ngang} alt="KANBAN Logo" />
          {errMsg && <p className="error-message">{errMsg}</p>}
        </div>
        <h3 className="title">Log In</h3>
        <div className="form-group">
          <label htmlFor="empId">Employee ID:</label>
          <input
            type="text"
            ref={userRef}
            name="empId"
            onFocus={() => setEmpIdFocus(true)}
            onBlur={() => setEmpIdFocus(false)}
            onChange={(e) => setEmpId(e.target.value)}
            required
            autoComplete="off"
          />
          {empIdFocus && empId && !validEmpId && (
            <p className="error-message">Invalid Employee ID</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input-container">
            <input
              type={togglePassword ? "text" : "password"}
              name="password"
              id="password"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
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
          {passwordFocus && password && !validPassword && (
            <p className="error-message">Password cannot be empty</p>
          )}
        </div>

        <div className="button" onClick={handleSubmit}>
          <span>Log in</span>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
