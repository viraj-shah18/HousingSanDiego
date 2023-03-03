import React from "react";
import GoogleMapReact from 'google-map-react';
import data from '../keys/google_maps_api_key.json'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function LaJollaMap(){
  const defaultProps = {
    center: {
      lat: 32.842674,
      lng: -117.257767
    },
    zoom: 13
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: data.key }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={32.842674}
          lng={-117.257767}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}

