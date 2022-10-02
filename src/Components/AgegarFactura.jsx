import React, { useState } from "react";

import { Link } from "react-router-dom";

import Axios from "axios";


import {
  Box,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

function AgregarFactura({}) {

  const [tipo, setTipo] = useState("ingreso");
    const [categoria, setCategoria] = useState("");

  const [listado, setListado] = useState([]);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

    Axios.defaults.withCredentials = true;

    const selectCategoria = (e) => {
      setCategoria(e.target.value);
    }

    console.log(categoria)
    
  const selectTipo = (e) => {
    setTipo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const concepto = e.target.concepto.value;
    const monto = e.target.monto.value;
    const tipo = e.target.tipo.value;
    const fecha = e.target.fecha.value;
    const categoria = e.target.categoria.value;
    const factura = {
     concepto, monto, tipo, fecha
    }
    Axios.post("http://localhost:3050/add-bill", {
      concepto: concepto,  
      fecha: fecha,
      monto: monto,
      tipo: tipo,
      categoria: categoria,
    }).then((response) => {
      console.log(response);  
    });
        listado.push(factura)
    setSubmitted(true);
  };


  console.log(listado)

  return (
    <Box onSubmit={handleSubmit} component="form" noValidate sx={{ mt: 1 }}>
      <FormControl fullWidth>
        <TextField
        margin="normal"
        label="Concepto"
        name="concepto"
        autoFocus
        type="text"
      />
        <TextField
        margin="normal"
        label="Monto"
        name="monto"
        autoFocus
        type="number"
      />

        <Select
          label="Tipo"
          name="tipo"
          value={tipo}
          onChange={selectTipo}
        >
          <MenuItem value="ingreso">Ingreso</MenuItem>
          <MenuItem value="egreso">Egreso</MenuItem>
        </Select>
        <TextField 
            name="fecha"
            label="Fecha"
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            sx={{ mt: 3, mb: 2 }}
            />
        <Select
          label="Categoria"
          name="categoria"
          value={categoria}
          onChange={selectCategoria}
        >
          <MenuItem value="entretenimiento">Entretenimiento</MenuItem>
          <MenuItem value="comida">Comida</MenuItem>
          <MenuItem value="hogar">Hogar</MenuItem>

        </Select>
      </FormControl>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        See custom request
      </Button>
      <Button variant="outlined" component={Link} to="/dashboard">
        Back to home
      </Button>
    </Box>
  );
}

export default AgregarFactura;
