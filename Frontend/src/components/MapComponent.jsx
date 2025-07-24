import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ latitude, longitude }) => {
  if (!latitude || !longitude) {
    return (
      <div style={{
        height: '400px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.1rem',
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📍</div>
          <p style={{ margin: '0', opacity: '0.8' }}>Coordinates not available</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      height: '450px',
      width: '100%',
      margin: '0',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      position: 'relative'
    }}>
      {/* Map Header */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        right: '10px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.9rem',
        fontWeight: 'bold'
      }}>
        <span style={{ fontSize: '1.2rem' }}>📍</span>
        Student's Last Known Location
      </div>

      {/* Coordinates Display */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        padding: '0.5rem 0.75rem',
        borderRadius: '6px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        fontSize: '0.8rem',
        fontFamily: 'monospace'
      }}>
        <div>Lat: {latitude.toFixed(6)}</div>
        <div>Lng: {longitude.toFixed(6)}</div>
      </div>

      <MapContainer 
        center={[latitude, longitude]} 
        zoom={15} 
        style={{ 
          height: '100%', 
          width: '100%',
          borderRadius: '12px'
        }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            <div style={{
              padding: '0.5rem',
              textAlign: 'center',
              minWidth: '150px'
            }}>
              <div style={{
                fontSize: '1.5rem',
                marginBottom: '0.5rem'
              }}>🎓</div>
              <strong style={{
                display: 'block',
                marginBottom: '0.25rem',
                fontSize: '0.9rem'
              }}>
                Student Current Location
              </strong>
              <div style={{
                fontSize: '0.7rem',
                color: '#666',
                fontFamily: 'monospace'
              }}>
                {latitude.toFixed(4)}, {longitude.toFixed(4)}
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;