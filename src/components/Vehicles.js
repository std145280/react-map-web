import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import firebase from "../firebase";
import VehicleList from "./control/VehicleList";
import { CardDeck } from "react-bootstrap";

export default function Vehicles() {
  const [vehicleList, setVehicleList] = useState();

  useEffect(() => {
    const vehicleRef = firebase.database().ref("vehicles");
    vehicleRef.on("value", (snapshot) => {
      const vehicles = snapshot.val();
      const vehicleList = [];
      for (let id in vehicles) {
        vehicleList.push({ id, ...vehicles[id] });
      }
      setVehicleList(vehicleList);
    });
  }, []);

  return (
    <>
      <NavigationBar />
      <div>
        <h2> Available Vehicles </h2>

        <CardDeck>
          <center>
            {vehicleList
              ? vehicleList.map((vehicle, index) => (
                  <VehicleList vehicle={vehicle} key={index} />
                ))
              : ""}
          </center>
        </CardDeck>
      </div>
    </>
  );
}
