import customAxios from "./customApi";

class OrderService {
  async createOrder(order) {
    try {
      return await customAxios.post("/sale/createOrder", order);
    } catch (error) {
      return error.response;
    }
  }

  async getOrderById(orderId) {
    try {
      return await customAxios.get(`/orderDetail/${orderId}`);
    } catch (error) {
      console.error("Error adding note:", error.response);
      throw error;
    }
  }

  async orderList() {
    try {
      const response = await customAxios.get("/orderList");
      return response.data; // Ensure to return the data property
    } catch (error) {
      return error.response;
    }
  }

  async updateOrder(orderId, order) {
    try {
      return await customAxios.put(`/sale/updateOrder/${orderId}`, order);
    } catch (error) {
      console.error("Error updating note:", error);

      // Check if the error response exists
      if (error.response) {
        // The request was made and the server responded with a status code and headers
        const { status, data } = error.response;
        throw new Error(
          `Error updating note: ${status} - ${data || "Unknown error"}`
        );
      } else {
        // Handle other types of errors (e.g., network error, request cancellation)
        throw new Error("Error updating note: An unexpected error occurred.");
      }
    }
  }

  async deleteOrder(orderId) {
    try {
      return await customAxios.delete(`/manager/deleteOrder/${orderId}`);
    } catch (error) {
      error.response;
    }
  }

  async totalExportProducts(productId) {
    try {
      return await customAxios.get(`/productQuantities/${productId}`);
    } catch (error) {
      error.response;
    }
  }
}

export default new OrderService();
