import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import "bootstrap/dist/css/bootstrap.min.css"
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import './styles.css'

import ReactGA from 'react-ga';
ReactGA.initialize('G-2L4RNRB6BT');
ReactGA.pageview(window.location.pathname + window.location.search);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
