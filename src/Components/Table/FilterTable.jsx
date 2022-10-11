import React, { useState, useEffect, useContext } from "react";
import { Button, TableFooter, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

import Axios from 'axios'
import RowMap from "./RowMap";

import * as XLSX from "xlsx";

import { read, writeFileXLSX } from "xlsx";

import { FacturasContext } from '../../Context/FacturasContext';

import Swal from 'sweetalert2';


function FilterTable() {

   const {
 filterEgresos,
 filterIngresos,
 showAll,
 categoria,
 categorias,
 selectCategoria,
 showIngresos,
 showEgresos,
 listaFacturas,
 editFactura,
 ingresos,
 egresos,
 showModal,
 setShowModal,
 } = useContext(FacturasContext);



 
  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow>
            {/* <TableCell align="right"><Button onClick={filterIngresos}>Ver solo ingresos</Button></TableCell>
            <TableCell align="right"><Button onClick={filterEgresos}>Ver solo egresos</Button></TableCell> */}
            <TableCell align="right"><Button onClick={showAll}>Ver todo</Button></TableCell>
            <TableCell align="right">
              <FormControl variant="outlined"> 
                <InputLabel htmlFor="outlined-age-native-simple">
                  Categorias
                </InputLabel>
                <Select native label="Value" value={categoria} onChange={selectCategoria}>
                  <option aria-label="None" value="" />
                    {categorias.map((categoria, index) =>
                      <option key={index} >{categoria}</option>    
                    )}                             
                </Select>
              </FormControl>
           </TableCell>
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
          {/* 
          pasar un string o un numero, y que le des el nombre de lo que queres renderizar
          {(if ingreso.tipo === 'ingresos') {
            render (
              
            )
          }

          } 
          {/*
          {if (ingreso.tipo === "ingresos") {
            render (
            <RowMap lista={ingresos}  cancelarTurno={cancelarTurno} editFactura={editFactura} ingresos={ingresos} egresos={egresos} showModal={showModal} setShowModal={setShowModal}  />
            )
          }
          
          if (ingresos.tipo === "egresos") {
            render (
            <RowMap lista={egresos} cancelarTurno={cancelarTurno} editFactura={editFactura} ingresos={ingresos} egresos={egresos} showModal={showModal} setShowModal={setShowModal}  />
          )
          } 

          else (
            <RowMap lista={listaFacturas} cancelarTurno={cancelarTurno} editFactura={editFactura} ingresos={ingresos} egresos={egresos} showModal={showModal} setShowModal={setShowModal}  /> 
          )           
          } 
          {/* */}
          {showIngresos      
          ? (   
            <RowMap lista={ingresos}   editFactura={editFactura} ingresos={ingresos} egresos={egresos} showModal={showModal} setShowModal={setShowModal}  />
            )
           : (
            showEgresos ? (
            <RowMap lista={egresos}  editFactura={editFactura} ingresos={ingresos} egresos={egresos} showModal={showModal} setShowModal={setShowModal}  />
            ) : (
            <RowMap lista={listaFacturas}  editFactura={editFactura} ingresos={ingresos} egresos={egresos} showModal={showModal} setShowModal={setShowModal}  />
            ))}

        </TableBody>
         


      </Table>
    </TableContainer>
  );
}


export default FilterTable;