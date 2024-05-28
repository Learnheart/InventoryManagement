// src/Api/ProductService.js
import customAxios from "./customApi";

class TrackingService {
  async trackingHistory(trackingId) {
    try {
      return await customAxios.get(`/staff/history/${trackingId}`);
    } catch (error) {
      console.error("Error adding product:", error.response);
      throw error;
    }
  }
  async getTrackingById(trackingId) {
    try {
      return await customAxios.get(`/tracking/${trackingId}`);
    } catch (error) {
      console.error("Error adding product:", error.response);
      throw error;
    }
  }
  async trackingList() {
    try {
      const response = await customAxios.get("/listTracking");
      return response.data; // Ensure only data is returned
    } catch (error) {
      console.error("Error fetching product list:", error.response);
      throw error;
    }
  }

  async updateTracking(trackingId, tracking) {
    try {
      return await customAxios.put(
        `/staff/updateTracking/${trackingId}`,
        tracking
      );
    } catch (error) {
      console.error("Error updating product:", error.response);
      throw error;
    }
  }

  async deleteTracking(trackingId) {
    try {
      const response = await customAxios.delete(
        `/manager/deleteTracking/${trackingId}`
      );
      return response.data; // Ensure only data is returned
    } catch (error) {
      console.error("Error deleting product:", error.response);
      throw error;
    }
  }
}

export default new TrackingService();
