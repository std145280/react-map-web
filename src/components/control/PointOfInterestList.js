import React, { useState } from "react";
import PopupMsg from "./PopupMsg";
import { Carousel, Card, Table } from "react-bootstrap";
import firebase from "../../firebase";

export default function PointOfInterestList({ poi }) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopupMsg = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const deletePOI = () => {
    const poiRef = firebase.database().ref("pois").child(poi.id);
    poiRef.remove();
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Card style={{ flex: 1 }}>
        <Card.Body>
          <Table striped bordered hover>
            <thead></thead>
            <tbody>
              <tr>
                <td colSpan="2">
                  <b>
                    <center>
                      <Carousel>
                        {poi.imageUrl
                          ? poi.imageUrl.map(({ id, url }) => {
                              return (
                                <Carousel.Item interval={500}>
                                  <div key={id}>
                                    <img
                                      className="d-block w-100"
                                      src={url}
                                      alt=""
                                      width={320}
                                      height={240}
                                    />
                                  </div>
                                </Carousel.Item>
                              );
                            })
                          : ""}
                      </Carousel>
                    </center>
                  </b>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <b>
                    <Card.Title>
                      <center>
                        {" "}
                        <h2>{poi.name}</h2>
                      </center>
                    </Card.Title>
                  </b>
                </td>
              </tr>
              <tr>
                <td>Description: {poi.description}</td>
                <td>Latitude: {poi.latitude}</td>
              </tr>
              <tr>
                <td>Longitude: {poi.longitude}</td>
                <td>Type: {poi.type}</td>
              </tr>
              <tr>
                <td>City: {poi.city}</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan="2">
                  <b>Location:</b> {poi.location}
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer>
          <center>
            <button onClick={togglePopupMsg}>
              <b>Delete</b>
            </button>
          </center>
        </Card.Footer>
      </Card>
      {isOpen && (
        <PopupMsg
          content={
            <>
              <b>Question</b>
              <p>Are you sure you want to delete this POI?</p>
              <center>
                <button
                  className="btn btn-danger btn-lg"
                  type="submit"
                  onClick={deletePOI}
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
    </div>
  );
}
