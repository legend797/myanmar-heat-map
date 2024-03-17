"use client";
import "../components/map.css";

import React, { useState,useEffect, useRef } from "react";
import L from "leaflet";
import {
  GeoJSON,
  MapContainer,
  useMap,
  TileLayer,
 
  
} from "react-leaflet";
import myanmarGeoJSON from "@/app/assets/state_region.json";
import townshipGeoJSON from '@/app/assets/township2.json';
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
// import "leaflet.heat"; // Import Heatmap Plugin
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
// import HeatmapLayer from "react-leaflet-heatmap-layer";

import heatmapData from '@/app/assets/heatmapdata'

const Map = () => {
  const mapRef = useRef(null);
  const [currentGeoJSON, setCurrentGeoJSON] = useState(myanmarGeoJSON);
 
  
  useEffect(() => {
    const map = mapRef.current;

    const handleZoomEnd = () => {
      const zoomLevel = map.getZoom();
      if (zoomLevel > 5) {
        setCurrentGeoJSON(myanmarGeoJSON);
      } else {
        setCurrentGeoJSON(townshipGeoJSON);
      }
    };

    if (map) {
      map.on('zoomend', handleZoomEnd);

      return () => {
        map.off('zoomend', handleZoomEnd);
      };
    }
  }, []);
  
  const onEachFeatureStateRegion  = (feature, layer) => {
    const map = useMap();
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


  const onEachFeatureTownship  = (feature, layer) => {
    const map = useMap(); // Assuming you're using Leaflet's useMap hook for Next.js
    if (feature.properties && feature.properties.ts_eng) {
        const townshipName = feature.properties.ts_eng;
        
        // Calculate the centroid of the polygon
        const centroid = layer.getBounds().getCenter();

        L.tooltip({
            permanent: true,
            direction: "center",
            className: "map-label",
        })
        .setLatLng(centroid)
        .setContent(townshipName)
        .addTo(map);
    } else {
        // If township name is not available, bind tooltip to layer
        layer
            .bindTooltip("Township Name Not Available", {
                permanent: true,
                direction: "center",
                className: "map-label",
            })
            .openTooltip();
    }
};






  const zoomPropperties = {
    doubleClickZoom: true,
    closePopupOnClick: true,
    dragging: true,
    zoomSnap: true,
    zoomDelta: true,
    trackResize: false,
    touchZoom: false,
    scrollWheelZoom: false,
  };

  

  const heatmapOptions = {
    radius: 25,
    blur: 15,
    maxZoom: 18,
    minOpacity: 0.5,
    maxOpacity: 1,
  };

  return (
    <section className=" pt-[15vh] px-5 sm:px-12 md:px-32 w-full pb-12">
      <div className="flex ">
        <MapContainer
          id="leaflet-container"
          center={[21.9162, 95.956]}
          ref={mapRef}
          zoom={5}
          {...zoomPropperties}
          scrollWheelZoom={false}
          className="h-[60vh] sm:h-[80vh] w-1/2 flex justify-center"
        >
           {currentGeoJSON && (
            <GeoJSON
              data={currentGeoJSON}
              onEachFeature={currentGeoJSON === townshipGeoJSON ? onEachFeatureTownship : onEachFeatureStateRegion}
              style={{
                color: "#2A6AA4",
                weight: "1",
              }}
              whenCreated={mapInstance => {
                mapRef.current = mapInstance;
              }}
            />
          )}
          <HeatmapLayer
            fitBoundsOnLoad
            fitBoundsOnUpdate
            points={heatmapData}
            longitudeExtractor={(m) => m[1]}
            latitudeExtractor={(m) => m[0]}
            intensityExtractor={(m) => parseFloat(m[2])}
            {...heatmapOptions}

            // useLocalExtrema={true}
          />

          {/* <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  /> */}
        </MapContainer>

        
      </div>
    </section>
  );
};

export default Map;


