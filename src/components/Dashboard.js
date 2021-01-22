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
      var totalTours = 0;
      for (let id in tours) {
        totalTours++;
        tourList.push({ id, ...tours[id] });
        setNumberOfTours(totalTours);
      }

      setTourList(tourList);
    });
  }, []);

  const [numberOfPois, setNumberOfPois] = useState(0);
  const [pointOfInterestList, setPointOfInterestList] = useState();
  useEffect(() => {
    //firebase.analytics().logEvent('/');
    const pointOfInterestRef = firebase.database().ref("poi");
    pointOfInterestRef.on("value", (snapshot) => {
      const pointOfInterest = snapshot.val();
      const pointOfInterestList = [];
      var totalPois = 0;
      for (let id in pointOfInterest) {
        pointOfInterestList.push({ id, ...pointOfInterest[id] });
        totalPois++;
        setNumberOfPois(totalPois);
      }
      setPointOfInterestList(pointOfInterestList);
      console.log(pointOfInterestList);
    });
  }, []);

  const [numberOfVehicles, setNumberOfVehicles] = useState(0);
  const [vehicleList, setVehicleList] = useState();
  useEffect(() => {
    const vehicleRef = firebase.database().ref("vehicle");
    vehicleRef.on("value", (snapshot) => {
      const vehicle = snapshot.val();
      const vehicleList = [];
      var totalVehicles = 0;
      for (let id in vehicle) {
        vehicleList.push({ id, ...vehicle[id] });
        totalVehicles++;
      }
      setNumberOfVehicles(totalVehicles);
      setVehicleList(vehicleList);
    });
  }, []);

  const [allRequest, setAllRequests] = useState(0);
  const [rentRequestList, setRentRequestList] = useState();

  useEffect(() => {
    const rentReqRef = firebase.database().ref("rentRequest");
    rentReqRef.on("value", (snapshot) => {
      const request = snapshot.val();
      const rentRequestList = [];
      var totalRequests = 0;
      for (let id in request) {
        rentRequestList.push({ id, ...request[id] });
        totalRequests++;
      }
      setRentRequestList(rentRequestList);
      setAllRequests(totalRequests);
    });
  }, []);

  const [tourGuideList, setTourGuideList] = useState();
  const [allTourGuides, setAllTourGuides] = useState();
  useEffect(() => {
    const tourGuideRef = firebase.database().ref("tourGuide");
    tourGuideRef.on("value", (snapshot) => {
      const tourGuide = snapshot.val();
      const tourGuideList = [];
      var totalTourGuides = 0;
      for (let id in tourGuide) {
        tourGuideList.push({ id, ...tourGuide[id] });
        totalTourGuides++;
      }
      setTourGuideList(tourGuideList);
      setAllTourGuides(totalTourGuides);
    });
  }, []);

  return (
    <>
      <NavigationBar />
      <div>
        <br />
        <b>Dashboard </b>
        <CardDeck>
          <Card className="dashboardCard" border="primary">
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
            </Card.Body>
            <Card.Footer>
              <button
                className="btn btn-primary w-100 "
                onClick={() => history.push("/Tours")}
              >
                <i className="fa   fa-map-marked-alt"> All Tours</i>
              </button>
              <br />
              <br />

              <button
                className="btn btn-primary w-100"
                type="button"
                onClick={() => history.push("/AddTour")}
              >
                <i className="fa fa-plus"> Add New Tour</i>
              </button>
            </Card.Footer>
          </Card>
          <br />
          <Card className="dashboardCard" border="primary">
            <Card.Header>
              <b>Points Of Interest</b>
            </Card.Header>
            <Card.Body>
              {/*<Card.Title>Browse all available tours</Card.Title>*/}

              <div>
                {`There are `}
                {numberOfPois} {` points of interest. `}
              </div>

              <Card.Text></Card.Text>
            </Card.Body>
            <Card.Footer>
              <button
                className="btn btn-primary w-100 "
                onClick={() => history.push("/PointOfInterest")}
              >
                <i className="fa  fa-map-marker-alt"> All Points</i>
              </button>
              <br />
              <br />
              <button
                className="btn btn-primary w-100"
                onClick={() => history.push("/AddPointOfInterest")}
              >
                <i className="fa fa-plus"> Add New Point</i>
              </button>
              <br />
            </Card.Footer>
          </Card>
          <br />

          <Card className="dashboardCard" border="primary">
            <Card.Header>
              <b>Vehices</b>
            </Card.Header>
            <Card.Body>
              {/*<Card.Title>Browse all available tours</Card.Title>*/}

              <div>
                {`There are `}
                {numberOfVehicles} {` vehicles. `}
              </div>
              <br />

              <Card.Text></Card.Text>
            </Card.Body>
            <Card.Footer>
              <button
                className="btn btn-primary w-100 "
                onClick={() => history.push("/Vehicles")}
              >
                <i className="fa fa-car"> All Vehicles</i>
              </button>
              <br />
              <br />
              <button
                className="btn btn-primary w-100"
                onClick={() => history.push("/AddVehicle")}
              >
                <i className="fa fa-plus"> Add New Vehicle</i>
              </button>
            </Card.Footer>
          </Card>
          <br />

          <Card className="dashboardCard" border="primary">
            <Card.Header>
              <b>Tour Guides</b>
            </Card.Header>
            <Card.Body>
              {/*<Card.Title>Browse all available tours</Card.Title>*/}

              <div>
                {`There are `}
                {allTourGuides} {` Tour Guides. `}
              </div>

              <Card.Text></Card.Text>
            </Card.Body>
            <Card.Footer>
              <button
                className="btn btn-primary w-100 "
                onClick={() => history.push("/TourGuides")}
              >
                <i className="fa fa-users"> All Tour Guides</i>
              </button>
              <br />
              <br />
              <button
                className="btn btn-primary w-100"
                onClick={() => history.push("/AddTourGuide")}
              >
                <i className="fa fa-plus"> Add New Tour Guide</i>
              </button>
            </Card.Footer>
          </Card>

          <Card className="dashboardCard" border="primary">
            <Card.Header>
              <b>Requests</b>
            </Card.Header>
            <Card.Body>
              {/*<Card.Title>Browse all available tours</Card.Title>*/}

              <div>
                {`There are `}
                {allRequest} {` request for tours. `}
              </div>

              <Card.Text></Card.Text>
            </Card.Body>
            <Card.Footer>
              <button
                className="btn btn-primary w-100"
                onClick={() => history.push("/RentRequests")}
              >
                <i className="fas fa-clipboard-list"> All Requests</i>
              </button>
            </Card.Footer>
          </Card>
        </CardDeck>
      </div>
    </>
  );
}
