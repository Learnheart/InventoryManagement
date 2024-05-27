import customAxios from "./customApi";

class DashboardService {
  async getTotalImport() {
    try {
      return await customAxios.get("/public/total-import");
    } catch (error) {
      return error.response;
    }
  }

  async getTotalExportt() {
    try {
      return await customAxios.get("/public/total-export");
    } catch (error) {
      return error.response;
    }
  }

  async getTransactionReport() {
    try {
      return await customAxios.get("/public/transaction-report");
    } catch (error) {
      return error.response;
    }
  }

  async getMonthlyReport(startDay, endDay) {
    try {
      return await customAxios.get("/public/monthly-report", {
        params: { startDay, endDay },
      });
    } catch (error) {
      return error.response;
    }
  }
}
export default new DashboardService();
