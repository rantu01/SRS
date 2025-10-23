import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import PropTypes from "prop-types";

// ✅ Import icons properly for Vite
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const ServiceMap = ({ services, center = [23.8103, 90.4125], zoom = 6 }) => {
  if (!services || services.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-4">
        No services available to display on the map.
      </p>
    );
  }

  return (
    <div className="w-full h-96 md:h-[500px] rounded-lg shadow-md overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        {/* Base Map */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Markers */}
        {services.map((service) => (
          <Marker key={service.id} position={[service.lat, service.lng]}>
            <Popup>
              <div className="space-y-1">
                <h3 className="font-bold text-gray-800">{service.name}</h3>
                <p className="text-gray-600">{service.location}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

ServiceMap.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      location: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
    })
  ).isRequired,
  center: PropTypes.array,
  zoom: PropTypes.number,
};

export default ServiceMap;
