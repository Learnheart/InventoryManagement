import React, { useEffect, useState } from "react";
import GrnService from "../../Api/GrnService";
import { useNavigate } from "react-router-dom";
import "./Grn.css";

const GrnList = () => {
  const navigate = useNavigate();
  const [grns, setGrns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const grnsPerPage = 10;

  useEffect(() => {
    fetchGrns();
  }, []);

  const fetchGrns = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await GrnService.grnList();
      console.log("Fetched GRNs:", data);
      if (Array.isArray(data)) {
        setGrns(data);
      } else {
        setError("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching GRNs:", error);
      setError("Failed to fetch GRNs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (grnId) => {
    try {
      await GrnService.deleteGrn(grnId);
      fetchGrns();
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product");
    }
  };

  const handleDetail = (grnId) => {
    navigate(`/grnDetail/${grnId}`);
  };

  const indexOfLastGrn = currentPage * grnsPerPage;
  const indexOfFirstGrn = indexOfLastGrn - grnsPerPage;
  const currentGrns = grns.slice(indexOfFirstGrn, indexOfLastGrn);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(grns.length / grnsPerPage); i++) {
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
        <h1>GRN List</h1>
        <button onClick={() => navigate("/staff/createNote")}>Add note</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Import Date</th>
            <th scope="col">Employee ID</th>
            <th scope="col">Total Price</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {currentGrns.map((grn) => (
            <tr key={grn.grnId}>
              <th>{grn.grnId}</th>
              <td>{grn.importDate}</td>
              <td>{grn.empId}</td>
              <td>{grn.totalPrice.toFixed(2)} VND</td>
              <td>
                <button onClick={() => handleDetail(grn.grnId)}>Detail</button>
              </td>
              <td>
                <button>Update</button>
              </td>
              <td>
                <button onClick={() => handleDelete(grn.grnId)}>Delete</button>
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

export default GrnList;
