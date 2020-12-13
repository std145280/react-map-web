import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import NavigationBar from "./NavigationBar";
import db from '../firebase';


export default function AddTourGuides() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');
  const [carDrivingLicences, setCarDrivingLicences] = useState('');
  const [address, setAddress] = useState(''); 
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');

  const [imageUrl, setImageUrl] = useState([]);

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

  const createTourGuide= () => {
    var tourGuideRef = db.database().ref('TourGuides');
    var tourGuide= {
      name,
      age,
      experience,
      carDrivingLicences,
      address,
      telephone,
      email,
      availableForHire: true,
      imageUrl
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
            <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeTELEPHONE} value={telephone} placeholder="Telephone" /></div>
            <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeEMAIL} value={email} placeholder="Email" /></div>
            <center>
              <div>
                <h3>Upload Image</h3>
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
                </div>
              </center>
            <div className="form-group"><button className="btn btn-primary" type="submit" onClick={createTourGuide}> Submit </button>
          </div>
        </form>
      </div> 
    </>
  );
}
