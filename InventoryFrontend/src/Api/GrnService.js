import customAxios from "./customApi";

class GrnService {
  async createNote(note) {
    try {
      return await customAxios.post("/staff/createNote", note);
    } catch (error) {
      return error.response;
    }
  }

  async getNoteById(grnId) {
    try {
      return await customAxios.get(`/grn/${grnId}`);
    } catch (error) {
      console.error("Error adding note:", error.response);
      throw error;
    }
  }

  async grnList() {
    try {
      const response = await customAxios.get("/grnList");
      return response.data; // Ensure to return the data property
    } catch (error) {
      return error.response;
    }
  }

  async updateGrn(grnId, grnData) {
    try {
      return await customAxios.put(`/staff/updateGrn/${grnId}`, grnData);
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

  async deleteGrn(grnId) {
    try {
      return await customAxios.delete(`/manager/deleteGrn/${grnId}`);
    } catch (error) {
      error.response;
    }
  }

  async totalImportProducts(productId) {
    try {
      return await customAxios.get(`/totalImportProducts/${productId}`);
    } catch (error) {
      error.response;
    }
  }
}

export default new GrnService();
