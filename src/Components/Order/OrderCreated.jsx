import React, { useState } from "react";
import OrderService from "../../Api/OrderService";
import { useNavigate } from "react-router-dom";
import "../Grn/Grn.css";

const OrderCreated = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    orderDetails: [],
    paymentMethod: "", // Adding payment method to the state
  });

  const [details, setDetails] = useState({
    productId: "",
    quantity: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handlePaymentMethodChange = (e) => {
    const { value } = e.target;
    setOrder({
      ...order,
      paymentMethod: value,
    });
  };

  const addDetail = () => {
    const newDetail = {
      product: {
        productId: parseInt(details.productId, 10),
      },
      quantity: parseInt(details.quantity, 10),
    };

    setOrder((prevOrder) => ({
      ...prevOrder,
      orderDetails: [...prevOrder.orderDetails, newDetail],
    }));

    // Reset detail form
    setDetails({
      productId: "",
      quantity: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await OrderService.createOrder(order);
      if (response.status === 200 || response.status === 201) {
        alert("Order created successfully");
        navigate("/orderList");
      } else {
        alert("Error creating order: " + response.data.message);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error creating order: " + error.message);
    }
  };

  return (
    <div className="container">
      <h1>Add New Order</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product ID</label>
          <input
            type="number"
            name="productId"
            value={details.productId}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={details.quantity}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
        </div>
        <button type="button" onClick={addDetail}>Add Detail</button>
        <div className="form-group">
          <h3>Order Details</h3>
          <ul>
            {order.orderDetails.map((detail, index) => (
              <li key={index}>
                Product ID: {detail.product.productId}, Quantity: {detail.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div className="form-group">
          <label>Select Payment Method</label>
          <select
            value={order.paymentMethod}
            onChange={handlePaymentMethodChange}
            required
            className="form-control"
          >
            <option value="" disabled>Select payment method</option>
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit card</option>
            <option value="Internet Banking">Internet banking</option>
          </select>
        </div>
        <button type="submit">Add Order</button>
      </form>
    </div>
  );
};

export default OrderCreated;
