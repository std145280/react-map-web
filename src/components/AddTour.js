import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import NavigationBar from "./NavigationBar";
import db from "../firebase";
import PopupMsg from "./control/PopupMsg";
import PopupMap from "./control/PopupMap";
import { Link } from "react-router-dom";
import Map from "./control/LeafletMap";
import "leaflet/dist/leaflet.css";


export default function AddTour() {
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

  const [additionalTime, setAdditionalTime]  = useState("");
  const handleOnChangeAdditionalTime = (e) => {
    setAdditionalTime(e.target.value);
  };

  const [latlng, setLatlng] = useState({ latitude: 0, longitude: 0 });
  const setLocationLatlng = (newLatlng) => {
    setLatlng(newLatlng);
  };

  const [location, setLocation] = useState("Click 'Map' to set vehicles location.");
  const setLocationName = (newName) => {
    setLocation(newName);
  };

  const [isMapOpen, setIsMapOpen] = useState(false);
  const toggleMapPopup = (e) => {
    e.preventDefault();
    setIsMapOpen(!isMapOpen);
  };

  const [isOpen, setIsOpen] = useState(false);
  const togglePopupMsg = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const [imageUrl, setImageUrl] = useState([]);
  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const readImages = async (e) => {
    const file = e.target.files[0];
    const id = uuid();
    const storageRef = db.storage().ref("images").child(id);
    const imageRef = db.database().ref("images").child("daily").child(id);
    await storageRef.put(file);
    storageRef.getDownloadURL().then((url) => {
      imageRef.set(url);
      const newState = [...imageUrl, { id, url }];
      setImageUrl(newState);
    });
  };

  const createTour = () => {
    var tourRef = db.database().ref("tour");
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
              type="text"
              className="form-control"
              onChange={handleOnChangeTourCost}
              value={tourCost}
              placeholder="Tour Cost*"
            />
            <small class="form-text text-primary">*do not include cost of car, tour guide or tickets.</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={handleOnChangeAdditionalTime}
              value={additionalTime}
              placeholder="Additional time*"
            />
            <small class="form-text text-primary">*do not include time that will be spend for points of interests.</small>
          </div>
          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              value={location}
              placeholder="Click the 'Map' button to add the general area of the tour."
              rows="3"
            />
            <small class="form-text text-info">Tip: Zooming out helps for selecting a general location name of your tour.</small>
          </div>

          <center>
            <button
              className="btn btn-primary btn-lg"
              type="submit"
              onClick={toggleMapPopup}
            >
              {" "}
              Map{" "}
            </button>
          </center>
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
                      handleClose={togglePopupMsg}
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
