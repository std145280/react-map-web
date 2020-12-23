import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import firebase from "../firebase";
import RentRequestList from "./control/RentRequestList";
import { CardDeck } from "react-bootstrap";


export default function RentRequests() {

    const [rentRequestList, setRentRequestList] = useState();

    useEffect(() => {
      const rentReqRef = firebase.database().ref("rentRequest");
      rentReqRef.on("value", (snapshot) => {
        const request = snapshot.val();
        const rentRequestList = [];
        for (let id in request) {
          rentRequestList.push({ id, ...request[id] });
        }
        setRentRequestList(rentRequestList);
      });
    }, []);
  
  return (
    <>
      <NavigationBar />
      <div>
        <br />
        <b>Rent Requests</b>

        <CardDeck>
          {rentRequestList
            ? rentRequestList.map((request, index) => (
                <RentRequestList request={request} key={index} />
              ))
            : ""}
        </CardDeck>
      </div>
    </>
  );
}


