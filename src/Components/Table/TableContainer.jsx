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
        setComidas
  } = useContext(FacturasContext);

  // const selectCategoryFromInput = (e) => {
  //   console.log("se ejecuta");
  //   selectCategoria(e.target.value);
  // };

    console.log(comidas, "comida")
    console.log(showComida)
    


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
          {/*   <TableCell align="right">
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Categorias
                </InputLabel>
    
                <Select
                  native
                  label="Value"
                  value={categoria}
                  onChange={selectCategoryFromInput}
                >
                  <option aria-label="None" value="" />
                  {categorias.map((categoria, index) => (
                    <option key={index}>{categoria}</option>
                  ))}
                </Select> 
              </FormControl>
            </TableCell> */}
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
          ) : showEgresos ? (
            <RowMap lista={egresos} editFactura={editFactura} />
          ) 
          : showComida ? (
            <RowMap lista={comidas} editFactura={editFactura} />
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
