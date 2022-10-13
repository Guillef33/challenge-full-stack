import React,  { useContext } from 'react'

import { Button, TableFooter, TableCell, TableRow } from '@mui/material'

import ModalEdit from './ModalEdit'

import Axios from 'axios'

import Swal from 'sweetalert2';

import { FacturasContext } from '../../Context/FacturasContext';

import { Link } from "react-router-dom";


function TableCard( { item}) {

 const {
 cancelarTurno,
  showModal,
  setShowModal,
      editarFactura
 } = useContext(FacturasContext);


  return (
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
        <TableCell align="right">{item.categoria}</TableCell>
        <TableCell align="right"> 
      <Link to={`/editar-factura/${item.id}`}>Editar Factura</Link>
      </TableCell>   

           
        <TableCell align="right"> <Button onClick={() => cancelarTurno(item.id)}>Borrar</Button></TableCell>        
   
            
        {/* {showModal ? 
        <ModalEdit showModal={showModal} setShowModal={setShowModal} editarTurno={editarTurno} item={item}/>
        : null} */}


    </TableRow> 

    </>
    )
}

export default TableCard