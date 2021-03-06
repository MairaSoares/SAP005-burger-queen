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

  function logout(event) {
    event.preventDefault();
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

  function handleReady(event, order) {
    event.preventDefault();
    order.status = "ready";
    updateStatus(order.id, order.status);
  }


  return (
    <div className="kitchen-page">

      <div className="top-items">
        <img className="logo" src={logoKitchen}/>
        <ButtonLogout className="btn-logout" onClick={(event) => logout(event)}><img src={IconLogout} /></ButtonLogout>
      </div>

      <main className="orders-area">
        
        <section className="kitchen-orders">
          {pendingOrders && pendingOrders.map (function (item, index) {
            const millisec = Date.parse(item.createdAt);
            const fullDate = new Date(millisec);
            const newFormatDate = fullDate.toLocaleString();
            return (
              <div key={index} className="pending-orders">
                <ul>
                  <li>Pedido: {item.id} | Mesa: {item.table}</li>
                  <li>Cliente: {item.client_name}</li>
                  <li>Status: {item.status}</li>
                  <li>Data/Hora: {newFormatDate}</li>
                </ul>
                <button className="btn-kitchen" onClick={(event) => handlePrepare(event, item)}>PREPARAR PEDIDO</button>
              </div>
            )
          }
          )}
        </section>

        <section className="kitchen-orders">
          {preparingOrders && preparingOrders.map (function (item, index){
            const millisec = Date.parse(item.createdAt);
            const fullDate = new Date(millisec);
            const newFormatDate = fullDate.toLocaleString();
            return (
              <div key={index} className="preparing-orders">
                <ul>
                  <li>Pedido: {item.id} | Mesa: {item.table}</li>
                  <li>Cliente: {item.client_name}</li>
                  <li>Status: {item.status}</li>
                  <li>Data/Hora: {newFormatDate}</li><br />
                  <li className="items-list">{item.Products.map (function (productKit) {
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
                <button className="btn-kitchen" onClick={(event) => handleReady(event, item)}>MARCAR COMO PRONTO</button>
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
