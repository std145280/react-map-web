import React, { useState } from "react";
import PopupMsg from "./PopupMsg";
import { Carousel, Card, Table } from "react-bootstrap";
import firebase from "../../firebase";

export default function TourGuideList({ tourGuide }) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopupMsg = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const deletetourGuide = () => {
    const tourGuideRef = firebase
      .database()
      .ref("tourGuide")
      .child(tourGuide.id);
    tourGuideRef.remove();
    setIsOpen(!isOpen);
  };
  const completetourGuide = () => {
    const tourGuideRef = firebase
      .database()
      .ref("tourGuide")
      .child(tourGuide.id);
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
                      <Carousel>
                        {tourGuide.imageUrl
                          ? tourGuide.imageUrl.map(({ id, url }) => {
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
                        <h2>{tourGuide.name}</h2>
                      </center>
                    </Card.Title>
                  </b>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Age:</b> {tourGuide.age}
                </td>
                <td>
                  <b>Experience:</b> {tourGuide.experience}
                </td>
              </tr>
              <tr>
                <td>
                  <b>License:</b> {tourGuide.carDrivingLicences}
                </td>
                <td>
                  <b>Address:</b> {tourGuide.address}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Tel.:</b> {tourGuide.telephone}
                </td>
                <td>
                  <b>Email:</b> {tourGuide.email}
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                <b>Address:</b> {tourGuide.address}
                </td>
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
            <button onClick={togglePopupMsg}>
              <b>Delete</b>
            </button>
            <button onClick={completetourGuide}>
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
              <p>Are you sure you want to delete this tour guide?</p>
              <center>
                <button
                  className="btn btn-danger btn-lg"
                  type="submit"
                  onClick={deletetourGuide}
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
