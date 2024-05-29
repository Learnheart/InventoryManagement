// AuthContext.js
import { createContext, useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const userDefault = {
    isAuthenticated: false,
    token: "",
  };

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : userDefault;
  });

  const login = (userData, token) => {
    setUser({ ...userData, isAuthenticated: true, token });
    localStorage.setItem(
      "user",
      JSON.stringify({ ...userData, isAuthenticated: true, token })
    );
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(userDefault);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
