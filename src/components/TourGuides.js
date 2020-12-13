import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import firebase from "../firebase";
import TourGuideList from "./control/TourGuideList";
import { CardDeck } from "react-bootstrap";

export default function TourGuides() {
  const [tourGuideList, setTourGuideList] = useState();

  useEffect(() => {
    const tourGuideRef = firebase.database().ref("tourGuides");
    tourGuideRef.on("value", (snapshot) => {
      const tourGuides = snapshot.val();
      const tourGuideList = [];
      for (let id in tourGuides) {
        tourGuideList.push({ id, ...tourGuides[id] });
      }
      setTourGuideList(tourGuideList);
    });
  }, []);

  return (
    <>
      <NavigationBar />
      <div>
        <h2> Available Tour Guides </h2>

        <CardDeck>
          <center>
            {tourGuideList
              ? tourGuideList.map((tourGuide, index) => (
                  <TourGuideList tourGuide={tourGuide} key={index} />
                ))
              : ""}
          </center>
        </CardDeck>
      </div>
    </>
  );
}
