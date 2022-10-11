import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ListaFacturas from "../Pages/ListaFacturas";
import AgregarFactura from "../Components/Agregar/AgegarFactura";
import LoginPage from '../Pages/Login'
import Home from '../Pages/Home'
import FormEditFactura from "../Components/Agregar/FormEditFactura";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route exact path="/dashboard" element={<ListaFacturas />}></Route>
        <Route path="/agregar-factura" element={<AgregarFactura />}></Route>
        <Route path="/editar-factura/:id" element={<FormEditFactura />}></Route>


      </Routes>
    </Router>
  );
}

export default AppRouter;
