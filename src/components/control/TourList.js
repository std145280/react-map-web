import React, { useState, useEffect } from "react";
import { Card, Carousel, Table, CardDeck } from "react-bootstrap";
import PopupMsg from "./PopupMsg";
import firebase from "../../firebase";
import PopupCards from "./PopupForCards";

export default function TourList({ tour }) {
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

  const [isOpen, setIsOpen] = useState(false);
  const togglePopupMsg = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const [isPoisOpen, setIsPoisOpen] = useState(false);
  const togglePoiPopupMsg = (e) => {
    e.preventDefault();
    setIsPoisOpen(!isPoisOpen);
  };

  const oneCard = (el) => {
    for (let i in tour.poi) {
      if (tour.poi[i].id === el.id) {
        return (
          <>
            <center>
              <br />
              <Card className="card-PoIforTourOnPopup" style={{ flex: 1 }}>
                <Card.Body>
                  <div key={el.id}>
                    <Card.Title>
                      <center>
                        <h4>{`${el.name}`}</h4>
                      </center>
                    </Card.Title>
                    <Carousel>
                      {el.imageUrl
                        ? el.imageUrl.map(({ id, url }) => {
                            return (
                              <Carousel.Item interval={500}>
                                <div key={id}>
                                  <img
                                    className="d-block w-100"
                                    src={url}
                                    alt=""
                                    width={320}
                                    height={225}
                                  />
                                </div>
                              </Carousel.Item>
                            );
                          })
                        : ""}
                    </Carousel>
                    <br />
                    <b>City:</b> {el.city} <br />
                    <b>type:</b> {el.type} <br />
                    <br />
                    {/* <b>short decription:</b> {el.description} <br />*/}
                    <b>Decription:</b> {el.descForCustomer} <br />
                    <br />
                    <b>Location:</b> {el.location} <br />
                  </div>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
            </center>
          </>
        );
      }
    }
  };

  const displayCard = () => {
    return (
      <CardDeck>
        {pointOfInterestList
          ? pointOfInterestList.map((el) => oneCard(el))
          : ""}
      </CardDeck>
    );
  };

  const deleteTour = () => {
    const tourRef = firebase.database().ref("tour").child(tour.id);
    tourRef.remove();
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Card className="cardItem" style={{ flex: 1 }}>
        <Card.Body>
          <Table striped bordered hover>
            <thead></thead>
            <tbody>
              <tr>
                <td colSpan="2">
                  <b>
                    <center>
                      <Carousel>
                        {tour.imageUrl
                          ? tour.imageUrl.map(({ id, url }) => {
                              return (
                                <Carousel.Item interval={500}>
                                  <div key={id}>
                                    <img
                                      className="d-block w-100"
                                      src={url}
                                      alt=""
                                      width={320}
                                      height={225}
                                    />
                                  </div>
                                </Carousel.Item>
                              );
                            })
                          : ""}

                        {tour.poi
                          ? tour.poi.map(
                              ({
                                city,
                                decription,
                                geoLat,
                                geoLng,
                                id,
                                imageUrl,
                                name,
                                ticketCost,
                                time,
                                type,
                              }) => {
                                return (
                                  <Carousel.Item interval={500}>
                                    <div key={imageUrl[0].id}>
                                      <img
                                        className="d-block w-100"
                                        src={imageUrl[0].url}
                                        alt=""
                                        width={320}
                                        height={225}
                                      />
                                    </div>
                                    <Carousel.Caption>
                                      <p className="borderText">{name}</p>
                                    </Carousel.Caption>
                                  </Carousel.Item>
                                );
                              }
                            )
                          : ""}
                      </Carousel>
                    </center>
                  </b>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <Card.Title>
                    <center>
                      <h4>{tour.title}</h4>
                    </center>
                  </Card.Title>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <b>Description Customer:</b> {tour.descForCustomer}
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <b>Description Guide:</b> {tour.descForGuide}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Tour Cost:</b> {tour.tourCost} €
                </td>
                <td>
                  <b>Time:</b> {tour.time}'
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer>
          <center>
            <button className="btn btn-danger" onClick={togglePopupMsg}>
              <i className="fa fa-trash-alt"></i>
            </button>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn btn-secondary" onClick={togglePoiPopupMsg}>
              <>
                {`Tour Pois - `}
                <i class="fa fa-map-marker-alt" aria-hidden="true"></i>
              </>
            </button>
          </center>
        </Card.Footer>
      </Card>
      {isOpen && (
        <PopupMsg
          content={
            <>
              <b>Question</b>
              <p>Are you sure you want to delete this tour?</p>
              <center>
                <button
                  className="btn btn-danger btn-lg"
                  type="submit"
                  onClick={deleteTour}
                >
                  {" "}
                  Yes{" "}
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  className="btn btn-warning btn-lg"
                  type="submit"
                  onClick={togglePopupMsg}
                >
                  {" "}
                  No{" "}
                </button>
              </center>
            </>
          }
          handleClose={togglePopupMsg}
        />
      )}
      {isPoisOpen && (
        <PopupCards
          content={
            <>
              <b>Points of Interests</b>
              <div>
                <center>{displayCard()}</center>
              </div>
              <br />
              <center>
                <button
                  className="btn btn-warning btn-lg"
                  type="submit"
                  onClick={togglePoiPopupMsg}
                >
                  {" "}
                  OK{" "}
                </button>
              </center>
            </>
          }
          handleClose={togglePopupMsg}
        />
      )}
    </div>
  );
}
