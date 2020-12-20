import React, { useState } from "react";
import { Card, Carousel } from "react-bootstrap";
import PopupMsg from "./PopupMsg";
import firebase from "../../firebase";

export default function TourList({ tour }) {

  const [isOpen, setIsOpen] = useState(false);

  const togglePopupMsg = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const deleteTour = () => {
    const tourRef = firebase.database().ref("tour").child(tour.id);
    tourRef.remove();
    setIsOpen(!isOpen);
  };


    return (
      <div>
        <Card className="card-PoIforTourOnPopup" style={{ flex: 1 }}>
          <Card.Body>
            <div key={tour.id}>
              <Card.Title>
                <center>
                  <h4>{`${tour.title}`}</h4>          
                </center>
              </Card.Title>
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
                {/* //>>>>>>>>>>></Carousel>EXTRA CAROUSEL ITEMS*/}
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
                {/*} /<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
              </Carousel>
              <br />
              
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
                    
          
                      }
                    )
                  : ""}
              {` ${tour.descForCustomer}`} <br />
              {` ${tour.tourCost}`} <br />
              {`  decription: ${tour.decription}`} <br />
              {`  location: ${tour.location}`} <br />
            </div>
          </Card.Body>
          <Card.Footer>
          <center>
            <button className="btn btn-danger" onClick={togglePopupMsg}>
              <i className="fa fa-trash-alt"></i>
            </button>
           y


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

      </div>
    );
}