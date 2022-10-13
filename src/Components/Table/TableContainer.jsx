import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  TableFooter,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import Axios from "axios";
import RowMap from "./RowMap";

import * as XLSX from "xlsx";

import { read, writeFileXLSX } from "xlsx";

import { FacturasContext } from "../../Context/FacturasContext";

import SelectorDeCategorias from "./SelectorDeCategorias";

import Swal from "sweetalert2";
function TableContainerMaster() {
  const {
    filterEgresos,
    filterIngresos,
    showAll,
    showIngresos,
    showEgresos,
    listaFacturas,
    editFactura,
    ingresos,
    egresos,
    showModal,
    setShowModal,
    showComida,
    filterComidas,
    comidas,
    setComidas,
    categorias,
    categoria,
    setCategorias,
    setCategoria,
    selectCategoria,
        categoriaSeleccionada,
    setCategoriaSeleccionada
  } = useContext(FacturasContext);

  const selectCategoryFromInput = (e) => {
    console.log("se ejecuta");
    console.log(e.target.value)
    setCategoria(e.target.value)
    selectCategoria(categoria)
  };

    console.log(categoria)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">
              <Button onClick={filterIngresos}>Ver solo ingresos</Button>
            </TableCell>
            <TableCell align="right">
              <Button onClick={filterEgresos}>Ver solo egresos</Button>
            </TableCell>
            <TableCell align="right">
              <Button onClick={showAll}>Ver todo</Button>
            </TableCell>
            <TableCell align="right">
              <Button onClick={filterComidas}>Ver solo comidas</Button>
            </TableCell>

            <SelectorDeCategorias />


          </TableRow>

          <TableRow>
            <TableCell>Concepto</TableCell>
            <TableCell align="right">Monto</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Tipo</TableCell>
            <TableCell align="right">Categoria</TableCell>
            <TableCell align="right">Editar</TableCell>
            <TableCell align="right">Borrar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

       {showIngresos ? (
            <RowMap lista={ingresos} editFactura={editFactura} />
          ) : 
        showEgresos ? (
            <RowMap lista={egresos} editFactura={editFactura} />
          ) 
          : showComida ? (
            <RowMap lista={categoriaSeleccionada} editFactura={editFactura} />
          ) 
          : (
            <RowMap lista={listaFacturas} editFactura={editFactura} />
          )
         }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableContainerMaster;
