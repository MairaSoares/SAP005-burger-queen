import React, {useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import logoKitchen from ".././images/LogoKitchenok.png";
import IconLogout from ".././images/IconLogout.png";
import {ButtonLogout} from "../Components/styleSaloon";


function Kitchen() {
  const [orderKit, setOrderKit] = useState ("");
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
      setOrderKit(json)
      })
    }, [])
  //o [] evita que se faça loop de pedidos no console


  return (
    <div className="kitchen-page">
      <img className="logo" src={logoKitchen}/>
      <ButtonLogout onClick={(event) => logout(event)}><img src={IconLogout} /></ButtonLogout>

      <div className="pedido-client">
        {orderKit && orderKit.map (function (item, index){
          return(
            <div key={index} className="status-pedido" onClick= {console.log("clicou")}>
              <ul>
                <li>Cliente: {item.client_name}</li>
                <li>Mesa: {item.table}</li>
                <li>Status: {item.status}</li>
                <li>Data/Hora: {item.createdAt}</li>
                <li>Products: {item.Products.map (function (productKit){
                  console.log(productKit)
                  return (
                    <div key={productKit.id}>
                      <ul>
                      <li>{productKit.name}</li>
                      <li>{productKit.qtd}</li>
                      <li>{productKit.flavor}</li>
                      <li>{productKit.complement}</li>
                      </ul>
                    </div>
                  )})}</li>
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
