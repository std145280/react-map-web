import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import NavigationBar from "./NavigationBar";
import db from "../firebase";
import PopupMsg from "./control/PopupMsg";
import PopupMap from "./control/PopupMap";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import {  carMarkerIcon  } from './control/Icons';

export default function AddVehicles() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [passengers, setPassengers] = useState("");
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState("");
  const [cph, setCPH] = useState("");
  const [place, setPlace] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [geoLong, setGeoLong] = useState("");
  const [geoLat, setGeoLat] = useState("");




  const handleOnChangeTITLE = (e) => {
    setTitle(e.target.value);
  };
  const handleOnChangeTYPE = (e) => {
    setType(e.target.value);
  };
  const handleOnChangePASSENGERS = (e) => {
    setPassengers(e.target.value);
  };
  const handleOnChangeFUEL = (e) => {
    setFuel(e.target.value);
  };
  const handleOnChangeYEAR = (e) => {
    setYear(e.target.value);
  };
  const handleOnChangeCPH = (e) => {
    setCPH(e.target.value);
  };
  const handleOnChangePLACE = (e) => {
    setPlace(e.target.value);
  };

  const toggleMapPopup = (e) => {
    e.preventDefault();
    setIsMapOpen(!isMapOpen);
  };

  const togglePopupMsg = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

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

  const createVehicle = () => {
    var vehicleRef = db.database().ref("vehicles");
    var vehicle = {
      title,
      type,
      passengers,
      fuel,
      year,
      cph,
      place,
      availableForRent: true,
      imageUrl,
    };

    vehicleRef.push(vehicle);
  };

  return (
    <>
      <NavigationBar />
      <div>
        <form>
          <h2 className="text-center">Import New Vehicle</h2>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={handleOnChangeTITLE}
              value={title}
              placeholder="Title"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={handleOnChangeTYPE}
              value={type}
              placeholder="Type"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={handleOnChangePASSENGERS}
              value={passengers}
              placeholder="Number of passengers"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={handleOnChangeFUEL}
              value={fuel}
              placeholder="Fuel"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={handleOnChangeYEAR}
              value={year}
              placeholder="Year"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={handleOnChangeCPH}
              value={cph}
              placeholder="Cost per hour"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={handleOnChangePLACE}
              value={place}
              placeholder="Place"
            />
          </div>

          <center>
            <button
              className="btn btn-primary btn-lg"
              type="submit"
              onClick={toggleMapPopup}
            >
              {" "}
              Point Vehicle on Map{" "}
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
                              onClick={createVehicle}
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



                        <MapContainer center={[37.9838, 23.7275]} zoom={13} style={{height : '400px'}}>
                                <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[37.9838, 23.7275]} icon={carMarkerIcon}>
                                <Popup>
                                    My Marker
                                </Popup>
                                </Marker>
                            </MapContainer>

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
