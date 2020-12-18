import React, { useState, useEffect } from "react";
import firebase from "../../firebase";

export default function Lista() {
  const [pointOfInterestList, setPointOfInterestList] = useState();
  const [cart, setCart] = useState([]);
  const [alert, setAlert] = useState("");
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const pointOfInterestRef = firebase.database().ref("pois");
    pointOfInterestRef.on("value", (snapshot) => {
      const pointOfInterest = snapshot.val();
      const pointOfInterestList = [];
      for (let id in pointOfInterest) {
        pointOfInterestList.push({ id, ...pointOfInterest[id] });
      }
      setPointOfInterestList(pointOfInterestList);
      console.log(pointOfInterestList);
    });
  }, []);

  const addToCart = (el) => {
      let addIt = true
      for (let i=0; i<cart.length; i++){
          if(cart[i].id === el.id) addIt = false
      }
      if (addIt) setCart([...cart, el]);
      else setAlert(`${el.name} is already in cart`); //TODO Popup
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    setCart(hardCopy);
  };


  const cartItems = cart.map((poi) => (
    <div key={poi.id}>
      {`${poi.name}: $${poi.geoLat}`}
      <input type="submit" value="remove" onClick={() => removeFromCart(poi)} />
    </div>
  ));

  return (
    <div>
      STORE
      <center>
        {pointOfInterestList
          ? pointOfInterestList.map((el) => (
              <div key={el.id}>
                {`${el.name}: $${el.geoLat}`}
                <input
                  type="submit"
                  value="add"
                  onClick={() => addToCart(el)}
                />
              </div>
            ))
          : ""}
      </center>
      <div>CART</div>
      <div>{cartItems}</div>
      <div>Total: ${cartTotal}</div>
      <br/>
      <div>{alert}</div>
    </div>
  );
}
