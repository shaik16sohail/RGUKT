// MapComponent.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ latitude, longitude }) => {
  if (!latitude || !longitude) return <p>Coordinates not available</p>;

  return (
    <div style={{ height: '400px', width: '100%', margin: '20px 0' }}>
      <MapContainer center={[latitude, longitude]} zoom={15} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            Student Current Location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
