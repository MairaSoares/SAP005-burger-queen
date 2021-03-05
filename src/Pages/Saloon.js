import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import logoSaloon from ".././images/LogoSaloonok.png";
import IconLogout from ".././images/IconLogout.png";
import { SectionMenu, ButtonMenu, ButtonQtd, ButtonLogout, CardSaloon, OrderDetails, Summary, Total, InputSaloon, ButtonSubmit, OrderInfo,  OrderInfo2, ButtonList } from "../Components/styleSaloon";


function Saloon() {

  // const [breakfastMenu, setBreakfastMenu] = useState([]);
  // const [allDayMenu, setAllDayMenu] = useState([]);
  const [menu, setMenu] = useState([]);
  const [clientName, setClientName] = useState("");
  const [table, setTable] = useState("");
  const productsList = [];
  const token = localStorage.getItem("token");
  const history = useHistory();
  const [itensMenu, setItens] = useState([]);
  const total = [];
  const [readyOrders, setReadyOrders] = useState([]);
  let totalTime = "";

  function logout(event) {
    event.preventDefault();
    localStorage.clear();
    history.push("/");
  }

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `${token}`);
  
     const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://lab-api-bq.herokuapp.com/products", requestOptions)
      .then(response => response.json())
      .then(result => {
        localStorage.setItem('totalFinish', ' ')
        console.log(result);
        setMenu(result)
        // const breakfast = result.filter(menuItem => menuItem.type === "breakfast");
        // const allDay = result.filter(menuItem => menuItem.type === "all-day");
        // setBreakfastMenu(breakfast);
        // setAllDayMenu(allDay);
      })
      .catch(error => console.log("error", error));
  }, [])

  function handleOrder(clientName, table, productsList) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ "client": clientName, "table": table, "products": productsList });
    console.log(raw);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://lab-api-bq.herokuapp.com/orders", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        alert(`Pedido ${result.id} criado com sucesso!`);
        window.location.reload();
      })
      .catch(error => console.log("error", error));
  }
  
  function handleClick(item) {
    item.qtd = 1;
    item.subtotal = item.price;
    setItens([...itensMenu, item]);
  }

  function additionProduct(event, item, index) {
    event.preventDefault();
    let quantItemAdd = [...itensMenu];
    let subtotalAdd = quantItemAdd[index].price;
    quantItemAdd[index].qtd +=1;
    item.subtotal = subtotalAdd * item.qtd;
    setItens(quantItemAdd);
    console.log(quantItemAdd);
  }

  function subtractionProduct(event, item, index) {
    event.preventDefault();
    let quantItemSub = [...itensMenu];
    let subtotalSub = quantItemSub[index].price;
    quantItemSub[index].qtd -=1;
    item.subtotal = subtotalSub * item.qtd;
    if (item.qtd <= 0 || item.subtotal <= 0) {
      quantItemSub.splice(index, 1);
      localStorage.removeItem('totalFinish')
    }
    setItens(quantItemSub);
    console.log(quantItemSub);
  }

  function getUpdatedOrders(event) {
    event.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `${token}`);

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch("https://lab-api-bq.herokuapp.com/orders", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      const ready = result.filter(orders => orders.status === "ready");
      setReadyOrders(ready);
    })
    .catch(error => console.log('error', error));
  }

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
        const array = [...readyOrders];
        setReadyOrders(array.filter(order => order.id != orderId));
      })
      .catch(error => console.log("error", error));
  }

  function handleDelivered(event, order) {
    event.preventDefault();
    order.status = "delivered";
    updateStatus(order.id, order.status);
  }

  function millisecToMinSec(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return (seconds == 60? (minutes + 1) + ": 00": minutes + ":" + (seconds <10? "0": "") + seconds);
  }


  return (
    <div className="saloon-page">
      <img className="logo" src={logoSaloon} />
      <ButtonLogout onClick={(event) => logout(event)}><img src={IconLogout} /></ButtonLogout>
      
      <OrderDetails>
        <InputSaloon type="text" required value={clientName}  onChange={(event) => setClientName(event.target.value)} />
        <label>Cliente</label>
        <InputSaloon type="text" value={table} onChange={(event) => setTable(event.target.value)} />
        <label>Mesa</label>
      </OrderDetails>
      
      <SectionMenu>
        {
          menu.map((menuItem, index) => {
            return (
              <div key={index}>
                <CardSaloon>
                  <h6><b><font size="4">{menuItem.name}</font></b></h6>
                  <p>R$ {menuItem.price}</p>
                  <p>{menuItem.flavor} {menuItem.complement}</p>
                  {/* <li>{menuItem.type}</li>
                  <li>{menuItem.sub_type}</li> */}
                  <ButtonMenu disabled={menuItem.qtd && menuItem.qtd != 0} onClick={() => handleClick(menuItem)}>Adicionar</ButtonMenu>
                </CardSaloon>
              </div>
            )
          })
        }
      </SectionMenu>

      <OrderInfo>
        <ButtonSubmit onClick={() => handleOrder(clientName, table, productsList)}>Enviar Pedido</ButtonSubmit>
        <section>
          <Total>
            TOTAL: R$ {localStorage.getItem('totalFinish')}
          </Total>
          {
          //itensMenu.length !== 0 &&
            itensMenu.map((item, index) => {
              let orderItem = {
                id: item.id,
                qtd: item.qtd
              }
              productsList.push(orderItem);
              total.push(item.subtotal);
              const totalSome = total.reduce((acomulate, elemento) => acomulate + elemento, 0);
              localStorage.setItem('totalFinish', totalSome);
              return (
                <Summary key={index}>
                  <ul>
                    <li>{item.name}</li>
                    <li>{item.flavor}</li>
                    <li>{item.complement}</li>
                    <li>R$ {item.subtotal}</li>
                    <ButtonQtd disabled={item.qtd === 0} onClick={(event) => subtractionProduct(event, item, index)}>-</ButtonQtd>
                    {item.qtd}
                    <ButtonQtd onClick={(event) => additionProduct(event, item, index)}>+</ButtonQtd>
                  </ul>
                </Summary>
              )
            })
          }
        </section>
      </OrderInfo>
            
      <OrderInfo2>
        <div>
          <h5>Pedidos Prontos</h5><ButtonList onClick={(event) => getUpdatedOrders(event)}>Atualizar lista</ButtonList>
        </div>
        {
          readyOrders.map((order, index) => {
            const millisec1 = Date.parse(order.createdAt);
            const millisec2 = Date.parse(order.updatedAt);
            const diff = millisec2 - millisec1;
            totalTime = millisecToMinSec(diff);
            return (
              <div key={index}>
                <br />
                <ul>
                  <li>Pedido: {order.id} | Mesa: {order.table}</li>
                  <li>Cliente: {order.client_name}</li>
                  <li>Tempo de preparo: {totalTime}</li>
                  <button onClick={(event) => handleDelivered(event, order)}>Entregue</button>
                </ul>
              </div>
            )
          })
        }
      </OrderInfo2>
    </div>
  )
}

export default Saloon;
