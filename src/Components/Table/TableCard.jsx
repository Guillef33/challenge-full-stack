import React from 'react'

import { Button, TableFooter, TableCell, TableRow } from '@mui/material'

import ModalEdit from './ModalEdit'

import Axios from 'axios'


function TableCard( { item, cancelarTurno, editarTurno, showModal, setShowModal }) {


    function cancelarTurno (id) {
      Axios.delete(`http://localhost:3050/delete/${id}`, {

      }).then((response) => {
      console.log(response);  
      
    });

  }


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
        <TableCell align="right"> <Button onClick={() => setShowModal(true)}>Editar</Button></TableCell>     
        <TableCell align="right"> <Button onClick={() => cancelarTurno(item.id)}>Borrar</Button></TableCell>        
   
              

        {showModal ? 
        <ModalEdit showModal={showModal} setShowModal={setShowModal} editarTurno={editarTurno} item={item}/>
        : null}


    </TableRow> 

    </>
    )
}

export default TableCard