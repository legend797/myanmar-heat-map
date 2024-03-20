"use client";
import "../components/map.css";

import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import { GeoJSON, MapContainer, useMap, TileLayer } from "react-leaflet";
import myanmarGeoJSON from "@/app/assets/state_region.json";
import townshipGeoJSON from "@/app/assets/township2.json";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS


const SetBounds = ({ geoJsonData }) => {
  const map = useMap();
  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.ST) {
      if (feature.properties.ST === "Tanintharyi") {
        L.tooltip({
          permanent: true,
          direction: "center",
          className: "map-label",
        })
          .setLatLng([12.0825, 98.6586])
          .setContent("Tanintharyi")
          .addTo(map);
      } else if (feature.properties.ST === "Yangon") {
        L.tooltip({
          permanent: true,
          direction: "center",
          className: "map-label",
        })
          .setLatLng([16.8661, 96.1951])
          .setContent("Yangon")
          .addTo(map);
      } else {
        layer
          .bindTooltip(feature.properties.ST, {
            permanent: true,
            direction: "center",
            className: "map-label",
          })
          .openTooltip();
      }
    }
  };
  useEffect(() => {
    const layer = new L.GeoJSON(geoJsonData, {
      
      onEachFeature,
    });

    const bounds = layer.getBounds();
    map.fitBounds(bounds);
    map.setMaxZoom(16);
    map.setMinZoom(4);
  }, [map, geoJsonData]);

  return (
    <GeoJSON
      data={geoJsonData}
      onEachFeature={onEachFeature}
      style={{
        color: "#2A6AA4",
        weight: "1",
      }}
    />
  ); 
};

const DataMap = () => {
  const zoomPropperties = {
    doubleClickZoom: true,
    closePopupOnClick: true,
    dragging: false,
    zoomSnap: true,
    zoomDelta: true,
    trackResize: false,
    touchZoom: false,
    scrollWheelZoom: false,
  };

  return (
    <div className="flex">
      <MapContainer
        zoom={10}
        {...zoomPropperties}
        className="h-[60vh] sm:h-[80vh] w-1/2 flex justify-center items-center"
      >
        <SetBounds geoJsonData={myanmarGeoJSON} />
      </MapContainer>
    </div>
  );
};
export default DataMap;
