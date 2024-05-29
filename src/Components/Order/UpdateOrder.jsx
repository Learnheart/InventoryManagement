import React, { useState, useEffect } from "react";
import OrderService from "../../Api/OrderService";
import { useNavigate, useParams } from "react-router-dom";
import "../Grn/Grn.css";
import { toast } from "react-toastify";

const UpdateOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    orderDetails: [],
    paymentMethod: "",
  });

  const [details, setDetails] = useState({
    productId: "",
    quantity: 0,
  });

  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await OrderService.getOrderById(orderId);
        setOrder(response.data); // Set the order with existing details
      } catch (error) {
        toast.error("Failed to fetch order details");
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const addOrUpdateDetail = () => {
    const newDetail = {
      product: {
        productId: parseInt(details.productId, 10),
      },
      quantity: parseInt(details.quantity, 10),
    };

    setOrder((prevOrder) => {
      const updatedDetails = [...prevOrder.orderDetails];
      if (editingIndex !== null) {
        updatedDetails[editingIndex] = newDetail;
        setEditingIndex(null);
      } else {
        updatedDetails.push(newDetail);
      }
      return {
        ...prevOrder,
        orderDetails: updatedDetails,
      };
    });

    // Reset detail form
    setDetails({
      productId: "0",
      quantity: 0,
    });
  };

  const editDetail = (index) => {
    const detail = order.orderDetails[index];
    setDetails({
      productId: detail.product.productId,
      quantity: detail.quantity,
    });
    setEditingIndex(index);
  };

  const deleteDetail = (index) => {
    setOrder((prevOrder) => {
      const updatedDetails = [...prevOrder.orderDetails];
      updatedDetails.splice(index, 1); // Remove the detail at the specified index
      return {
        ...prevOrder,
        orderDetails: updatedDetails,
      };
    });
  };

  const handlePaymentMethodChange = (e) => {
    const { value } = e.target;
    setOrder({
      ...order,
      paymentMethod: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await OrderService.updateOrder(orderId, order);
      if (response.status === 200) {
        toast.success("Order updated successfully");
        navigate("/orderList");
      } else {
        toast.error("Failed to update order");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Error updating order");
    }
  };

  return (
    <div className="container">
      <h1>Update Order ID: {orderId}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product ID</label>
          <input
            type="number"
            name="productId"
            value={details.productId}
            onChange={handleInputChange}
            required
            className="form-control"
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
            className="form-control"
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={addOrUpdateDetail}
        >
          {editingIndex !== null ? "Update Detail" : "Add Detail"}
        </button>
        <div className="form-group">
          <h3>GRN Details</h3>
          <ul className="list-group">
            {order.orderDetails.map((detail, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                Product ID: {detail.product.productId}, Quantity:{" "}
                {detail.quantity}
                <div>
                  <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    onClick={() => editDetail(index)}
                  >
                    Edit
                  </button>{" "}
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteDetail(index)}
                  >
                    Delete
                  </button>
                </div>
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
            <option value="" disabled>
              Select payment method
            </option>
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit card</option>
            <option value="Internet Banking">Internet banking</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Note
        </button>
      </form>
    </div>
  );
};

export default UpdateOrder;
