/* MICHAEL CHANG */
import { React, useRef, useEffect } from "react";
import GoogleMapReact from "google-map-react";
require("dotenv").config();

function Deleter() {
  // Ugly hack to make google maps pass the axe audit
  const mapRef = useRef();
  useEffect(() => {
    console.log("ref", mapRef.current);

    try {
      mapRef.current.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.removeAttribute(
        "aria-roledescription"
      );
      console.log("removing aria-roledescription", mapRef.current);
    } catch (er) {
      console.log("deleter failed, maybe the map wasn't ready?", er);
    }
  }, []);

  return <div ref={mapRef}></div>;
}

function GoogleMap(props) {
  const googleMapMarkers = [];
  let defaultProps;

  if (props.providerCoordinates.length > 0) {
    defaultProps = {
      center: {
        lat: props.providerCoordinates[0].lat,
        lng: props.providerCoordinates[0].lng,
      },
      zoom: 11,
    };
  } else {
    defaultProps = {
      center: {
        lat: 37.423021,
        lng: -122.083739,
      },
      zoom: 11,
    };
  }

  const Marker = (props) => (
    <div
      style={{
        color: "black",
        background: "red",
        padding: "5px",
        display: "inline-flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "100%",
      }}
    >
      {props.index}
    </div>
  );

  props.providerCoordinates.forEach((coordinate, index) => {
    googleMapMarkers.push(
      <Marker
        index={`${index + 1}`}
        lat={coordinate.lat}
        lng={coordinate.lng}
      />
    );
  });

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "400px", width: "400px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
        center={defaultProps.center}
        zoom={defaultProps.zoom}
      >
        {googleMapMarkers}
        <Deleter />
      </GoogleMapReact>
    </div>
  );
}

export default GoogleMap;
