import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TableFooter, Select, MenuItem } from '@mui/material'

import Axios from 'axios'
import RowMap from "./RowMap";

function FilterTable() {
 const [ingresos, setIngresos] = useState([]);
 const [egresos, setEgresos] = useState([]);
 const [listaFacturas, setListaFacturas] = useState([]);
 const [showIngresos, setShowIngresos] = useState(false)
 const [showEgresos, setShowEgresos] = useState(false)


  const getFacturas = (e) => {
    Axios.get("http://localhost:3050/facturas").then((response) => {
      setListaFacturas(response.data);
    });
  };

    function cancelarTurno (boton) {
     const id = boton.target.value;
      const name = boton.target.name;

     console.log(id, name)
     console.log('El turno va a ser cancelado. Enviar notificacion al cliente?')
  }

    function editarTurno() {
      console.log(
        "El turno va a ser editado. Enviar notificacion al cliente?"
      );
    }

    const filterIngresos = () => {
     let listado = listaFacturas.filter(ingreso => ingreso.tipo === "ingreso")
     console.log(listado)
     setShowIngresos(!showIngresos)
     setShowEgresos(false)
     return listado;
    }

    const filterEgresos = () => {
     let listado = listaFacturas.filter(egreso => egreso.tipo === "egreso")
      setShowEgresos(!showEgresos)
      setShowIngresos(false)
     return listado;
    }

  const [categoria, setCategoria] = useState("");


  const filterCategorias = (e) => {
     let categoriaElegida = e.target.categoria.value;
     console.log(categoriaElegida)
     let categoriaLista = listaFacturas.filter(ingreso => ingreso.categoria === categoriaElegida)
     console.log(categoriaLista)
     return categoriaLista;
    }


  const getIngresos = (e) => {
    Axios.get("http://localhost:3050/facturas-ingresos").then((response) => {
      setIngresos(response.data);
    });
  };

    const getEgresos = (e) => {
    Axios.get("http://localhost:3050/facturas-egresos").then((response) => {
      setEgresos(response.data);
    });
  };

  let totalIngresos = 0;

  const sumarMonto = ( tipo ) => {
  const plata = tipo.map(factura => factura.monto)
    for (let i = 0; i < plata.length; i++ ) {
        totalIngresos += plata[i]
      }
    return totalIngresos;
    }
    
  useEffect(() => {
    getFacturas();
    getIngresos();
    getEgresos();
  }, []);

  sumarMonto(ingresos)
  sumarMonto(egresos)

  const showAll = () => {
    setShowEgresos(false)
    setShowIngresos(false)
  }


  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Concepto</TableCell>
            <TableCell align="right">Monto</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Tipo</TableCell>
            <TableCell align="right"><Button onClick={filterIngresos}>Ver solo ingresos</Button></TableCell>
            <TableCell align="right"><Button onClick={filterEgresos}>Ver solo egresos</Button></TableCell>
            <TableCell align="right"><Button onClick={showAll}>Ver todo</Button></TableCell>
            <TableCell align="right"><Select
            label="Categoria"
            name="categoria"
            value={categoria}
            onChange={filterCategorias}
            >
          <MenuItem value="entretenimiento">Entretenimiento</MenuItem>
          <MenuItem value="comida">Comida</MenuItem>
          <MenuItem value="hogar">Hogar</MenuItem>
        </Select>
        </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showIngresos      
          ? (   
            <RowMap lista={ingresos} editarTurno={editarTurno} cancelarTurno={cancelarTurno} />
            )
           : (
            showEgresos ? (
            <RowMap lista={egresos} editarTurno={editarTurno} cancelarTurno={cancelarTurno} />
            ) : (
            <RowMap lista={listaFacturas} editarTurno={editarTurno} cancelarTurno={cancelarTurno} />
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