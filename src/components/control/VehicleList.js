import React, { useState } from "react";
import PopupMsg from "./PopupMsg";
import { Carousel, Card, Table } from "react-bootstrap";
import firebase from "../../firebase";

export default function VehicleList({ vehicle }) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopupMsg = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const deleteVehicle = () => {
    const vehicleRef = firebase.database().ref("vehicles").child(vehicle.id);
    vehicleRef.remove();
    setIsOpen(!isOpen);
  };
  const completeVehicle = () => {
    const vehicleRef = firebase.database().ref("vehicles").child(vehicle.id);
    vehicleRef.update({
      availableForRent: !vehicle.availableForRent,
    });
  };

  return (
    <div>
      <h4 className={vehicle.complete ? "availableForRent" : ""}></h4>

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
                        {vehicle.imageUrl
                          ? vehicle.imageUrl.map(({ id, url }) => {
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
                        <h2>{vehicle.title}</h2>
                      </center>
                    </Card.Title>
                  </b>
                </td>
              </tr>
              <tr>
                <td>Type: {vehicle.type}</td>
                <td>Passengers #: {vehicle.passengers}</td>
              </tr>
              <tr>
                <td>Fuel: {vehicle.fuel}</td>
                <td>Year: {vehicle.year}</td>
              </tr>
              <tr>
                <td>Cost/h: {vehicle.cph}</td>
                <td>Place: {vehicle.place}</td>
              </tr>
              <tr>
                <td colSpan="2">
                  <h3>
                    <center>
                      The vehicle is{" "}
                      <b>
                        {vehicle.availableForRent
                          ? "Available"
                          : "Not Available"}
                      </b>{" "}
                      for rent.
                    </center>
                  </h3>
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
            <button onClick={completeVehicle}>
              <b>toggle availability</b>
            </button>
          </center>
        </Card.Footer>
      </Card>
      {isOpen && (
        <PopupMsg
          content={
            <>
              <b>Question</b>
              <p>Are you sure you want to delete this vehicle?</p>
              <center>
                <button
                  className="btn btn-danger btn-lg"
                  type="submit"
                  onClick={deleteVehicle}
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
