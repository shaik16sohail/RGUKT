import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MapComponent from "../MapComponent";

const CompletedOutpassDetails = () => {
  const { id } = useParams();
  const [outpass, setOutpass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    fetchOutpassDetails();
  }, []);

  const fetchOutpassDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/caretaker/outpasses/completed/${id}`, {
        withCredentials: true,
      });
      const outpassData = res.data.outpassData;
      setOutpass(outpassData);

      // Fetch addresses in bulk
      if (outpassData?.locations?.length) {
        const addressPromises = outpassData.locations.map(loc =>
          getAddressFromCoordinates(loc.latitude, loc.longitude)
        );
        const addressesList = await Promise.all(addressPromises);
        setAddresses(addressesList);
      }
    } catch (err) {
      console.error("Error fetching outpass:", err);
    } finally {
      setLoading(false);
    }
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(`http://localhost:8080/api/reverse-geocode?lat=${latitude}&lon=${longitude}`, {
        credentials: 'include'
      });
      const data = await response.json();
      return data.address || "Unknown location";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Unknown location";
    }
  };

  // Updated background gradient with black mixed in
  const backgroundStyle = {
    background: `
      linear-gradient(90deg, hsla(351, 100%, 25%, 1) 0%, hsla(0, 0%, 0%, 0.7) 30%, hsla(9, 59%, 7%, 1) 70%, hsla(0, 0%, 0%, 0.8) 100%),
      linear-gradient(90deg, hsla(351, 100%, 25%, 1) 0%, hsla(9, 59%, 7%, 1) 100%)
    `,
    minHeight: '100vh'
  };

  const LoadingSpinner = () => (
    <div style={{
      ...backgroundStyle,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid rgba(255, 255, 255, 0.2)',
          borderTop: '4px solid #fff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ fontSize: '18px', fontWeight: '500' }}>Loading outpass details...</p>
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );

  if (loading) return <LoadingSpinner />;
  
  if (!outpass) {
    return (
      <div style={{
        ...backgroundStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '18px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '15px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          ⚠️ Outpass not found
        </div>
      </div>
    );
  }

  return (
    <div style={{
      ...backgroundStyle,
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{
            color: 'white',
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: '700',
            margin: '0 0 1rem 0',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '1.2em' }}>📄</span>
            Completed Outpass Details
          </h2>
        </div>

        {/* Student Information Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)'
        }}>
          <h3 style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '1.5rem',
            textAlign: 'center',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
          }}>
            👤 Student Information
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { label: 'Student Name', value: outpass.studentId?.name, icon: '👨‍🎓' },
              { label: 'Email', value: outpass.studentId?.email, icon: '📧' },
              { label: 'Reason', value: outpass.reason, icon: '📝' },
              { label: 'Destination', value: outpass.destination, icon: '🎯' },
              { label: 'Completed At', value: new Date(outpass.completedAt).toLocaleString(), icon: '⏰' }
            ].map((item, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1.5rem',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.transform = 'translateY(0)';
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <strong style={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    {item.label}:
                  </strong>
                </div>
                <p style={{
                  color: 'white',
                  margin: '0',
                  fontSize: '16px',
                  wordBreak: 'break-word',
                  paddingLeft: '30px'
                }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Location Tracking Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)'
        }}>
          <h3 style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '1.5rem',
            textAlign: 'center',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <span>📍</span>
            Location Tracking Logs (Last 24 Hours)
          </h3>
          
          {outpass.locations && outpass.locations.length > 0 ? (
            <div style={{
              overflowX: 'auto',
              borderRadius: '15px',
              background: 'rgba(255, 255, 255, 0.05)'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: '600px'
              }}>
                <thead>
                  <tr style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                  }}>
                    {['#', 'Latitude', 'Longitude', 'Place Name', 'Timestamp'].map((header, index) => (
                      <th key={index} style={{
                        padding: '1rem',
                        color: 'white',
                        fontWeight: '600',
                        textAlign: 'left',
                        borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
                        fontSize: '14px'
                      }}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {outpass.locations.map((loc, index) => (
                    <tr key={index} style={{
                      background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = index % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.05)';
                    }}>
                      <td style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.9)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        fontWeight: '500'
                      }}>
                        {index + 1}
                      </td>
                      <td style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.8)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        fontFamily: 'monospace'
                      }}>
                        {loc.latitude}
                      </td>
                      <td style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.8)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        fontFamily: 'monospace'
                      }}>
                        {loc.longitude}
                      </td>
                      <td style={{
                        padding: '1rem',
                        color: 'white',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        maxWidth: '200px',
                        wordBreak: 'break-word'
                      }}>
                        {addresses[index] || (
                          <span style={{ 
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontStyle: 'italic'
                          }}>
                            Fetching...
                          </span>
                        )}
                      </td>
                      <td style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.9)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        fontSize: '14px'
                      }}>
                        {new Date(loc.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '18px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '15px',
              border: '2px dashed rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '1rem' }}>📍</div>
              No location data available
            </div>
          )}
        </div>

        {/* Map Section */}
        {outpass.locations && outpass.locations.length > 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '24px',
              fontWeight: '600',
              marginBottom: '1.5rem',
              textAlign: 'center',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <span>🗺️</span>
              Current Location Map
            </h3>
            
            <div style={{
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
              border: '2px solid rgba(255, 255, 255, 0.1)'
            }}>
              <MapComponent 
                latitude={outpass.locations[outpass.locations.length-1].latitude} 
                longitude={outpass.locations[outpass.locations.length-1].longitude}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedOutpassDetails;