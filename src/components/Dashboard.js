import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import firebase from "../firebase";
import { CardDeck, Card, Button, Carousel } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function Dashboard() {
  const history = useHistory();

  const [numberOfTours, setNumberOfTours] = useState(0);
  const [tourList, setTourList] = useState();
  useEffect(() => {
    const tourRef = firebase.database().ref("tour");
    tourRef.on("value", (snapshot) => {
      const tours = snapshot.val();
      const tourList = [];
      var i = 0;
      for (let id in tours) {
        i++;
        tourList.push({ id, ...tours[id] });
        setNumberOfTours(i);
      }

      setTourList(tourList);
    });
  }, []);

  const [pointOfInterestList, setPointOfInterestList] = useState();
  useEffect(() => {
    const pointOfInterestRef = firebase.database().ref("poi");
    pointOfInterestRef.on("value", (snapshot) => {
      const pointOfInterest = snapshot.val();
      const pointOfInterestList = [];
      for (let id in pointOfInterest) {
        pointOfInterestList.push({ id, ...pointOfInterest[id] });
      }
      setPointOfInterestList(pointOfInterestList);
      console.log(pointOfInterestList);
    });
  }, []);

  const [vehicleList, setVehicleList] = useState();
  useEffect(() => {
    const vehicleRef = firebase.database().ref("vehicle");
    vehicleRef.on("value", (snapshot) => {
      const vehicle = snapshot.val();
      const vehicleList = [];
      for (let id in vehicle) {
        vehicleList.push({ id, ...vehicle[id] });
      }
      setVehicleList(vehicleList);
    });
  }, []);

  return (
    <>
      <NavigationBar />
      <div>
        <br />
        <b>Dashboard </b>
        <CardDeck>
          <Card border="secondary">
            <Card.Header>
              <b>Tours</b>
            </Card.Header>
            <Card.Body>
              {/*<Card.Title>Browse all available tours</Card.Title>*/}

              <div>
                {`There are `}
                {numberOfTours} {` tours. `}
              </div>

              <Card.Text></Card.Text>
              <Button onClick={() => history.push("/Tours")}>View all Tours</Button>
            </Card.Body>
          </Card>
        </CardDeck>
      </div>
    </>
  );
}
