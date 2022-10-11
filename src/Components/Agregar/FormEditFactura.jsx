import React, { useState, useContext } from "react";

import { Link, useParams } from "react-router-dom";

import Axios from "axios";

import { FacturasContext } from '../../Context/FacturasContext';

import {
  Box,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

function FormEditFactura( ) {

     const {
    listaFacturas,
    updateFactura
 } = useContext(FacturasContext);

  const id = useParams()

  const [form, setForm] = useState ({
    concepto: null,
    tipo: null,
    monto: null,
    fecha: null,
    categoria: null,

})


  // const [tipo, setTipo] = useState("ingreso");
  // const [categoria, setCategoria] = useState("");

  // const [listado, setListado] = useState([]);

  Axios.defaults.withCredentials = true;

  const selectCategoria = (e) => {
    setCategoria(e.target.value);
  }
    
  const selectTipo = (e) => {
    setTipo(e.target.value);
  };



  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      <FormControl fullWidth>
        <TextField
        margin="normal"
        label="Concepto"
        name="concepto"
        autoFocus
        type="text"
        // value={form.concepto}
        onChange={(e) => setForm({ ...form, [e.target.name] : e.target.value}) }

      />
        <TextField
        margin="normal"
        label="Monto"
        name="monto"
        autoFocus
        type="number"
        // value={form.monto}
        onChange={(e) => setForm({ ...form, [e.target.name] : e.target.value}) }


      />

        <Select
          label="Tipo"
          name="tipo"
        // value={form.tipo}
          // onChange={selectTipo}
        onChange={(e) => setForm({ ...form, [e.target.name] : e.target.value}) }


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
        // value={form.fecha}
                onChange={(e) => setForm({ ...form, [e.target.name] : e.target.value}) }


            />
        <Select
          label="Categoria"
          name="categoria"
        // value={form.categoria}
          // onChange={selectCategoria}
        onChange={(e) => setForm({ ...form, [e.target.name] : e.target.value}) }

        >
          <MenuItem value="entretenimiento">Entretenimiento</MenuItem>
          <MenuItem value="comida">Comida</MenuItem>
          <MenuItem value="hogar">Hogar</MenuItem>

        </Select>
      </FormControl>

      <Button onClick={() => updateFactura(id.id, form)} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Edit Tarea
      </Button>
    </Box>
  );
}

export default FormEditFactura;
