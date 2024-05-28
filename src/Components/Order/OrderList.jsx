import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderService from "../../Api/OrderService";
import "../Grn/Grn.css";

const OrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const orderPerPage = 10;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await OrderService.orderList();
      console.log("Fetched Orders:", data);
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setError("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching Orders:", error);
      setError("Failed to fetch Orders");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await OrderService.deleteOrder(orderId);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product");
    }
  };

  const handleDetail = (orderId) => {
    navigate(`/orderDetail/${orderId}`);
  };

  const indexOfLastGrn = currentPage * orderPerPage;
  const indexOfFirstGrn = indexOfLastGrn - orderPerPage;
  const currentGrns = orders.slice(indexOfFirstGrn, indexOfLastGrn);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(orders.length / orderPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="header">
        <h1>Order List</h1>
        <button onClick={() => navigate("/sale/createOrder")}>Add Order</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Export Date</th>
            <th scope="col">Employee ID</th>
            <th scope="col">Total Price</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {currentGrns.map((order) => (
            <tr key={order.orderId}>
              <th>{order.orderId}</th>
              <td>{order.exportDate}</td>
              <td>{order.empId}</td>
              <td>{order.totalPrice.toFixed(2)} VND</td>
              <td>
                <button onClick={() => handleDetail(order.orderId)}>
                  Detail
                </button>
              </td>
              <td>
                <button
                  onClick={() => navigate(`/sale/updateOrder/${order.orderId}`)}
                >
                  Update
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(order.orderId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button
                onClick={() => setCurrentPage(number)}
                className="page-link"
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default OrderList;
