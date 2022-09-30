import React from 'react'

        import { Link } from "react-router-dom";


function Home() {
  return (
    <div>
        <h2>Bienvenido</h2>
      <Link to="/login">Ingresa para conocer las facturas</Link>
    </div>
  )
}

export default Home