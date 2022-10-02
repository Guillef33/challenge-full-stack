import React from 'react'

import { Button, TableFooter, TableCell, TableRow } from '@mui/material'

import TableCard from './TableCard'


function RowMap( {lista, editarTurno, cancelarTurno} ) {

  return (
        <>
    {lista.map((item) => (

      <TableCard item={item} editarTurno={editarTurno} cancelarTurno={cancelarTurno}/>
    

    

    
    ))}
    </>
  )
}

export default RowMap