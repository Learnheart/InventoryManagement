// import axios from "axios";
import customAxios from "./customApi";

class AuthService {
  // static BASE_URL = "http://localhost:4000";

  async login(userData) {
    try {
      return await customAxios.post(`/auth/signin`, userData);
    } catch (error) {
      return error.response;
    }
  }

  async register(userData) {
    try {
      return await customAxios.post(`/auth/signup`, userData);
    } catch (error) {
      return error.response;
    }
  }

  // static logout() {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("role");
  // }
  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }
  static isManager() {
    const role = localStorage.getItem("role");
    return role === "MANAGER";
  }
  static isSales() {
    const role = localStorage.getItem("role");
    return role === "SALES";
  }
  static isStaff() {
    const role = localStorage.getItem("role");
    return role === "INVENTORY_STAFF";
  }
  static managerOnly() {
    return this.isAuthenticated() && this.isManager();
  }
  static forSales() {
    return (this.isAuthenticated() && this.isManager) || this.isSales;
  }
  static forStaff() {
    return (this.isAuthenticated() && this.isManager) || this.isStaff;
  }
}

export default new AuthService();
