import React, { useEffect, useState } from "react";
import TrackingService from "../../Api/TrackingService";
import { useNavigate } from "react-router-dom";
import "../Product/Product.css";
import { useAuth } from "../../Context/AuthContext";

const Tracking = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [trackings, setTracking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const trackingsPerPage = 10;

  useEffect(() => {
    fetchTrackings();
  }, []);

  const fetchTrackings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await TrackingService.trackingList();
      console.log("Fetched products:", data);
      if (Array.isArray(data)) {
        setTracking(data);
      } else {
        setError("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // const handleDelete = async (trackingId) => {
  //   try {
  //     if (user.role != "MANAGER") {
  //       alert("You don't have authorization to access this resource!");
  //       navigate("/listTracking");
  //     }
  //     await TrackingService.deleteTracking(trackingId);
  //     fetchTrackings();
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //     setError("Failed to delete product");
  //   }
  // };

  const indexOfLastProduct = currentPage * trackingsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - trackingsPerPage;
  const currenTrackings = trackings.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(trackings.length / trackingsPerPage); i++) {
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
        <h2>Tracking Product</h2>
        {/* <button onClick={() => navigate("/manager/addProduct")}>
          Add Product
        </button> */}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tracking at</th>
            <th scope="col">Product ID</th>
            <th scope="col">Employee ID</th>
            <th scope="col">Quantity DB</th>
            <th scope="col">Quantity on hand</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {currenTrackings.map((tracking) => (
            <tr key={tracking.trackingId}>
              <th>{tracking.trackingId}</th>
              <th>{tracking.trackingAt}</th>
              <td>{tracking.productId}</td>
              <td>{tracking.empId}</td>
              <td>{tracking.quantityDB}</td>
              <td>{tracking.quantityTracking}</td>
              <td>
                <button
                  onClick={() =>
                    navigate(`/staff/history/${tracking.trackingId}`)
                  }
                >
                  History
                </button>
              </td>
              <td>
                <button
                  onClick={() =>
                    navigate(`/staff/updateTracking/${tracking.trackingId}`)
                  }
                >
                  Update
                </button>
              </td>
              {/* <td>
                <button onClick={() => handleDelete(tracking.trackingId)}>
                  Delete
                </button>
              </td> */}
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

export default Tracking;
