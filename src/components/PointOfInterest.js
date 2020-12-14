import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import firebase from "../firebase";
import PointOfInterestList from "./control/PointOfInterestList";
import { CardDeck } from "react-bootstrap";

export default function PointOfInterest() {
  const [pointOfInterestList, setPointOfInterestList] = useState();

  useEffect(() => {
    const pointOfInterestRef = firebase.database().ref("pois");
    pointOfInterestRef.on("value", (snapshot) => {
      const pointOfInterest = snapshot.val();
      const pointOfInterestList = [];
      for (let id in pointOfInterest) {
        pointOfInterestList.push({ id, ...pointOfInterest[id] });
      }
      setPointOfInterestList(pointOfInterestList);
    });
  }, []); 

    return (
        <>
          <NavigationBar />
          <div>
        <h2> All Points of Interest</h2>

        <CardDeck>
          <center>
            {pointOfInterestList
              ? pointOfInterestList.map((poi, index) => (
                  <PointOfInterestList poi={poi} key={index} />
                ))
              : ""}
          </center>
        </CardDeck>
      </div>
    </>
  );
}




