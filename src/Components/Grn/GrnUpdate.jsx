import React, { useState, useEffect } from "react";
import GrnService from "../../Api/GrnService";
import { useNavigate, useParams } from "react-router-dom";
import "./Grn.css";
import { toast } from "react-toastify";

const GrnUpdate = () => {
  const { grnId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({
    grnDetails: [],
  });

  const [details, setDetails] = useState({
    productId: "",
    quantity: 0,
  });

  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchGrn = async () => {
      try {
        const response = await GrnService.getNoteById(grnId);
        setNote(response.data); // Set the note with existing details
      } catch (error) {
        toast.error("Failed to fetch GRN details");
      }
    };
    fetchGrn();
  }, [grnId]);

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

    setNote((prevNote) => {
      const updatedDetails = [...prevNote.grnDetails];
      if (editingIndex !== null) {
        updatedDetails[editingIndex] = newDetail;
        setEditingIndex(null);
      } else {
        updatedDetails.push(newDetail);
      }
      return {
        ...prevNote,
        grnDetails: updatedDetails,
      };
    });

    // Reset detail form
    setDetails({
      productId: "0",
      quantity: 0,
    });
  };

  const editDetail = (index) => {
    const detail = note.grnDetails[index];
    setDetails({
      productId: detail.product.productId,
      quantity: detail.quantity,
    });
    setEditingIndex(index);
  };

  const deleteDetail = (index) => {
    setNote((prevNote) => {
      const updatedDetails = [...prevNote.grnDetails];
      updatedDetails.splice(index, 1); // Remove the detail at the specified index
      return {
        ...prevNote,
        grnDetails: updatedDetails,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await GrnService.updateGrn(grnId, note); // Update the existing GRN
      console.log(note);
      console.log(response.status);
      if (response.status === 200) {
        toast.success("GRN updated successfully");
        navigate("/grnList");
      } else {
        toast.error("Failed to update GRN");
      }
    } catch (error) {
      console.log(note);
      console.error("Error updating GRN:", error);
      toast.error("Error updating GRN");
    }
  };

  return (
    <div>
      <h2>Update Note ID: {grnId}</h2>
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
        <button type="button" onClick={addOrUpdateDetail}>
          {editingIndex !== null ? "Update Detail" : "Add Detail"}
        </button>
        <div>
          <h3>GRN Details</h3>
          <ul>
            {note.grnDetails.map((detail, index) => (
              <li key={index}>
                Product ID: {detail.product.productId}, Quantity:{" "}
                {detail.quantity}
                <button type="button" onClick={() => editDetail(index)}>
                  Edit
                </button>
                <button type="button" onClick={() => deleteDetail(index)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Update Note</button>
      </form>
    </div>
  );
};

export default GrnUpdate;
