import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderService from "../../Api/OrderService";
import "../Grn/Grn.css";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await OrderService.getOrderById(orderId);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order detail:", error);
        setError("Failed to fetch order detail");
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetail();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!order) {
    return <div>No order found</div>;
  }

  return (
    <div>
      <h2>Order Detail</h2>
      <div>ID: {order.orderId}</div>
      <div>Import Date: {order.exportDate}</div>
      <div>Created by: {order.empId}</div>
      <div>Total Price: {order.totalPrice.toFixed(2)} VND</div>
      <div>Payment Method: {order.paymentMethod}</div>
      <h3>Details:</h3>
      <table className="table pr-5">
        <thead>
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Category</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {order.orderDetails.map((detail) => (
            <tr key={detail.orderDetailId}>
              <td>{detail.product.productName}</td>
              <td>{detail.product.category}</td>
              <td>{detail.quantity}</td>
              <td>{detail.price.toFixed(2)} VND</td>
              <td>{order.paymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetail;
