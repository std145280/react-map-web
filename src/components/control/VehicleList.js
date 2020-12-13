import React from "react";
import {
  Card,
  Table,
} from "react-bootstrap";
import firebase from "../../firebase";

export default function VehicleList({ vehicle }) {
  const deleteVehicle = () => {
    const vehicleRef = firebase.database().ref("vehicles").child(vehicle.id);
    vehicleRef.remove();
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
                      {vehicle.imageUrl
                        ? vehicle.imageUrl.map(({ id, url }) => {
                            return (
                              <div key={id}>
                                <img
                                  src={url}
                                  alt=""
                                  width={320}
                                  height={240}
                                />
                              </div>
                            );
                          })
                        : ""}
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
            <button onClick={deleteVehicle}>
              <b>Delete</b>
            </button>
            <button onClick={completeVehicle}>
              <b>toggle availability</b>
            </button>
          </center>
        </Card.Footer>
      </Card>
    </div>
  );
}
