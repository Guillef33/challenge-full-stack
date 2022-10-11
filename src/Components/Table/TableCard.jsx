import React,  { useContext } from 'react'

import { Button, TableFooter, TableCell, TableRow } from '@mui/material'

import ModalEdit from './ModalEdit'

import Axios from 'axios'

import Swal from 'sweetalert2';

import { FacturasContext } from '../../Context/FacturasContext';

function TableCard( { item, cancelarTurno, editarTurno, showModal, setShowModal }) {

//   const {
//     cancelarTurno
//   } = useContext(FacturasContext);

function cancelarTurno (id) {
    Axios.delete(`http://localhost:3050/delete/${id}`, {

      }).then((response) => {
         Swal.fire({
        title: 'Factura eliminada',
        text: 'Excelente, ya no la veras en la lista',
        icon: 'danger',
        confirmButtonText: 'Seguir'
    })
    // Todo bien pero no actualiza la pagina
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