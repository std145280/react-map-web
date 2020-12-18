import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { CardDeck, Card, Carousel } from "react-bootstrap";

export default function Lista() {
  const [pointOfInterestList, setPointOfInterestList] = useState();
  const [cart, setCart] = useState([]);
  const [alert, setAlert] = useState("");
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const pointOfInterestRef = firebase.database().ref("pois");
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

  const addToCart = (el) => {
    let addIt = true;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === el.id) addIt = false;
    }
    if (addIt) setCart([...cart, el]);
    else setAlert(`${el.name} is already in cart`); //TODO Popup
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    setCart(hardCopy);
  };

  const cartItems = cart.map((poi) => (
    <div key={poi.id}>
      {`${poi.name}: $${poi.geoLat}`}
      <input type="submit" value="remove" onClick={() => removeFromCart(poi)} />
    </div>
  ));

  const diplayAddOrDeleteButton = (el) => {
    let showAddButton = true;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === el.id) showAddButton = false;
    }
    if (showAddButton) {
      return (
        <input
          className="btn btn-success"
          type="submit"
          value="Add to tour"
          onClick={() => addToCart(el)}
        />
      );
    } else {
      return (
        <input
          className="btn btn-danger"
          type="submit"
          value="remove from tour"
          onClick={() => removeFromCart(el)}
        />
      );
    }
  };

  return (
    <div>
      STORE
      <CardDeck>
        {pointOfInterestList
          ? pointOfInterestList.map((el) => (
              <Card className="card-PoIforTour" style={{ flex: 1 }}>
                <Card.Body>
                  <div key={el.id}>
                    <Card.Title>
                      <center><h4>{`${el.name}`}</h4></center>
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
                    {`City: ${el.city}`} <br />
                    {` type: ${el.type}`} <br />
                    {`  decription: ${el.decription}`} <br />
                    {`  location: ${el.location}`} <br />
                  </div>
                </Card.Body>
                <Card.Footer>
                  <center>{diplayAddOrDeleteButton(el)}</center>
                </Card.Footer>
              </Card>
            ))
          : ""}
      </CardDeck>
      <div>CART</div>
      <div>{cartItems}</div>
      <div>Total: ${cartTotal}</div>
    </div>
  );
}
