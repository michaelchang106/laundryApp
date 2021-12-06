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
    googleMapMarkers.push(
      <Marker
        label={`${index + 1}`}
        position={{ lat: coordinate.lat, lng: coordinate.lng }}
      />
    );
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapsKey,
  });

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {googleMapMarkers}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default GoogleMaps;
