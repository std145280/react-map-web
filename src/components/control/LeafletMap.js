import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import L from "leaflet";
import { carMarkerIcon } from "./Icons";

const height = { height: "100vh" };
const center = { lat: 37.9838, lng: 23.7275 };

var geoLatlng;
var locationString;

class LeafletMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const map = this.leafletMap.leafletElement;
    const geocoder = L.Control.Geocoder.nominatim();
    let marker;

    map.on("click", (e) => {
      geoLatlng = e.latlng;
      geocoder.reverse(
        e.latlng,
        map.options.crs.scale(map.getZoom()),
        (results) => {
          var r = results[0];
          if (r) {
            if (marker) {
              marker
                .setLatLng(r.center, { icon: carMarkerIcon })
                .setPopupContent(r.html || r.name)
                .openPopup();
              this.props.setPlaceName(r.name);
            } else {
              marker = L.marker(r.center, { icon: carMarkerIcon })
                .bindPopup(r.name)
                .addTo(map)
                .openPopup();
              this.props.setPlaceName(r.name);
            }
          }
        }
      );
    });
  }

  render() {
    return (
      <Map
        style={height}
        center={center}
        zoom={12}
        maxZoom={17}
        ref={(m) => {
          this.leafletMap = m;
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    );
  }
}

export default { LeafletMap, geoLatlng, locationString };
