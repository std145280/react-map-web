import L from 'leaflet';
import simpleMarker from "../../images/marker-icon.png"

const markerIcon = L.icon({
    iconUrl: simpleMarker,
    iconAnchor: [5, 25],
    popupAnchor: [5, -20],
    iconSize: [25, 25],
  });

  export { markerIcon };