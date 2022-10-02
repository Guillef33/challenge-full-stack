import React from 'react'

import { Button, TableFooter, TableCell, TableRow } from '@mui/material'


function RowMap( {lista, editarTurno, cancelarTurno} ) {

    console.log(lista)

  return (
        <>
    {lista.map((item) => (
    
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
        <TableCell align="right"> <Button value={item.id} onClick={cancelarTurno}>Eliminar</Button></TableCell>             

    </TableRow>
    

    
    ))}
    </>
  )
}

export default RowMap