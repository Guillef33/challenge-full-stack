import React, { useState, createContext, useEffect } from "react";

import Axios from "axios";

import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";


export const AuthContext = createContext(null);

const AuthProvider = (props) => {

  const [user, setUser] = useState(null)

  let navigate = useNavigate();

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
title: "Todo bien",
text: "Bienvenido a Facturas App",
icon: "sucess",
confirmButtonText: "Ingresa"
})


  }

    const [loginStatus, setLoginStatus] = useState("");


  const loginWeb = (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  console.log(email, password)
  loginValidations(email, password)
  setUser(email, password)
  // console.log('Estoy aca')
  Axios.post("http://localhost:3050/login", {
    email: email,
    password: password,
  }).then((response) => {
    console.log(response.data)

    if (response.data.message) {
      setLoginStatus(response.data.message)
        Swal.fire({
      title: 'Error!',
      text: `${response.data.message}`,
      icon: 'error',
      confirmButtonText: 'Cool'
    })
    } else {
     navigate("/dashboard");

    }

  });
  };

  const logout = () => {
    setUser(null)
  }

  const auth = {
    user
  }

  // function useAuth () {
  //  const auth = useContext(AuthContext)
  //  return auth;
  // }

 

  return (
    <AuthContext.Provider
      value={{
        auth,
        loginValidations,
        user,
        loginWeb
      
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
