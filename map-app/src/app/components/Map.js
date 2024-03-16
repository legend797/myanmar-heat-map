"use client";
import React, { useEffect, useRef } from 'react';
import { GeoJSON, MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import myanmarGeoJSON from "@/app/assets/state_region.json";
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import 'leaflet.heat'; // Import Heatmap Plugin

const Map = () => {
	const heatmapData = [
		[21.9162, 95.956]
		// Add your heatmap data here in [lat, lng] format
	  ];
	

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

	const mapRef = useRef(null);
	useEffect(() => {
		const map = mapRef.current;
	
		if (map && heatmapData.length > 0) {
		  // Create heatmap layer
		  const heat = L.heatLayer(heatmapData, { radius: 25 }).addTo(map);
	
		  // Optional: Fit map bounds to heatmap data
		  map.fitBounds(heat.getBounds());
		}
	  }, [heatmapData]);

	 

	return (
    <section className=" pt-[15vh] px-5 sm:px-12 md:px-32 w-full pb-12">
		
		<div className="flex justify-center items-center">
			<MapContainer
				center={[21.9162, 95.956]}
				zoom={5}
				heatmapData={heatmapData}
				{...zoomPropperties}
				scrollWheelZoom={false}
				className="h-[60vh] sm:h-[80vh] w-[500px] flex justify-center"
			>
				<GeoJSON data={myanmarGeoJSON} />
			</MapContainer>
		</div>
		
    </section>
	);
};

export default Map;

{
	/* <Marker  position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker> 

<TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  */
}
