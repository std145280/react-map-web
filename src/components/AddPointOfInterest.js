import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import NavigationBar from "./NavigationBar";
import db from "../firebase";
import PopupMsg from "./control/PopupMsg";
import PopupMap from "./control/PopupMap";
import { Link } from "react-router-dom";
import Map from "./control/LeafletMap";
import "leaflet/dist/leaflet.css";

var clickCounter;
var stringStartTime;

export default function AddPOI() {

  //initialization
  useEffect(() => {
    //starts with 1 because there is the event of entering this page
    clickCounter = 1;
    stringStartTime = Date().toLocaleString();

    window.ga("send", {
      hitType: "event",
      eventCategory: "AddPoI",
      eventAction: "click",
      eventLabel: Date().toLocaleString() + " - Open AddPoI page"
    });
  }, []);

  const [latlng, setLatlng] = useState({ latitude: 0, longitude: 0 });
  const setLocationLatlng = (newLatlng) => {
    setLatlng(newLatlng);
  };

  function SubmitButton(){
    if (name && descForCustomer && descForGuide && type && city && ticketCost && time && (latlng.lat!==undefined)){
      return <button className="btn btn-success btn-lg"
              type="submit"
              onClick={togglePopupMsg}> Submit </button>
    } else {
      return <button className="btn btn-success btn-lg"
                    type="submit" disabled> Submit </button>
    };
  };



  const [location, setLocation] = useState(
    "Click 'Map' to set Point of Interest location."
  );
  const setLocationName = (newName) => {
    setLocation(newName);
    clickCounter++;
    window.ga("send", {
      hitType: "event",
      eventCategory: "AddPoI",
      eventAction: "click",
      eventLabel: Date().toLocaleString() + " - Set PoI's LatLng",
    });
  };

  const [name, setName] = useState("");
  const handleOnChangeName = (e) => {
    setName(e.target.value);
  };

  const [descForCustomer, setDescForCustomer] = useState("");
  const handleOnChangeDescForCustomer = (e) => {
    setDescForCustomer(e.target.value);
  };

  const [descForGuide, setDescForGuide] = useState("");
  const handleOnChangeDescForGuide = (e) => {
    setDescForGuide(e.target.value);
  };

  const [type, setType] = useState("");
  const handleOnChangeType = (e) => {
    setType(e.target.value);
  };

  const [city, setCity] = useState("");
  const handleOnChangeCity = (e) => {
    setCity(e.target.value);
  };

  const [time, setTime] = useState("");
  const handleOnChangeTime = (e) => {
    setTime(e.target.value);
  };

  const [ticketCost, setTicketCost] = useState("");
  const handleOnChangeTicketCost = (e) => {
    setTicketCost(e.target.value);
  };

  const [isMapOpen, setIsMapOpen] = useState(false);
  const toggleMapPopup = (e) => {
    e.preventDefault();
    setIsMapOpen(!isMapOpen);
    clickCounter++;
    if (!isMapOpen) {
      window.ga("send", {
        hitType: "event",
        eventCategory: "AddPoI",
        eventAction: "click",
        eventLabel: Date().toLocaleString() + " - Open map popup",
      });
    } else {
      window.ga("send", {
        hitType: "event",
        eventCategory: "AddPoI",
        eventAction: "click",
        eventLabel: Date().toLocaleString() + " - Close map popup",
      });
    }

  };

  const [imageUrl, setImageUrl] = useState([]);

  const readImages = async (e) => {
    const file = e.target.files[0];
    const id = uuid();
    const storageRef = db.storage().ref("image").child(id);
    const imageRef = db.database().ref("image").child("temp").child(id);
    await storageRef.put(file);
    storageRef.getDownloadURL().then((url) => {
      imageRef.set(url);
      const newState = [...imageUrl, { id, url }];
      setImageUrl(newState);
    });
    clickCounter++;
    window.ga("send", {
      hitType: "event",
      eventCategory: "AddPoI",
      eventAction: "click",
      eventLabel: Date().toLocaleString() + " - Read Image",
    });

  };

  const [isOpen, setIsOpen] = useState(false);
  const togglePopupMsg = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    clickCounter++;
    if (!isOpen) {
      window.ga("send", {
        hitType: "event",
        eventCategory: "AddPoI",
        eventAction: "click",
        eventLabel: Date().toLocaleString() + " - Open popup msg",
      });
    } else {
      window.ga("send", {
        hitType: "event",
        eventCategory: "AddPoI",
        eventAction: "click",
        eventLabel: Date().toLocaleString() + " - Close popup msg",
      });
    }
  };

  const getImageUrl = () => {
    const imageRef = db.database().ref("image").child("temp");
    imageRef.on("value", (snapshot) => {
      const imageUrls = snapshot.val();
      const urls = [];
      for (let id in imageUrls) {
        urls.push({ id, url: imageUrls[id] });
      }
      const newState = [...imageUrl, ...urls];
      setImageUrl(newState);
    });
  };

  const deleteImage = (id) => {
    const storageRef = db.storage().ref("image").child(id);
    const imageRef = db.database().ref("image").child("temp").child(id);
    clickCounter++
    window.ga("send", {
      hitType: "event",
      eventCategory: "AddPoI",
      eventAction: "click",
      eventLabel: Date().toLocaleString() + " - Delete Image",
    });

    imageRef.remove().then(() => {
      storageRef.delete();
    });
  };

  useEffect(() => {
    getImageUrl();
  }, []);

  const createPOI = () => {
    var poiRef = db.database().ref("poi");
    var poi = {
      name,
      descForCustomer,
      descForGuide,
      geoLat: latlng.lat,
      geoLng: latlng.lng,
      type,
      city,
      time,
      ticketCost,
      imageUrl,
      location: location,
    };

    poiRef.push(poi);
    const imageRef = db.database().ref("image");
    imageRef.remove();
    
    window.ga("send", {
      hitType: "event",
      eventCategory: "AddPoI",
      eventAction: "click",
      eventLabel: Date().toLocaleString() + " - Created New PoI",
    });

    //we dont use clickCounter++ because we already counted this click at the closing of the popup
    //event with all clicks and start and finish time for easier reviewing
    window.ga("send", {
      hitType: "event",
      eventCategory: "New PoI @ " + stringStartTime,
      eventAction: "click",
      eventLabel: Date().toLocaleString() + " - Total clicks: " + clickCounter,
    });


  };

  return (
    <>
      <NavigationBar />
      <div className="formStyle">
        <form>
          <h2 className="text-center">Import New POI</h2>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={handleOnChangeName}
              value={name}
              placeholder="Name"
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
              type="text"
              className="form-control"
              onChange={handleOnChangeType}
              value={type}
              placeholder="Type"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={handleOnChangeCity}
              value={city}
              placeholder="City"
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              className="form-control"
              onChange={handleOnChangeTicketCost}
              value={ticketCost}
              placeholder="Ticket Cost, write 0 if there is no cost."
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              className="form-control"
              onChange={handleOnChangeTime}
              value={time}
              placeholder="Time needed*"
            />{" "}
            <small class="form-text text-primary">
              *insert time in minutes e.x. write 20 for 20 minutes time.
            </small>
          </div>

          <br />

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={latlng.lat}
              placeholder="Latitude**"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={latlng.lng}
              placeholder="Longitude**"
            />
          </div>

          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              value={location}
              placeholder="Click the 'Map' button to add vehicle's place."
              rows="3"
            />
          </div>
          <center>
            <button
              className="btn btn-primary btn-lg"
              type="submit"
              onClick={toggleMapPopup}
            >
              <i className="fas fa-map-marked-alt">{`  Map`}</i>
            </button>
          </center>

          <small class="form-text text-primary">
            **Langitude and longitude will be inserted automaticaly when you
            choose the location from the map.
          </small>
          <br />
          <div>
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
                            <img width={150} height={113} src={url} alt="" />
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteImage(id)}
                            >
                              <i className="fa fa-trash-alt"></i>
                            </button>
                          </div>
                        );
                      })
                    : ""}
                </td>
              </tr>
              <tr></tr>

              <tr>
                <div className="form-group">
                <SubmitButton/>
                  {isOpen && (
                    <PopupMsg
                      content={
                        <>
                          <b>Question</b>
                          <p>
                            Are you sure you want to import the Point Of
                            Interest?
                          </p>
                          <center>
                            <Link
                              to="/PointOfInterest"
                              className="btn btn-success btn-lg"
                              onClick={createPOI}
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
                      handleClose={togglePopupMsg}
                    />
                  )}
                  {isMapOpen && (
                    <PopupMap
                      content={
                        <>
                          <center>
                            <h3> Insert Point of Interest's location </h3>
                          </center>
                          <div>
                            <Map.LeafletMap
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
                      handleClose={toggleMapPopup}
                    />
                  )}
                </div>
              </tr>
            </table>
          </div>
        </form>
      </div>
    </>
  );
}
