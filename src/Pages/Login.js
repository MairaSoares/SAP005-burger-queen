import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import logo from ".././images/LogoCantinaok.png";
import { ButtonForm, WriteForm, TittleForm, HeightLogin, ConfigForm, DivCenter, DivRouter2 } from "../Components/styleLoginRegister";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [token, setToken] = useState("");
  const history = useHistory();

  function saloonPage() {
    history.push("/saloon");
  }

  function kitchenPage() {
    history.push("/kitchen");
  }

  function loginAuth(email, password) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", `${email}`);
    urlencoded.append("password", `${password}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow"
  };

  fetch("https://lab-api-bq.herokuapp.com/auth", requestOptions)
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
    loginAuth (email, password)
    console.log(loginAuth);
  }
  
  return (
    <div className="login-page">
      <ConfigForm>
        <HeightLogin>
          <img className="logo" src={logo}/>
          <TittleForm>Login</TittleForm>

          <div>
            <label>
              E-mail:
              <WriteForm type="email" placeholder= "Informar e-mail" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
          </div>
          <div>
            <label>
              Senha:
              <WriteForm type="password" placeholder="Informar senha" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
          </div>
        </HeightLogin>

        
        <DivCenter>
          <div>
            <ButtonForm type="submit" value="ENTRAR" onClick={(event) => handleSubmit(event)}/>
          </div>
          <DivRouter2> 
            Não tem conta? <NavLink to="/register" style={{'color': '#1a1a1a','fontWeight': 'bold'}}>Cadastre-se!</NavLink>
          </DivRouter2>
        </DivCenter>

      </ConfigForm>
    </div>
  )
}

export default Login;
