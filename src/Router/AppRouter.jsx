import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ListaFacturas from "../Pages/ListaFacturas";
import AgregarFactura from "../Components/Agregar/AgegarFactura";
import LogoutPage from '../Pages/LogoutPage'
import LoginPage from '../Pages/Login'

import AuthProvider from '../Context/AuthContext'


import Home from '../Pages/Home'
import FormEditFactura from "../Components/Agregar/FormEditFactura";

function AppRouter() {
  return (
    <Router>
      <AuthProvider>

      <Routes>

        <Route exact path="/" element={<Home />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/logout" element={<LogoutPage />}></Route>

        <Route exact path="/dashboard" element={<ListaFacturas />}></Route>
        <Route path="/agregar-factura" element={<AgregarFactura />}></Route>
        <Route path="/editar-factura/:id" element={<FormEditFactura />}></Route>
      </Routes>
    </AuthProvider>

    </Router>
  );
}

export default AppRouter;
