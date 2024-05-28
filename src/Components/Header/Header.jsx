import React, { useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { user } = useAuth();

  // useEffect(() => {
  //   if (user.role == "MANAGER") {

  //   }
  // })
  return (
    <div>
      <div className="header">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        <div className="name">
          Welcome{" "}
          {user.role && (
            <span>
              <b>{user.role}</b>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
