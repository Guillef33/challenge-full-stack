import React, { useContext } from 'react'

import { Button, TableFooter, TableCell, TableRow } from '@mui/material'

import TableCard from './TableCard'

import { FacturasContext } from '../../Context/FacturasContext';


function RowMap( {lista, editarTurno, cancelarTurno, ingresos, egresos, showModal, setShowModal} ) {

     const {
      totalIngresos,
      sumarMonto
    } = useContext(FacturasContext);

     // Export como XLS
    const handleExport = () => {
      console.log(listaFacturas)
      let wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(listaFacturas) ;

      XLSX.utils.book_append_sheet(wb, ws, "ListaFacturas1");

      XLSX.writeFile(wb, 'ListaFacturas.xlsx');
    }



  return (
        <>
    {lista.map((item, index) => (

      <TableCard item={item} editarTurno={editarTurno} cancelarTurno={cancelarTurno} showModal={showModal} setShowModal={setShowModal} key={index}/>    
    ))}
      <TableRow>
        <TableCell>Total Ingresos</TableCell>
        {/* <TableCell align="right">{totalIngresos}</TableCell> */}
        <TableCell align="right"> <Button onClick={handleExport}>Exportar a XLS</Button></TableCell>  
      </TableRow>

    
    </>
  )
}

export default RowMap