import React, { useState, useEffect, useContext } from "react";
import "./login.css";
import Axios from "axios";

import Swal from 'sweetalert2';

import {AuthContext} from "../../Context/AuthContext";

function Login() {

  const {
      auth,
      loginWeb,
      user
  } = useContext(AuthContext); 

  console.log(user)

  Axios.defaults.withCredentials = true;


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
