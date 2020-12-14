import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import NavigationBar from "./NavigationBar";
import db from '../firebase';
import Popup from './control/Popup';
import { Link } from "react-router-dom";


export default function AddPOI() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [type, setType] = useState(''); 
  const [city, setCity] = useState('');
  const [imageUrl, setImageUrl] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOnChangeNAME = (e) => {
    setName(e.target.value);
  };
  const handleOnChangeDESCRIPTION = (e) => {
    setDescription(e.target.value);
  };
  const handleOnChangeLATITUDE = (e) => {
    setLatitude(e.target.value);
  };
  const handleOnChangeLONGITUDE = (e) => {
    setLongitude(e.target.value);
  };
  const handleOnChangeTYPE = (e) => {
    setType(e.target.value);
  };
  const handleOnChangeCITY = (e) => {
    setCity(e.target.value);
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

  const togglePopup = (e) => {
    e.preventDefault();
    
    setIsOpen(!isOpen);
  }

  const createPOI = () => {
    var poiRef = db.database().ref('POIs');
    var poi = {
      name,
      description,
      latitude,
      longitude,
      type,
      city,
    };

    poiRef.push(poi);
  };

  return (
        <>
          <NavigationBar />
          <div>
            <form>
                <h2 className="text-center">Import New POI</h2>

                <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeNAME} value={name} placeholder="Name" /></div>

                <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeDESCRIPTION} value={description} placeholder="Description" /></div>

                <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeLATITUDE} value={latitude} placeholder="Latitude" /></div>

                <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeLONGITUDE} value={longitude} placeholder="Longitude" /></div>

                <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeTYPE} value={type} placeholder="Type" /></div>

                <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeCITY} value={city} placeholder="City" /></div>
            
                
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

                <tr><div className="form-group"><button className="btn btn-success btn-lg" type="submit" onClick={togglePopup}> Submit </button>          
                    {isOpen && <Popup
                    content={<>
                      <b>Question</b>
                      <p>Are you sure you want to import the Point Of Interest?</p>
                      <center><Link  to="/PointOfInterests" className="btn btn-success btn-lg" onClick={createPOI}>Yes </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button className="btn btn-warning btn-lg" type="submit" onClick={togglePopup}> No </button></center>
                      </>}
                    handleClose={togglePopup}
                    />}
                    </div>
                </tr>
                  </table>
                </div>
            </form>
        </div> 
    </>
  );
}