import React, {useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import logoKitchen from ".././images/LogoKitchenok.png";
import IconLogout from ".././images/IconLogout.png";
import { ButtonLogout } from "../Components/styleSaloon";


function Kitchen() {

  const token = localStorage.getItem("token");
  const history = useHistory();
  const [pendingOrders, setPendingOrders] = useState([]);
  const [preparingOrders, setPreparingOrders] = useState([]);
  let totalTime = "";

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
        const pending = json.filter((orders) => orders.status === "pending");
        const preparing = json.filter((orders) => orders.status === "preparing");
        setPendingOrders(pending);
        setPreparingOrders(preparing);
        // setOrderKit(json);
      })
  }, [])

  function updateStatus(orderId, orderStatus) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("status", `${orderStatus}`);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    fetch(`https://lab-api-bq.herokuapp.com/orders/${orderId}`, requestOptions)
      .then(response => response.json())
      .then(order => {
        console.log(order);
        if (order.status === "preparing") {
          const array = [...pendingOrders];
          setPendingOrders(array.filter(order => order.id != orderId));
          setPreparingOrders([...preparingOrders, order]);
        } else {
          const array = [...preparingOrders];
          setPreparingOrders(array.filter(order => order.id != orderId));
        }
      })
      .catch(error => console.log("error", error));
  }

  function handlePrepare(event, order) {
    event.preventDefault();
    order.status = "preparing";
    updateStatus(order.id, order.status);
  }

  function millisecToMinSec(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return (seconds == 60? (minutes + 1) + ": 00": minutes + ":" + (seconds <10? "0": "") + seconds);
  }

  function handleReady(event, order, created, updated) {
    event.preventDefault();
    order.status = "ready";
    updateStatus(order.id, order.status);
    const diff = (updated - created);
    totalTime = millisecToMinSec(diff);
    console.log(totalTime);
  }


  return (
    <div className="kitchen-page">
      <img className="logo" src={logoKitchen}/>
      <ButtonLogout onClick={(event) => logout(event)}><img src={IconLogout} /></ButtonLogout>

      <main className="orders-area">
        <section className="kitchen-orders">
          {pendingOrders && pendingOrders.map (function (item, index) {
            const millisec = Date.parse(item.createdAt);
            // const millisec2 = Date.parse(item.updatedAt);
            const fullDate = new Date(millisec);
            const newFormatDate = fullDate.toLocaleString();
            return (
              <div key={index} className="pending-orders">
                <ul>
                  <li>Pedido: {item.id} | Mesa: {item.table}</li>
                  <li>Cliente: {item.client_name}</li>
                  <li>Status: {item.status}</li>
                  <li>Data/Hora: {newFormatDate}</li>
                  {/* <br />
                  <li>{item.Products.map (function (productKit) {
                    // console.log(productKit)
                    return (
                      <div key={productKit.id}>
                        <ul>
                          <li>{productKit.qtd} x {productKit.name}</li>
                          <li >{productKit.flavor} {productKit.complement}</li>
                        </ul>
                      </div>
                    )
                  })}
                  </li> */}
                </ul>
                <button className="button-kitchen" onClick={(event) => handlePrepare(event, item)}>Preparar</button>
              </div>
            )
          }
          )}
        </section>

        <section className="kitchen-orders">
          {preparingOrders && preparingOrders.map (function (item, index){
            const millisec1 = Date.parse(item.createdAt);
            const millisec2 = Date.parse(item.updatedAt);
            const fullDate = new Date(millisec1);
            const newFormatDate = fullDate.toLocaleString();
            return (
              <div key={index} className="preparing-orders">
                <ul>
                  <li>Pedido: {item.id} | Mesa: {item.table}</li>
                  <li>Cliente: {item.client_name}</li>
                  <li>Status: {item.status}</li>
                  <li>Data/Hora: {newFormatDate}</li><br />
                  <li>{item.Products.map (function (productKit) {
                    return (
                      <div key={productKit.id}>
                        <ul>
                          <li>{productKit.qtd} x {productKit.name}</li>
                          <li>{productKit.flavor}</li>
                          <li>{productKit.complement}</li>
                        </ul>
                      </div>
                    )
                  })}
                  </li>
                </ul>
                <button className="button-kitchen" onClick={(event) => handleReady(event, item, millisec1, millisec2)}>Liberar</button>
              </div>
            )
          }
          )}
        </section>
      </main>
    </div>
  )
}
export default Kitchen;
