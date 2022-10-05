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

function FormEditFactura({ editFactura, item}) {

  const [tipo, setTipo] = useState("ingreso");
  const [categoria, setCategoria] = useState("");

  const [listado, setListado] = useState([]);

    Axios.defaults.withCredentials = true;

  const selectCategoria = (e) => {
    setCategoria(e.target.value);
  }

    
  const selectTipo = (e) => {
    setTipo(e.target.value);
  };



  return (
    <Box onSubmit={() => editFactura(item.id)} component="form" noValidate sx={{ mt: 1 }}>
      <FormControl fullWidth>
        <TextField
        margin="normal"
        label="Concepto"
        name="concepto"
        autoFocus
        type="text"
        value={item.concepto}
      />
        <TextField
        margin="normal"
        label="Monto"
        name="monto"
        autoFocus
        type="number"
        value={item.monto}

      />

        <Select
          label="Tipo"
          name="tipo"
          value={item.tipo}
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
            value={item.fecha}

            />
        <Select
          label="Categoria"
          name="categoria"
          value={item.categoria}
          onChange={selectCategoria}
        >
          <MenuItem value="entretenimiento">Entretenimiento</MenuItem>
          <MenuItem value="comida">Comida</MenuItem>
          <MenuItem value="hogar">Hogar</MenuItem>

        </Select>
      </FormControl>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Edit Tarea
      </Button>
      <Button variant="outlined" component={Link} to="/dashboard">
        Back to home
      </Button>
    </Box>
  );
}

export default FormEditFactura;
