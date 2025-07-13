import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CompletedOutpassDetails = () => {
  const { id } = useParams(); // id from URL
  const [outpass, setOutpass] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOutpassDetails();
  }, []);

  const fetchOutpassDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/caretaker/outpasses/completed/${id}`,{
        withCredentials:true,
      });
      setOutpass(res.data.outpassData);
    } catch (err) {
      console.error("Error fetching outpass:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!outpass) return <p>Outpass not found.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📄 Completed Outpass Details</h2>

      <div style={{ marginBottom: "1.5rem" }}>
        <p><strong>Student Name:</strong> {outpass.studentId?.name}</p>
        <p><strong>Email:</strong> {outpass.studentId?.email}</p>
        <p><strong>Reason:</strong> {outpass.reason}</p>
        <p><strong>Destination:</strong> {outpass.destination}</p>
        <p><strong>Completed At:</strong> {new Date(outpass.completedAt).toLocaleString()}</p>
      </div>

      <h3>📍 Location Tracking Logs (Last 24 Hours)</h3>
      {outpass.locations && outpass.locations.length > 0 ? (
        <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {outpass.locations.map((loc, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{loc.latitude}</td>
                <td>{loc.longitude}</td>
                <td>{new Date(loc.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No location data available.</p>
      )}
    </div>
  );
};

export default CompletedOutpassDetails;
