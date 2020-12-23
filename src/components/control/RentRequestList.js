import React, { useState } from "react";
import { Card, Table } from "react-bootstrap";
import firebase from "../../firebase";

export default function RentRequestList({ request }) {


  const assign = () => {
    const rentReqRef = firebase.database().ref("rentRequest").child(request.id);
    rentReqRef.update({
      isAccepted: true,
    });
  };

  const unassign = () => {
    const rentReqRef = firebase.database().ref("rentRequest").child(request.id);
    rentReqRef.update({
      isAccepted: false,
    });
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
                     <b>Request Id:</b> {request.id}
                    </center>
                  </b>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <Card.Title>
                    <center>
                    <b>Tour: </b> {request.selectedTourTitle}
                    </center>
                  </Card.Title>
                </td>
              </tr>
              <tr>
              <td colSpan="2">
                <b>Car:</b> {request.selectedCarTitle}
                </td>
              </tr>
              <tr>
                <td>
                 <b>Start Location: </b> {request.startLocationName} 
                </td>
                <td>
                 <b>Finish Location: </b> {request.finishLocationName}
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <center>
                    {request.isAccepted ? (
                      <b style={{ color: "green" }}>Assigned</b>
                    ) : (
                      <b style={{ color: "red" }}>Unassigned</b>
                    )}{" "}
                  </center>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer>
          <center>
            <button className="btn btn-danger" onClick={unassign}>
              <b>Unassign</b>
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <button className="btn btn-success" onClick={assign}>
              <b>Assign</b>
            </button>
          </center>
        </Card.Footer>
      </Card>
    </div>
  );
}
