import React from 'react';
import Map, { Marker } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

const SAPIENS_LOCATION = {
  latitude: -27.4428,
  longitude: -48.4458,
  zoom: 13
};

export function MapView() {
  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiZW5ncGVkcm8iLCJhIjoiY200OWZmaXdzMDNsazJscHV0a2N3aWs3diJ9.7lQGEsai03ZSSVxwbI5r_Q"
      initialViewState={{
        longitude: SAPIENS_LOCATION.longitude,
        latitude: SAPIENS_LOCATION.latitude,
        zoom: SAPIENS_LOCATION.zoom,
        bearing: 0,
        pitch: 45
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      attributionControl={false}
      reuseMaps
      maxPitch={85}
      minZoom={11}
      maxZoom={16}
    >
      <Marker
        longitude={SAPIENS_LOCATION.longitude}
        latitude={SAPIENS_LOCATION.latitude}
        anchor="bottom"
      >
        <div className="text-primary animate-bounce">
          <MapPin className="w-8 h-8" />
        </div>
      </Marker>
    </Map>
  );
}