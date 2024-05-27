import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GrnService from "../../Api/GrnService";
import "./Grn.css";

const GrnDetail = () => {
  const { grnId } = useParams();
  const [grn, setGrn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrnDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await GrnService.getNoteById(grnId);
        setGrn(response.data);
      } catch (error) {
        console.error("Error fetching GRN detail:", error);
        setError("Failed to fetch GRN detail");
      } finally {
        setLoading(false);
      }
    };
    fetchGrnDetail();
  }, [grnId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!grn) {
    return <div>No GRN found</div>;
  }

  return (
    <div>
      <h2>GRN Detail</h2>
      <div>ID: {grn.grnId}</div>
      <div>Import Date: {grn.importDate}</div>
      <div>Created by: {grn.empId}</div>
      <div>Total Price: {grn.totalPrice.toFixed(2)} VND</div>
      <h3>Details:</h3>
      <table className="table pr-5">
        <thead>
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Category</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {grn.grnDetails.map((detail) => (
            <tr key={detail.grnDetailId}>
              <td>{detail.product.productName}</td>
              <td>{detail.product.category}</td>
              <td>{detail.quantity}</td>
              <td>{detail.price.toFixed(2)} VND</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrnDetail;
