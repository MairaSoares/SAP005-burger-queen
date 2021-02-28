import React from "react";
import { useHistory } from "react-router-dom";


function Kitchen() {

  const token = localStorage.getItem("token");
  const history = useHistory();

  function logout() {
    localStorage.clear();
    history.push("/");
  }

  useEffect (() => {
    fetch('https://lab-api-bq.herokuapp.com/orders/', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':`${token}`
      },
    })
      .then((response) => response.json()).then((json) => {
      
      })
    }, []);


  return (
    <div className="kitchen-page">
      <img className="logo" src= "images/LogoKitchenok.png"/>
      <button onClick={(event) => logout(event)}>Sair</button>
    </div>
  )
}

export default Kitchen;
