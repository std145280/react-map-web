import React, { useState, useEffect } from "react";
import { CardDeck, Card, Carousel } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import NavigationBar from "./NavigationBar";
import firebase from "../firebase";
import PopupMsg from "./control/PopupMsg";
import PopupMap from "./control/PopupMap";
import { Link } from "react-router-dom";
import Map from "./control/LeafletMap";
import "leaflet/dist/leaflet.css";
import PopupCards from "./control/PopupForCards";
import PointsMap from "./control/LeafletPointSelector";

export default function AddTour() {
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

  const [title, setTitle] = useState("");
  const handleOnChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const [descForCustomer, setDescForCustomer] = useState("");
  const handleOnChangeDescForCustomer = (e) => {
    setDescForCustomer(e.target.value);
  };

  const [descForGuide, setDescForGuide] = useState("");
  const handleOnChangeDescForGuide = (e) => {
    setDescForGuide(e.target.value);
  };

  const [tourCost, setTourCost] = useState("");
  const handleOnChangeTourCost = (e) => {
    setTourCost(e.target.value);
  };

  const [additionalTime, setAdditionalTime] = useState("");
  const handleOnChangeAdditionalTime = (e) => {
    setAdditionalTime(e.target.value);
  };

  const [latlng, setLatlng] = useState({ latitude: 0, longitude: 0 });
  const setLocationLatlng = (newLatlng) => {
    setLatlng(newLatlng);
  };

  const [radius, setRadius] = useState("");
  const handleOnChangeRadius = (e) => {
    setRadius(e.target.value);
  };

  const [location, setLocation] = useState(
    "Click the 'Map' button to add the general area of the tour."
  );
  const setLocationName = (newName) => {
    setLocation(newName);
  };

  const [isMapOpen, setIsMapOpen] = useState(false);
  const toggleMapPopup = (e) => {
    e.preventDefault();
    setIsMapOpen(!isMapOpen);
  };

  const [isPointSelectorOpen, setIsPointSelectorOpen] = useState(false);
  const togglePointSelectorPopup = (e) => {
    e.preventDefault();
    setIsPointSelectorOpen(!isPointSelectorOpen);
  };

  const [isOpen, setIsOpen] = useState(false);
  const togglePopupMsg = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const [isPoiPopupOpen, setIsPoiPopupOpen] = useState(false);
  const togglePoiPopup = (e) => {
    e.preventDefault();
    setIsPoiPopupOpen(!isPoiPopupOpen);
  };

  const addToCart = (el) => {
    let addIt = true;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === el.id) addIt = false;
    }
    if (addIt) setCart([...cart, el]);
    else setAlert(`${el.name} is already in cart`); //TODO Popup
  };

  const [pointOfInterestList, setPointOfInterestList] = useState();

  const [cart, setCart] = useState([]);

  const [alert, setAlert] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
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

  const [imageUrl, setImageUrl] = useState([]);
  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const readImages = async (e) => {
    const file = e.target.files[0];
    const id = uuid();
    const storageRef = firebase.storage().ref("images").child(id);
    const imageRef = firebase.database().ref("images").child("daily").child(id);
    await storageRef.put(file);
    storageRef.getDownloadURL().then((url) => {
      imageRef.set(url);
      const newState = [...imageUrl, { id, url }];
      setImageUrl(newState);
    });
  };

  const createTour = () => {
    var tourRef = firebase.database().ref("tour");
    var tour = {
      title,
      descForCustomer,
      descForGuide,
      tourCost,
      additionalTime,
      imageUrl,
      geoLat: latlng.lat,
      geoLong: latlng.lng,
    };
    tourRef.push(tour);
  };

  const diplayAddOrDeleteButton = (el) => {
    let showAddButton = true;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === el.id) showAddButton = false;
    }
    if (showAddButton) {
      return (
        <input
          className="btn btn-primary"
          type="submit"
          value="Add to tour"
          onClick={() => addToCart(el)}
        />
      );
    } else {
      return (
        <input
          className="btn btn-warning"
          type="submit"
          value="remove from tour"
          onClick={() => removeFromCart(el)}
        />
      );
    }
  };

  return (
    <>
      <NavigationBar />
      <div>
        <form>
          <h2 className="text-center">Create New Tour</h2>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={handleOnChangeTitle}
              value={title}
              placeholder="Title"
            />
          </div>
          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              onChange={handleOnChangeDescForCustomer}
              value={descForCustomer}
              placeholder="Description for customer."
              rows="3"
            />
          </div>
          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              onChange={handleOnChangeDescForGuide}
              value={descForGuide}
              placeholder="Description for guide."
              rows="3"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              onChange={handleOnChangeTourCost}
              value={tourCost}
              placeholder="Tour Cost*"
            />
            <small class="form-text text-primary">
              *do not include cost of car, tour guide or tickets.
            </small>
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              onChange={handleOnChangeAdditionalTime}
              value={additionalTime}
              placeholder="Additional time*"
            />
            <small class="form-text text-primary">
              *do not include time that will be spend for points of interests.
            </small>
          </div>
          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              value={location}
              placeholder="Click the 'Map' button to add the general area of the tour."
              rows="3"
            />{" "}
            <center>
              <br />
              <button
                className="btn btn-primary btn-lg"
                type="submit"
                onClick={toggleMapPopup}
              >
                {" "}
                Map{" "}
              </button>
            </center>
            <small class="form-text text-info">
              Tip: Zooming out helps for selecting a general location name of
              your tour.
            </small>
          </div>

          <div>
            <br />
          </div>

          <center>
            <button
              className="btn btn-primary btn-lg"
              type="submit"
              onClick={togglePoiPopup}
            >
              {" "}
              Add PoIs{" "}
            </button>
          </center>
          <div>
            <br />
            <table>
              <tr>
                <td>
                  {" "}
                  <h6>Upload Image</h6>{" "}
                </td>
                <td>
                  <input type="file" accept="image/*" onChange={readImages} />
                  {imageUrl
                    ? imageUrl.map(({ id, url }) => {
                        return (
                          <div key={id}>
                            <img src={url} alt="" />
                          </div>
                        );
                      })
                    : ""}
                </td>
              </tr>
              <tr></tr>
              <tr>
                {" "}
                <div className="form-group">
                  <button
                    className="btn btn-success btn-lg"
                    type="submit"
                    onClick={togglePopupMsg}
                  >
                    {" "}
                    Submit{" "}
                  </button>
                  {isOpen && (
                    <PopupMsg
                      content={
                        <>
                          <b>Question</b>
                          <p>Are you sure you want to import the vehicle?</p>
                          <center>
                            <Link
                              to="/Vehicles"
                              className="btn btn-success btn-lg"
                              onClick={createTour}
                            >
                              Yes{" "}
                            </Link>
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
                    />
                  )}

                  {isMapOpen && (
                    <PopupMap
                      content={
                        <>
                          <h3> Insert Place </h3>
                          <div>
                            <Map.LeafletMap
                              //markerIcon={carMarkerIcon}
                              setLocationLatlng={setLocationLatlng}
                              setLocationName={setLocationName}
                            />
                          </div>
                          <br />
                          <center>
                            {" "}
                            <button
                              className="btn btn-success btn-lg"
                              type="submit"
                              onClick={toggleMapPopup}
                            >
                              {" "}
                              Done{" "}
                            </button>
                          </center>
                        </>
                      }
               
                    />
                  )}

                  {isPoiPopupOpen && (
                    <PopupCards
                      content={
                        <>
                        <h4>Add Points of interest to the Tour</h4>
                          <div className="form-group">
                            <input
                              type="number"
                              className="form-control"
                              onChange={handleOnChangeTourCost}
                              value={tourCost}
                              placeholder="Radius for displaying PoIs*"
                            />
                            <small class="form-text text-primary">
                              *Ex. Write 20 for displaying PoIs in 20km radius around the area you set for the tour.
                            </small>
                          </div>
                          <center>
                            <div>
                              <center>
                                <CardDeck>
                                  {pointOfInterestList
                                    ? pointOfInterestList.map((el) => (
                                        <Card
                                          className="card-PoIforTourOnPopup"
                                          style={{ flex: 1 }}
                                        >
                                          <Card.Body>
                                            <div key={el.id}>
                                              <Card.Title>
                                                <center>
                                                  <h4>{`${el.name}`}</h4>
                                                </center>
                                              </Card.Title>
                                              <Carousel>
                                                {el.imageUrl
                                                  ? el.imageUrl.map(
                                                      ({ id, url }) => {
                                                        return (
                                                          <Carousel.Item
                                                            interval={500}
                                                          >
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
                                                      }
                                                    )
                                                  : ""}
                                              </Carousel>
                                              <br />
                                              {`City: ${el.city}`} <br />
                                              {` type: ${el.type}`} <br />
                                              {`  decription: ${el.decription}`}{" "}
                                              <br />
                                              {`  location: ${el.location}`}{" "}
                                              <br />
                                            </div>
                                          </Card.Body>
                                          <Card.Footer>
                                            <center>
                                              {diplayAddOrDeleteButton(el)}
                                            </center>
                                          </Card.Footer>
                                        </Card>
                                      ))
                                    : ""}
                                </CardDeck>
                              </center>
                            </div>
                            <br />{" "}
                            <button
                              className="btn btn-success btn-lg"
                              type="submit"
                              onClick={togglePoiPopup}
                            >
                              {" "}
                              Done{" "}
                            </button>
                          </center>
                        </>
                      }
                    />
                  )}
                </div>
              </tr>
            </table>
          </div>
        </form>
        <div>CART</div>
        <div>{cartItems}</div>
        <div>Total: ${cartTotal}</div>
      </div>
    </>
  );
}
