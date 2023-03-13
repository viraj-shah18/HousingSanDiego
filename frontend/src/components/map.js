import React from "react";
import GoogleMapReact from 'google-map-react';
import data from '../keys/google_maps_api_key.json'
import Marker from "./marker";
import MapPopup from './mapPopup'


export default function LaJollaMap({marks}){
  const defaultProps = {
    center: {
      lat: 32.842674,
      lng: -117.257767
    },
    zoom: 13
  };

  const [popupInfo , setPopupInfo] = React.useState(); 
  const [open,setOpen ] = React.useState(); 
  const [miles,setMiles ] = React.useState(); 
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: data.key }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >

        {/* TODO: LOOP THROUGH FLATS AND GET ALL PINS ON MAP WITH THEIR NAME */}

        {marks.map((mark, index) => 
                                  { return <Marker 
                                        key={index} 
                                        lat={mark.latitude} 
                                        lng={mark.longitude}
                                        name={mark.name}
                                        color="blue"    

                                        onClick={() => {
                                                        setPopupInfo(mark.property)
                                                        setOpen(true)
                                                        setMiles(mark.property_miles)
                                                      }
                                                    }
                                        />
                                  }
                                        )}                                        
      {popupInfo && (<MapPopup data={popupInfo} open_flag={open} setOpen={setOpen} miles={miles}/>)}
      </GoogleMapReact>
      

    </div>
  );
}

