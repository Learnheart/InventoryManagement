import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TrackingService from "../../Api/TrackingService";

const TrackingHistory = () => {
  const { trackingId } = useParams();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrackingHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await TrackingService.trackingHistory(trackingId);
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching tracking history:", error);
        setError("Failed to fetch tracking history");
      } finally {
        setLoading(false);
      }
    };
    fetchTrackingHistory();
  }, [trackingId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="header">
        <h2>Tracking History for Tracking ID: {trackingId}</h2>
        <button onClick={() => navigate("/listTracking")}>
          Back to Tracking List
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            {/* <th scope="col">History ID</th> */}
            <th scope="col">Changed At</th>
            <th scope="col">Product ID</th>
            <th scope="col">Old Quantity</th>
            <th scope="col">New Quantity</th>
            <th scope="col">Employee ID</th>
          </tr>
        </thead>
        <tbody>
          {history.map((record) => (
            <tr key={record.id}>
              {/* <th>{record.id}</th> */}
              <th>{new Date(record.changeAt).toLocaleString()}</th>
              <td>{record.productId}</td>
              <td>{record.oldQuantityDB}</td>
              <td>{record.newQuantityDB}</td>
              <td>{record.empId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackingHistory;
