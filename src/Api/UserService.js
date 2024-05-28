// src/Api/ProductService.js
import customAxios from "./customApi";

class UserService {
  async getUser(empId) {
    try {
      return await customAxios.get(`/getUser/${empId}`);
    } catch (error) {
      console.error("Error getting user:", error.response);
      throw error;
    }
  }
  async myId() {
    try {
      return await customAxios.get(`/id`);
    } catch (error) {
      console.error("Error adding product:", error.response);
      throw error;
    }
  }
  async getUserList() {
    try {
      const response = await customAxios.get("/manager/userList");
      return response.data;
    } catch (error) {
      console.error("Error fetching product list:", error.response);
      throw error;
    }
  }

  async updateUserInfo(empId, userData) {
    try {
      return await customAxios.put(`/updateUser/${empId}`, userData);
    } catch (error) {
      console.error("Error updating product:", error.response);
      throw error;
    }
  }

  async deleteUser(empId) {
    try {
      const response = await customAxios.delete(`/manager/delete/${empId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error.response);
      throw error;
    }
  }
}

export default new UserService();
