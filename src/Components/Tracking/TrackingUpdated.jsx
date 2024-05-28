import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TrackingService from "../../Api/TrackingService"; // Adjust the import based on your project structure
import { toast } from "react-toastify";

const TrackingUpdate = () => {
  const { trackingId } = useParams();
  const navigate = useNavigate();
  const [tracking, setTracking] = useState({
    quantityTracking: 0,
  });

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const response = await TrackingService.getTrackingById(trackingId);
        setTracking({
          quantityTracking: response.data.quantityTracking,
        });
      } catch (error) {
        toast.error("Failed to fetch tracking details");
      }
    };
    fetchTracking();
  }, [trackingId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTracking({
      ...tracking,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await TrackingService.updateTracking(
        trackingId,
        tracking
      );
      if (response.status === 200) {
        toast.success("Tracking updated successfully");
        navigate("/listTracking");
      } else {
        toast.error("Failed to update tracking");
      }
    } catch (error) {
      toast.error("Error updating tracking");
    }
  };

  return (
    <div>
      <h2>Update Tracking ID: {trackingId}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Quantity Tracking</label>
          <input
            type="number"
            name="quantityTracking"
            value={tracking.quantityTracking}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Update Tracking</button>
      </form>
    </div>
  );
};

export default TrackingUpdate;
