import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Navbar/Sidebar";
import Header from "../../Components/Header/Header";
import DashboardService from "../../Api/DashboardService";
import Chart from "chart.js/auto";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [transactionReport, setTransactionReport] = useState(null);

  useEffect(() => {
    // Check if the user is not authenticated
    if (!user.isAuthenticated) {
      alert("Unauthorize access");
      navigate("/auth/signin");
    } else {
      getTransactionReport();
    }
  }, [user, navigate]);

  const getTransactionReport = async () => {
    try {
      const response = await DashboardService.getTransactionReport();
      setTransactionReport(response.data);
      renderChart(response.data);
    } catch (error) {
      console.error("Error fetching transaction report:", error);
    }
  };

  const renderChart = (data) => {
    const ctx = document.getElementById("transactionChart").getContext("2d");

    // Check if window.transactionChart exists and has a destroy method
    if (
      window.transactionChart &&
      typeof window.transactionChart.destroy === "function"
    ) {
      // Destroy existing chart
      window.transactionChart.destroy();
    }

    const labels = Object.keys(data);
    const firstValues = labels.map((label) => data[label].first);
    const secondValues = labels.map((label) => data[label].second);

    window.transactionChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Import quantities",
            data: firstValues,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "Export quantities",
            data: secondValues,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div className="main">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <Header />
          <div className="main-content">
            <div className="chart-container">
              <canvas id="transactionChart" width="400" height="400"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
