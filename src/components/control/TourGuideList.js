import React from "react";
import { Card, Table } from "react-bootstrap";
import firebase from "../../firebase";


export default function tourGuideList({ tourGuide }) {
  const deletetourGuide = () => {
    const tourGuideRef = firebase.database().ref("tourGuide").child(tourGuide.id);
    tourGuideRef.remove();
  };
  const completetourGuide = () => {
    const tourGuideRef = firebase.database().ref("tourGuide").child(tourGuide.id);
    tourGuideRef.update({
      availableForHire: !tourGuide.availableForHire,
    });
  };
  return (
    <div>
      <h4 className={tourGuide.complete ? "availableForHire" : ""}></h4>

      <Card style={{ flex: 1 }}>
        <Card.Body>
          <Table striped bordered hover>
            <thead></thead>
            <tbody>
              <tr>
                <td colSpan="2">
                  <b>
                    <center>
                      <Card.Img variant="top" src='imageTourGuide' />
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
                        <h2>{tourGuide.name}</h2>
                      </center>
                    </Card.Title>
                  </b>
                </td>
              </tr>
              <tr>
                <td>age: {tourGuide.age}</td>
                <td>experience: {tourGuide.experience}</td>
              </tr>
              <tr>
                <td>carDrivingLicences: {tourGuide.carDrivingLicences}</td>
                <td>address: {tourGuide.address}</td>
              </tr>
              <tr>
                <td>telephone: {tourGuide.telephone}</td>
                <td>email: {tourGuide.email}</td>
              </tr>
              <tr>
                <td colSpan="2">
                  <h3>
                    <center>
                      The tourGuide is{" "}
                      <b>
                        {tourGuide.availableForHire
                          ? "Available"
                          : "Not Available"}
                      </b>{" "}
                      for Hire.
                    </center>
                  </h3>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer>
          <center>
            <button onClick={deletetourGuide}>
              <b>Delete</b>
            </button>
            <button onClick={completetourGuide}>
              <b>toggle availability</b>
            </button>
          </center>
        </Card.Footer>
      </Card>
    </div>
  );
}
