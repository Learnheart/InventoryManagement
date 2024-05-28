import React, { useState } from "react";
import GrnService from "../../Api/GrnService";
import { useNavigate } from "react-router-dom";
import "./Grn.css";

const AddGrn = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState({
    grnDetails: [],
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

    setNote((prevNote) => ({
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
      const response = await GrnService.createNote(note);
      if (response.status === 200 || response.status === 201) {
        alert("Note created successfully");
        // Reset form
        // setNote({
        //   grnDetails: [],
        // });
        navigate("/grnList");
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
      <h2>Add New Note</h2>
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
            {note.grnDetails.map((detail, index) => (
              <li key={index}>
                Product ID: {detail.product.productId}, Quantity:{" "}
                {detail.quantity}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default AddGrn;
