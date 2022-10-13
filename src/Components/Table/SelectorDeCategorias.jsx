import React, { useState, useContext } from 'react'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { FacturasContext } from "../../Context/FacturasContext";

function SelectorDeCategorias() {

  const {
    selectCategoria,
  } = useContext(FacturasContext);

  const [seleccion, setSeleccion] = useState('entretenimiento');

  const handleChange = (event) => {
    setSeleccion(event.target.value);
    console.log(seleccion)
     selectCategoria(seleccion)
  };


  return (

    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Elegir categoria</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={seleccion}
          label="Seleccion"
          onChange={handleChange}
        >
          <MenuItem value={'entretenimiento'}>Entretenimiento</MenuItem>
          <MenuItem value={'hogar'}>Hogar</MenuItem>
          <MenuItem value={'comida'}>Comida</MenuItem>
        </Select>
      </FormControl>
    </Box>


    // <TableCell align="right">
    //     <FormControl variant="outlined">
    //     <InputLabel htmlFor="outlined-age-native-simple">
    //         Categorias
    //     </InputLabel>
    //     <Select
    //         native
    //         label="Value"
    //         value={categoria}
    //         onChange={selectCategoryFromInput}
    //     >
    //         <option aria-label="None" value="" />
    //         {categorias.map((categoria, index) => (
    //         <option key={index}>{categoria}</option>
    //         ))}
    //     </Select> 
    //     </FormControl>
    // </TableCell>
  )
}

export default SelectorDeCategorias