import React, { useState } from 'react';
import NavigationBar from "./NavigationBar";
import db from '../firebase';

export default function AddPOI() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [type, setType] = useState(''); 
  const [city, setCity] = useState('');

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

                <div className="form-group"><button className="btn btn-primary" type="submit" onClick={createPOI}> Submit </button></div>
            </form>
        </div> 
    </>
  );
}