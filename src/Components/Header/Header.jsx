import React from "react";
import { Link } from "react-router-dom";

import './Nav.css'

function NavFacturas() {
  return (
    <ul className="flex-container">
      <h1>Facturas </h1>
      <Link to="/agregar-factura">Agregar Factura</Link>
      
      <Link to="/logout">Logout</Link>

    </ul>
  );
}

export default NavFacturas;
