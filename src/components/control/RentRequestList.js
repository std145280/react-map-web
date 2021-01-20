import React, { useState } from "react";
import PopupMsg from "./PopupMsg";
import { Card, Table } from "react-bootstrap";
import firebase from "../../firebase";

export default function RentRequestList({ request }) {

    const [isOpen, setIsOpen] = useState(false);

    const togglePopupMsg = (e) => {
      e.preventDefault();
      setIsOpen(!isOpen);
      if (!isOpen) {
        window.ga("send", {
          hitType: "event",
          eventCategory: "RentRequest",
          eventAction: "click",
          eventLabel: Date().toLocaleString() + " - Open popup msg",
        });
      } 
    };
  
    const deleteRentRequest = () => {
      const rentReqRef = firebase.database().ref("rentRequest").child(request.id);
      rentReqRef.remove();
      setIsOpen(!isOpen);
      window.ga("send", {
        hitType: "event",
        eventCategory: "RentRequest",
        eventAction: "click",
        eventLabel: Date().toLocaleString() + " - Delete request",
      });
    };

    const changeReady = () => {
      const rentReqRef = firebase.database().ref("rentRequest").child(request.id);
      if (request.status=='Accepted'){  
      rentReqRef.update({
          status: 'Ready'});
          window.ga("send", {
            hitType: "event",
            eventCategory: "RentRequest",
            eventAction: "click",
            eventLabel: Date().toLocaleString() + " - Request status: Ready",
          });
        }
      else {
      rentReqRef.update({
          status: 'Accepted'});
          window.ga("send", {
            hitType: "event",
            eventCategory: "RentRequest",
            eventAction: "click",
            eventLabel: Date().toLocaleString() + " - Request status: Accepted",
          });
        
      };

    };



    function ReadyButton(){
      if (request.isAccepted){
        return <button className="btn btn-success"  onClick={changeReady}> 
                <i className ="fas fa-check"></i>
               </button>
      } else {
        return <button className="btn btn-success" disabled>
                <i className ="fas fa-check"></i>
               </button>
      };
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
                <center>
                <b>Car:</b> {request.selectedCarTitle}
                </center>
              </td>
              </tr>
              <tr>
              <td colSpan="2">
                <center>
                <b>Start Location: </b> {request.startLocationName} 
  
                </center>
                </td>
              </tr>
              <tr>
              <td colSpan="2">
                <center>
                <b>Finish Location: </b> {request.finishLocationName}
                </center>
                </td>
              </tr>
              <tr>
                  <td>
                    <center>
                      <b>Requested by: </b> {request.user}
                    </center>

                  </td>
                  <td>
                    <center>
                      <b>Total Cost: </b> {request.totalCost}
                    </center>
                  </td>
              </tr>
              <tr>
                <td colspan="2">
                    <b>Status: </b> {request.status}
                </td>
              </tr>
              <tr>
                <td colspan="2">
                    <b>Assigned to: </b> {request.assignedTourGuide}
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
            <button className="btn btn-danger" onClick={togglePopupMsg}>
              <i className = "fa fa-trash-alt"></i>
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;          
            <ReadyButton/>
        </center>
        </Card.Footer>
      </Card>
      {isOpen && (
        <PopupMsg
          content={
            <>
              <b>Question</b>
              <p>Are you sure you want to delete this rent request?</p>
              <center>
                <button
                  className="btn btn-danger btn-lg"
                  type="submit"
                  onClick={deleteRentRequest}
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
