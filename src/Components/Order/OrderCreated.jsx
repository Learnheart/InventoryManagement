import React, { useState } from "react";
import OrderService from "../../Api/OrderService";
import { useNavigate } from "react-router-dom";
import "../Grn/Grn.css";

const OrderCreated = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    orderDetails: [],
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

  const addDetail = () => {
    const newDetail = {
      product: {
        productId: parseInt(details.productId, 10),
      },
      quantity: parseInt(details.quantity, 10),
    };

    setOrder((prevNote) => ({
      ...prevNote,
      grnDetails: [...prevNote.grnDetails, newDetail],
    }));

    // Reset detail form
    setDetails({
      productId: "0",
      quantity: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await OrderService.createOrder(order);
      if (response.status === 200 || response.status === 201) {
        alert("Note created successfully");
        // Reset form
        // setNote({
        //   grnDetails: [],
        // });
        navigate("/orderList");
      } else {
        alert("Error creating note: " + response.data.message);
      }
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Error creating note: " + error.message);
    }
  };

  return (
    <div>
      <h2>Add New Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product ID</label>
          <input
            type="number"
            name="productId"
            value={details.productId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={details.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="button" onClick={addDetail}>
          Add Detail
        </button>
        <div>
          <h3>GRN Details</h3>
          <ul>
            {order.orderDetails.map((detail, index) => (
              <li key={index}>
                Product ID: {detail.product.productId}, Quantity:{" "}
                {detail.quantity}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Add Order</button>
      </form>
    </div>
  );
};

export default OrderCreated;
