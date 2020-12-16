import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import NavigationBar from "./NavigationBar";
import db from '../firebase';
import PopupMsg from './control/PopupMsg';
import PopupMap from "./control/PopupMap";
import { Link } from "react-router-dom";
import Map from "./control/LeafletMap";
import "leaflet/dist/leaflet.css";


export default function AddTourGuide() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');
  const [carDrivingLicences, setCarDrivingLicences] = useState('');
  const [address, setAddress] = useState(''); 
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [latitude, setLatitude] = useState(37.9838);
  const [longitude, setLongitude] = useState(23.7275);
  const [location, setLocation] = useState("Click 'Map' to set tour guide's location.");

  
  const setLocationLatitude = (newLatitude) => {
    setLatitude(newLatitude);
  };
  const setLocationLongitude = (newLongitude) => {
    setLongitude(newLongitude);
  };

  const setLocationName = (newName) => {
    setLocation(newName);
  };


  const handleOnChangeNAME = (e) => {
    setName(e.target.value);
  };
  const handleOnChangeAGE = (e) => {
    setAge(e.target.value);
  };
  const handleOnChangeEXPERIENCE = (e) => {
    setExperience(e.target.value);
  };
  const handleOnChangeDRIVINGLICENCE = (e) => {
    setCarDrivingLicences(e.target.value);
  };
  const handleOnChangeADDRESS = (e) => {
    setAddress(e.target.value);
  };
  const handleOnChangeTELEPHONE = (e) => {
    setTelephone(e.target.value);
  };
  const handleOnChangeEMAIL = (e) => {
    setEmail(e.target.value);
  };

  const toggleMapPopup = (e) => {
    e.preventDefault();
    setIsMapOpen(!isMapOpen);
  };

  const readImages = async (e) => {
    const file = e.target.files[0];
    const id = uuid();
    const storageRef = db.storage().ref('images').child(id);
    const imageRef = db.database().ref('images').child('daily').child(id);
    await storageRef.put(file);
    storageRef.getDownloadURL().then((url) => {
      imageRef.set(url);
      const newState = [...imageUrl, { id, url }];
      setImageUrl(newState);
    });
  };

  const togglePopupMsg = (e) => {
    e.preventDefault();
    
    setIsOpen(!isOpen);
  }
  

  const createTourGuide= () => {
    var tourGuideRef = db.database().ref('tourGuide');
    var tourGuide= {
      name,
      age,
      experience,
      carDrivingLicences,
      address,
      telephone,
      email,
      availableForHire: true,
      imageUrl,
      geoLat: latitude,
      geoLong: longitude,
      location: location
    };
    
    tourGuideRef.push(tourGuide);
  };

  return (
    <>
      <NavigationBar />
        <div>
        <form>
            <h2 className="text-center">Import New Tour Guide</h2>

            <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeNAME} value={name} placeholder="Name" /></div>
            <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeAGE} value={age} placeholder="Age" /></div>
            <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeEXPERIENCE} value={experience} placeholder="Experience" /></div>
            <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeDRIVINGLICENCE} value={carDrivingLicences} placeholder="Driving Licences" /></div>
            <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeADDRESS} value={address} placeholder="Address" /></div>
            <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeTELEPHONE} value={telephone} placeholder="Tel:" /></div>
            <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeEMAIL} value={email} placeholder="email" /></div>
            <div className="form-group"><textarea type="text" className="form-control" value={location} placeholder="Click the 'Map' button to add tour guide's location." rows="3" /></div>
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
                  <td> <h6>Upload Image</h6> </td>
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
                      : ''}
                    </td>
                    </tr>  
                    <tr></tr>
                    <tr> <div className="form-group"><button className="btn btn-success btn-lg" type="submit" onClick={togglePopupMsg}> Submit </button>
        
                    {isOpen && <PopupMsg
                      content={<>
                        <b>Question</b>
                        <p>Are you sure you want to import the tour guide?</p>
                        <center><Link  to="/TourGuides" className="btn btn-success btn-lg" onClick={createTourGuide}>Yes </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button className="btn btn-warning btn-lg" type="submit" onClick={togglePopupMsg}> No </button></center>
                      </>}
                      handleClose={togglePopupMsg}
                    />}
                    
                    {isMapOpen && (
                    <PopupMap
                      content={
                        <>
                          <h3> Insert Place </h3>
                          <div>
                          <Map.LeafletMap
                              setLocationLongitude={setLocationLongitude}
                              setLocationLatitude={setLocationLatitude}
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
