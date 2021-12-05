import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
require("dotenv").config();
const googleMapsKey = process.env.GOOGLE_MAPS_KEY;

const containerStyle = {
  width: "400px",
  height: "400px",
};

function GoogleMaps(props) {
  // set google maps center to the first coordinates on the list
  // else set at google HQ
  let center;
  const googleMapMarkers = [];

  if (props.providerCoordinates.length > 0) {
    center = {
      lat: props.providerCoordinates[0].lat,
      lng: props.providerCoordinates[0].lng,
    };
  } else {
    center = {
      lat: 37.423021,
      lng: -122.083739,
    };
  }

  props.providerCoordinates.forEach((coordinate, index) => {
    console.log(index+1);
    googleMapMarkers.push(
      <Marker label={`${index+1}`} position={{ lat: coordinate.lat, lng: coordinate.lng }} />
    );
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapsKey,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {googleMapMarkers}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default GoogleMaps;
