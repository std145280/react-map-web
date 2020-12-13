import React, { useState } from 'react';
import NavigationBar from "./NavigationBar";
import db from '../firebase';

export default function AddVehicle() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [passengers, setPassengers] = useState('');
  const [fuel, setFuel] = useState('');
  const [year, setYear] = useState('');
  const [cph, setCPH] = useState('');
  const [place, setPlace] = useState('');

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


  const createVehicle = () => {
    var vehicleRef = db.database().ref('vehicles');
    var vehicle = {
      title,
      type,
      passengers,
      fuel,
      year,
      cph,
      place,
      availableForRent: true,
    };

    vehicleRef.push(vehicle);
  };

  return (
        <>
          <NavigationBar />
          <div>
            <form>
                <h2 className="text-center">Import New Vehicle</h2>

                <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeTITLE} value={title} placeholder="Title" /></div>

                <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeTYPE} value={type} placeholder="Type" /></div>

                <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangePASSENGERS} value={passengers} placeholder="Number of passengers" /></div>

                <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeFUEL} value={fuel} placeholder="Fuel" /></div>

                <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeYEAR} value={year} placeholder="Year" /></div>

                <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangeCPH} value={cph} placeholder="Cost per hour" /></div>

                <div className="form-group"><input type="text" className="form-control" onChange={handleOnChangePLACE} value={place} placeholder="Place" /></div>

                <div className="form-group"><button className="btn btn-primary" type="submit" onClick={createVehicle}> Submit </button></div>
            </form>
        </div> 
    </>
  );
}