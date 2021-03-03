import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import logoSaloon from ".././images/LogoSaloonok.png";
import { SectionMenu, ButtonMenu, ButtonQtd, ButtonLogout } from "../Components/styleSaloon";


function Saloon() {

  const [menu, setMenu] = useState([]);
  const [clientName, setClientName] = useState("");
  const [table, setTable] = useState("");
  const productsList = [];
  const token = localStorage.getItem("token");
  const history = useHistory();
  const [itensMenu, setItens] = useState([]);
  const total = [];

  function logout() {
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
        // Limpar form ao enviar pedido !
      })
      .catch(error => console.log("error", error));
  }
  
  function handleClick(item) {
    item.qtd = 1;
    item.subtotal = item.price;
    setItens([...itensMenu, item]);
    //console.log(item);
    //console.log(itensMenu);
  }

  const additionProduct = (event, item, index) => {
    event.preventDefault();
    let quantItemAdd = [...itensMenu];
    let subtotalAdd = quantItemAdd[index].price;
    quantItemAdd[index].qtd +=1;
    item.subtotal = subtotalAdd * item.qtd;
    setItens(quantItemAdd);
    console.log(quantItemAdd);
  }

  const subtractionProduct = (event, item, index) => {
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


  return (
    <div className="saloon-page">
      <img className="logo" src={logoSaloon} />
      <ButtonLogout onClick={(event) => logout(event)}>Sair</ButtonLogout>
      
      <main>
        <SectionMenu>
          {
            menu.map((menuItem, index) => {
              return (
                <div key={index}>
                  <ButtonMenu disabled={menuItem.qtd && menuItem.qtd != 0} onClick={() => handleClick(menuItem)}>
                    <ul>
                      <li>{menuItem.name}</li>
                      <li>{menuItem.flavor}</li>
                      <li>{menuItem.complement}</li>
                      <li>R$ {menuItem.price}</li>
                      {/* <li>{menuItem.type}</li>
                      <li>{menuItem.sub_type}</li> */}
                    </ul>
                  </ButtonMenu>
                </div>
              )
            })
          }
        </SectionMenu>

        <aside className="order-info">
          <div className="order-details">
            <label>
              Cliente:
              <input type="text" value={clientName} className="btntransp"  onChange={(event) => setClientName(event.target.value)} />
            </label>
            <label>
              Mesa:
              <input type="text" className="btntransp" value={table} onChange={(event) => setTable(event.target.value)} />
            </label>
            <br /><button className="post-order-btn" onClick={() => handleOrder(clientName, table, productsList)}>Enviar Pedido</button> 
          </div>

          <section>
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
                  <div key={index} className="order-summary">
                    <ul>
                      <li>{item.name}</li>
                      <li>{item.flavor}</li>
                      <li>{item.complement}</li>
                      <li>R$ {item.subtotal}</li>
                    </ul>
                    <ButtonQtd disabled={item.qtd === 0} onClick={(event) => subtractionProduct(event, item, index)}>-</ButtonQtd>
                    {item.qtd}
                    <ButtonQtd onClick={(event) => additionProduct(event, item, index)}>+</ButtonQtd>
                  </div>
                )
              })
            }
            <div>
              TOTAL: R$ {localStorage.getItem('totalFinish')}
            </div>
          </section>
        </aside>
      </main>
    </div>
  )
}

export default Saloon;
