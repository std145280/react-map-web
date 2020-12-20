import React, { useState, useEffect } from "react";
import { CardDeck, Card, Carousel } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import firebase from "../firebase";

export default function Tours() {
  const [tourList, setTourList] = useState();

  useEffect(() => {
    const tourRef = firebase.database().ref("tour");
    tourRef.on("value", (snapshot) => {
      const tours = snapshot.val();
      const tourList = [];
      for (let id in tours) {
        tourList.push({ id, ...tours[id] });
      }
      setTourList(tourList);
    });
  }, []);

  const oneCard = (el) => {

    return (
      <>
        <Card className="card-PoIforTourOnPopup" style={{ flex: 1 }}>
          <Card.Body>
            <div key={el.id}>
              <Card.Title>
                <center>
                  <h4>{`${el.title}`}</h4>          
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
                {/* //>>>>>>>>>>></Carousel>EXTRA CAROUSEL ITEMS*/}
                {el.poi
                  ? el.poi.map(
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
              
              {el.poi
                  ? el.poi.map(
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
              {` ${el.descForCustomer}`} <br />
              {` ${el.tourCost}`} <br />
              {`  decription: ${el.decription}`} <br />
              {`  location: ${el.location}`} <br />
            </div>
          </Card.Body>
          <Card.Footer>
            <center>DEL</center>
          </Card.Footer>
        </Card>
      </>
    );
  };

  const displayCard = () => {
    return (
      <CardDeck>{tourList ? tourList.map((el) => oneCard(el)) : ""}</CardDeck>
    );
  };

  return (
    <>
      <NavigationBar />
      <div>
        <br />
        <b>Tours {`>`} All Tours </b>

        <CardDeck>{displayCard()}</CardDeck>
      </div>
    </>
  );
}
