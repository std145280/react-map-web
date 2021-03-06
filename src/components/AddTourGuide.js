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
var tsStart;

export default function AddTourGuide() {

  useEffect(() => {
    tsStart = Math. round((new Date()). getTime() / 1000);
    //starts with 1 because there is the event of entering this page
    clickCounter = 1;
    stringStartTime = Date().toLocaleString();
    window.ga("send", {
      hitType: "event",
      eventCategory: "AddTourGuide",
      eventAction: "click",
      eventLabel: Date().toLocaleString() + " - Open AddTourGuide page",
    });
  }, []);




  const [latlng, setLatlng] = useState({ latitude: 0, longitude: 0 });
  const setLocationLatlng = (newLatlng) => {
    setLatlng(newLatlng);
    clickCounter++;
    window.ga("send", {
      hitType: "event",
      eventCategory: "AddTourGuide",
      eventAction: "click",
      eventLabel: Date().toLocaleString() + " - Set TourGuide's LatLng",
    });
  };


  function SubmitButton(){
    if (name && age && languages && telephone && email && (latlng.lat!==undefined)){
      return <button className="btn btn-success btn-lg"
              type="submit"
              onClick={togglePopupMsg}> Submit </button>
    } else {
      return <button className="btn btn-success btn-lg"
                    type="submit" disabled> Submit </button>
    };
  };


  //To location και το address θα είναι το ίδιο
  //Όταν θα χρησιμοποιεί την εφαρμογή κινητού, το
  //location θα αντιστοιχεί στην πραγματική του θέση
  const [location, setLocation] = useState(
    "Click 'Map' to set tour guide's address."
  );
  const setLocationName = (newName) => {
    setLocation(newName);
  };

  const [name, setName] = useState("");
  const handleOnChangeNAME = (e) => {
    setName(e.target.value);
  };

  const [age, setAge] = useState("");
  const handleOnChangeAGE = (e) => {
    setAge(e.target.value);
  };

  const [languages, setLanguages] = useState("");
  const handleOnChangeLANGUAGES = (e) => {
    setLanguages(e.target.value);
  };

  const [telephone, setTelephone] = useState("");
  const handleOnChangeTELEPHONE = (e) => {
    setTelephone(e.target.value);
  };

  const [email, setEmail] = useState("");
  const handleOnChangeEMAIL = (e) => {
    setEmail(e.target.value);
  };

  const [isMapOpen, setIsMapOpen] = useState(false);

  const toggleMapPopup = (e) => {
    e.preventDefault();
    setIsMapOpen(!isMapOpen);
    clickCounter++;
    if (!isMapOpen) {
      window.ga("send", {
        hitType: "event",
        eventCategory: "AddTourGuide",
        eventAction: "click",
        eventLabel: Date().toLocaleString() + " - Open map popup",
      });
    } else {
      window.ga("send", {
        hitType: "event",
        eventCategory: "AddTourGuide",
        eventAction: "click",
        eventLabel: Date().toLocaleString() + " - Close map popup",
      });
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const togglePopupMsg = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    clickCounter++;
    if (!isOpen) {
      window.ga("send", {
        hitType: "event",
        eventCategory: "AddTourGuide",
        eventAction: "click",
        eventLabel: Date().toLocaleString() + " - Open popup msg",
      });
    } else {
      window.ga("send", {
        hitType: "event",
        eventCategory: "AddTourGuide",
        eventAction: "click",
        eventLabel: Date().toLocaleString() + " - Close popup msg",
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
      eventCategory: "AddTourGuide",
      eventAction: "click",
      eventLabel: Date().toLocaleString() + " - Read Image",
    });
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
    clickCounter++;
    window.ga("send", {
      hitType: "event",
      eventCategory: "AddTourGuide",
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


  const createTourGuide = () => {
    var tourGuideRef = db.database().ref("tourGuide");
    var tourGuide = {
      name,
      age,
      languages,
      address: location,
      telephone,
      email,
      availableForHire: true,
      imageUrl,
      geoLat: latlng.lat,
      geoLong: latlng.lng,
      location: location,
    };

    tourGuideRef.push(tourGuide);
    const imageRef = db.database().ref("image");
    imageRef.remove();

    window.ga("send", {
      hitType: "event",
      eventCategory: "AddTourGuide",
      eventAction: "click",
      eventLabel: Date().toLocaleString() + " - Created New TourGuide",
    });
    clickCounter++;
    var tsFinish = Math. round((new Date()). getTime() / 1000);
    //using UNIX timestamp for calculating the total time in seconds
    var totalSeconds = tsFinish - tsStart;

    //we dont use clickCounter++ because we already counted this click at the closing of the popup 
    window.ga("send", {
      hitType: "event",
      eventCategory: "New TourGuide @ " + stringStartTime + " - a: " + clickCounter + " ,s:" + totalSeconds,
      eventAction: "click",
      eventLabel: Date().toLocaleString() + " - Total clicks: " + clickCounter,
    });
  };

  return (
    <>
      <NavigationBar />
      <div className="formStyle">

        <form>
          <h2 className="text-center">Import New Tour Guide</h2>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={handleOnChangeNAME}
              value={name}
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              onChange={handleOnChangeAGE}
              value={age}
              placeholder="Age"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={handleOnChangeLANGUAGES}
              value={languages}
              placeholder="Languages"
            />
            <small class="form-text text-info">
              *Tip: You can type short versions for countries eg GR, EN, FR
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={handleOnChangeTELEPHONE}
              value={telephone}
              placeholder="Phone"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              onChange={handleOnChangeEMAIL}
              value={email}
              placeholder="email"
            />
          </div>
          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              value={location}
              placeholder="Address *"
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
            <small class="form-text text-primary">
              *Click the 'Map' button to find and add tour guide's address.
            </small>
          </center>
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
                {" "}
                <div className="form-group">
                  <SubmitButton/>

                  {isOpen && (
                    <PopupMsg
                      content={
                        <>
                          <b>Question</b>
                          <p>Are you sure you want to import the tour guide?</p>
                          <center>
                            <Link
                              to="/TourGuides"
                              className="btn btn-success btn-lg"
                              onClick={createTourGuide}
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
                          <h3> Insert tour guide's address </h3>
                          <div>
                            <Map.LeafletMap
                              setLocationLatlng={setLocationLatlng}
                              setLocationName={setLocationName}
                            />
                          </div>

                          <center>
                            {" "}
                            <button
                              className="btn btn-danger btn-lg"
                              type="submit"
                              onClick={toggleMapPopup}
                            >
                              {" "}
                              Cancel{" "}
                            </button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button
                              className="btn btn-success btn-lg"
                              type="submit"
                              onClick={toggleMapPopup}
                            >
                              {" "}
                              Accept{" "}
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
