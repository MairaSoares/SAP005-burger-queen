import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


function Saloon() {

  const [menu, setMenu] = useState([]);
  const [clientName, setClient] = useState("");
  const [table, setTable] = useState("");
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const history = useHistory();
  const [itensMenu, setItens] = useState([]);
  const [addition, setAddition] = useState(1);
  const [subtraction, setSubtraction] = useState (-1);
  let idProducts = 0;

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
        console.log(result);
        setMenu(result)
      })
      .catch(error => console.log("error", error));
  }, [])

  function clientOrder(clientName, table, contador, id) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ "client":{clientName}, "table":{table}, "products":[{ "id": id,"qtd": contador }]});

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://lab-api-bq.herokuapp.com/orders", requestOptions)
      .then(response => response.json())
      .then(result => setMenu(result))
      .catch(error => console.log("error", error));
  }
  
  function handleClick (item) {
    item.qtd = 1;
    setItens([...itensMenu, item]); 
    console.log(item);
    /*contador +=1;
    const obj = {
      id: item.id,
      qtd: contador,
    };
    
    setProducts((prevState) => [...prevState, obj]);
    console.log(products);
    console.log(itensMenu);*/

  }

  function handleOrder(event) {
    event.preventDefault();
    clientOrder (clientName, table, products, idProducts, addition);
  }

  
  const additionProduct = (event, item, index) => {
    event.preventDefault();
    let quantItemAddition = [...itensMenu]
    quantItemAddition[index].qtd +=1;
    setItens(quantItemAddition);
    console.log(item);
  }

  const subtractionProduct = (event, item, index) => {
    event.preventDefault();
    let quantItemSub = [...itensMenu]
    quantItemSub[index].qtd -=1;
    setItens(quantItemSub);
    console.log(item);
  }


  return (
    <div className="saloon-page">
      <h1>Salão</h1>
      <button onClick={(event) => logout(event)}>Sair</button>
      

      <main>
        <section className="menu-area">
          {
            menu.map((menuItem, index) => {
              return (
                <div className="products" key={index}>
                  <button className="choose-item-btn" onClick={() => handleClick(menuItem)}>Adicionar</button>
                  <ul>
                    <li>{menuItem.name}</li>
                    <li>{menuItem.flavor}</li>
                    <li>{menuItem.complement}</li>
                    <li>R$ {menuItem.price}</li>
                    {/* <li>{menuItem.type}</li>
                    <li>{menuItem.sub_type}</li> */}
                  </ul>
                </div>
              )
            })
          }
        </section>

        <aside className="order-info">
          <div className="order-details">
            <label>
              Cliente:
              <input type="text" value={clientName} onChange={(event) => setClient(event.target.value)} />
            </label>
            <label>
              Mesa:
              <input type="text" value={table} onChange={(event) => setTable(event.target.value)} />
            </label>
            <br /><button className="post-order-btn" onClick={(event) => handleOrder(event)}>Enviar Pedido</button> 
          </div>

          <section>
            {
              itensMenu.length !== 0 &&
              itensMenu.map((item, index) => {
                // console.log(itensMenu);
                idProducts = item.id;
                return (
                  <div key= {index} className="order-summary">
                    <ul>
                      <li>{item.name}</li>
                      <li>{item.flavor}</li>
                      <li>{item.complement}</li>
                      <li>R$ {item.price}</li>
                    </ul>
                    <button className="qtd-item-btn" onClick={(event) => additionProduct(event, item, index)}>+</button>
                    {item.qtd}
                    <button className="qtd-item-btn" onClick={(event) => subtractionProduct(event, item, index)}>-</button>
                  </div>
                )
              })
            }
          </section>
        </aside>
      </main>
    </div>
  )
}

export default Saloon;
