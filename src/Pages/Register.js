import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import logo from ".././images/LogoCantinaok.png";
import {ButtonForm, WriteForm, TittleForm, ConfigForm, HeightRegister, DivCenter, InputRadio, DivRouter1 } from "../Components/styleLoginRegister";



function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  function saloonPage() {
    history.push("/saloon");
  }

  function kitchenPage() {
    history.push("/kitchen");
  }

  function registerUser(email, password, role, restaurant, name) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", `${email}`);
    urlencoded.append("password", `${password}`);
    urlencoded.append("role", `${role}`);
    urlencoded.append("restaurant", `${restaurant}`);
    urlencoded.append("name", `${name}`);

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow"
  };

  fetch("https://lab-api-bq.herokuapp.com/users", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      localStorage.setItem("token", result.token);
      if (result.role === "waiter") {
        saloonPage();
      }
      if (result.role === "chef") {
        kitchenPage();
      }
    })
    .catch(error => console.log("error", error));
  }

  function handleSubmit (event) {
    event.preventDefault();
    registerUser (email, password, role, restaurant, name)
  }

  return (
    <div className="register-page">
      <ConfigForm>
        <HeightRegister>
          <img className="logo" src= {logo}/>
          <TittleForm>Cadastro</TittleForm>

          <div>
            <label>
              Nome:
              <WriteForm type="text" placeholder="Nome do funcionário" value={name} onChange={(event) => setName(event.target.value)} />
            </label>
          </div>

          <div>
            <label>
              E-mail
            <WriteForm type="email" placeholder="exemplo@email.com" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
          </div>

          <div>
            <label>
              Senha:
              <WriteForm type="password" placeholder="Senha" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
          </div>

          <div>
            <label>
              Área de Trabalho:
              <InputRadio type="radio" name="role" value="waiter" onChange={(event) => setRole(event.target.value)} />Salão
              <InputRadio type="radio" name="role" value="chef" onChange={(event) => setRole(event.target.value)} />Cozinha
            </label>
          </div>

          <div>
            <label>
              Restaurante:
              <WriteForm type="text" placeholder="Nome do Restaurante" value={restaurant} onChange={(event) => setRestaurant(event.target.value)} />
            </label>
          </div>
        </HeightRegister>

        <DivCenter>
          <div>
              <ButtonForm type="submit" value="Enviar" onClick={(event) => handleSubmit(event)} />
          </div>
          <DivRouter1>
            Já tem conta? <NavLink to="/" style={{'color': '#1a1a1a','fontWeight': 'bold'}}>Entrar!</NavLink>
          </DivRouter1>
        </DivCenter>

      </ConfigForm>
    </div>
  )
}

export default Register;
