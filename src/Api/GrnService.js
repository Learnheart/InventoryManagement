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
      return error.response;
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
      error.response;
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
      return await customAxios.put(`/totalImportProducts/${productId}`);
    } catch (error) {
      error.response;
    }
  }
}

export default new GrnService();
