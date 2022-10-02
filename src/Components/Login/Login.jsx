import React, { useState, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import Swal from 'sweetalert2';

function Login() {

  const [loginStatus, setLoginStatus] = useState("");

  let navigate = useNavigate();

  Axios.defaults.withCredentials = true;

    const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const loginValidations = (email, password) => {
        if (email === "" || password === "") {
     Swal.fire({
      title: 'Error!',
      text: 'Los campos no pueden estar vacios',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
      return;
    }

    if (email === "" && !regexEmail.test(email)) {
     Swal.fire({
      title: 'Error!',
      text: 'Debes escribir una direccion de correo electronico valida',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
      return;
    }


    Swal.fire({
      title: 'Todo bien!',
      text: 'Estamos listos para enviar la informacion',
      icon: 'success',
      confirmButtonText: 'Cool'
    })

  }

  const loginWeb = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password)
    loginValidations(email, password)
      console.log('Estoy aca')
    Axios.post("http://localhost:3050/login", {
      email: email,
      password: password,
    }).then((response) => {

      console.log(response)
      console.log('Estoy aca')
              navigate("/dashboard");

      // if (response.data.message) {
      //   console.log(response.data)
      //   setLoginStatus(response.data.message);
      // } else {
      //   setLoginStatus(response.data[0].username);

      // }
    });
  };

  return (
    <div className="loginContainer">
      <form onSubmit={loginWeb}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Ingrese su nombre"
          name="email"
        />
        <label>Password</label>

        <input
          type="password"
          placeholder="Ingrese su password"
          name="password"
        />

        <button type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Login;
