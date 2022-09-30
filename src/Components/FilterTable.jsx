import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TableFooter } from '@mui/material'

import Axios from 'axios'

function FilterTable() {

 const [listaFacturas, setListaFacturas] = useState([]);

  const getFacturas = (e) => {
    Axios.get("http://localhost:3050/facturas").then((response) => {
      setListaFacturas(response.data);
    });
  };

  useEffect(() => {
    getFacturas();
  }, []);

    function cancelarTurno () {
    console.log('El turno va a ser cancelado. Enviar notificacion al cliente?')
  }

    function editarTurno() {
      console.log(
        "El turno va a ser editado. Enviar notificacion al cliente?"
      );
    }

    let totalIngresos = 0;

    const sumarMonto = () => {
      const plata = listaFacturas.map(item => item.monto)
      console.log(plata)
      for (let i = 0; i < plata.length; i++ ) {
        console.log(plata)
        totalIngresos += plata[i]
      }
      return totalIngresos;
    }

    sumarMonto()

    console.log(totalIngresos)


  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Concepto</TableCell>
            <TableCell align="right">Monto</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Tipo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaFacturas.map((item) => (
            <>
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.concepto}
              </TableCell>
              <TableCell align="right">{item.monto}</TableCell>
              <TableCell align="right">{item.fecha}</TableCell>
              <TableCell align="right">{item.tipo}</TableCell>
              <TableCell align="right"> <Button onClick={editarTurno}>Editar</Button></TableCell>        
              <TableCell align="right"> <Button onClick={cancelarTurno}>Eliminar</Button></TableCell>             
    
            </TableRow>
            
 
            </>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total Ingresos</TableCell>
            <TableCell align="right">{totalIngresos}</TableCell>

          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}


export default FilterTable;