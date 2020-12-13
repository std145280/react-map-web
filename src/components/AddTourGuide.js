import React, { useState } from 'react';

import NavigationBar from "./NavigationBar";
import db from '../firebase';
import Popup from './control/Popup';
import { Link } from "react-router-dom";


export default function TourGuides() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');
  const [carDrivingLicences, setCarDrivingLicences] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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

    
  const togglePopup = (e) => {
    e.preventDefault();
    
    setIsOpen(!isOpen);
  }
  

  const createTourGuide = () => {
    var tourGuideRef = db.database().ref('tourGuide');
    var tourGuide = {
      name,
      age,
      experience,
      carDrivingLicences,
      address,
      telephone,
      email,
      availableForHire: true,
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

            <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeDRIVINGLICENCE} value={carDrivingLicences} placeholder="Car Driving Licences" /></div>

            <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeADDRESS} value={address} placeholder="Address" /></div>

            <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeTELEPHONE} value={telephone} placeholder="Tel:" /></div>

            <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeEMAIL} value={email} placeholder="email" /></div>

            <div className="form-group"><button className="btn btn-primary" type="submit" onClick={togglePopup}> Submit </button>
        
          {isOpen && <Popup
            content={<>
              <b>Question</b>
              <p>Are you sure you want to import the tour guide?</p>
              <center><Link  to="/TourGuides" className="btn btn-success btn-lg" onClick={createTourGuide}>Yes </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button className="btn btn-warning btn-lg" type="submit" onClick={togglePopup}> No </button></center>
            </>}
            handleClose={togglePopup}
          />}
        </div>

        </form>
    </div>


</>
  );
}
