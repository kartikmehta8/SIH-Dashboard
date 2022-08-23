// https://www.npmjs.com/package/google-maps-react

// Go to Google Cloud Console and enable Maps API javascript.
//Then go to credentials and enable credentials.
// Create a .env file and create a variable REACT_APP_API_KEY = <API_KEY>

import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                initialCenter={{
                    lat: 40.854885,
                    lng: -88.081807,
                }}
                zoom={15}
                onClick={this.onMapClicked}
            >
                <Marker
                    onClick={this.onMarkerClick}
                    name={"Current location"}
                />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        {/* <h1>{this.state.selectedPlace.name}</h1> */}
                        <h1>DEMO PLACE</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY,
})(MapContainer);
