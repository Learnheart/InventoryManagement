// src/Api/ProductService.js
import customAxios from "./customApi";

class ProductService {
  async getProduct(productId) {
    try {
      return await customAxios.get(`/product/${productId}`);
    } catch (error) {
      console.error("Error adding product:", error.response);
      throw error;
    }
  }
  async getProductList() {
    try {
      const response = await customAxios.get("/products");
      return response.data; // Ensure only data is returned
    } catch (error) {
      console.error("Error fetching product list:", error.response);
      throw error;
    }
  }

  async addProduct(productData) {
    try {
      return await customAxios.post("/manager/addProduct", productData);
    } catch (error) {
      console.error("Error adding product:", error.response);
      throw error;
    }
  }

  async updateProduct(productId, productData) {
    try {
      return await customAxios.put(
        `/manager/updateProduct/${productId}`,
        productData
      );
    } catch (error) {
      console.error("Error updating product:", error.response);
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      const response = await customAxios.delete(
        `/manager/deleteProduct/${productId}`
      );
      return response.data; // Ensure only data is returned
    } catch (error) {
      console.error("Error deleting product:", error.response);
      throw error;
    }
  }
}

export default new ProductService();
