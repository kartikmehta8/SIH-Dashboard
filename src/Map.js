// https://www.npmjs.com/package/google-maps-react

// Go to Google Cloud Console and enable Maps API javascript.
//Then go to credentials and enable credentials.
// Create a .env file and create a variable REACT_APP_API_KEY = <API_KEY>

import _ from "lodash";
import React from "react";
import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

const MyMapComponent = compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyBqRIMbYtfo6i0eNVbQ6myB1MNiA6_DVSw&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
    </GoogleMap>
));

const enhance = _.identity;

const ReactGoogleMaps = () => [<MyMapComponent key="map" />];

export default enhance(ReactGoogleMaps);
