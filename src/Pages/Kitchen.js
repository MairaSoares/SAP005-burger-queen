import React, {useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


function Kitchen() {
  const [order, setOrder] = useState ("");
  const token = localStorage.getItem("token");
  const history = useHistory();

  function logout() {
    localStorage.clear();
    history.push("/");
  }

  useEffect(() => { 
    fetch("https://lab-api-bq.herokuapp.com/orders", {
      headers:{
        "accept": "aplication/json",
        "Authorization": `${token}`
      },
        
    })
      .then((response) => response.json())
      .then ((json) => {
      console.log(json)
      setOrder(json)
      })
    })

    
  return (
    <div className="kitchen-page">
      <img className="logo" src= "./images/LogoKitchenok.png"/>
      <button onClick={(event) => logout(event)}>Sair</button>

      <div className="pedido-client">
        {order && order.map (function (item){
          return(
            <div className="status-pedido" onClick= {console.log("clicou")}>
              <ul>
                <li>Cliente: {item.client_name}</li>
                <li>Mesa: {item.table}</li>
                <li>Status: {item.status}</li>
                <li>Data/Hora: {item.createdAt}</li>
              </ul>
              <button className= "button-kitchen">FEITO</button>
            </div>
          )
        }
        )}
      </div>
    </div>
  )
}
export default Kitchen;
