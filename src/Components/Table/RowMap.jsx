import React from 'react'

import { Button, TableFooter, TableCell, TableRow } from '@mui/material'

import TableCard from './TableCard'


function RowMap( {lista, editarTurno, cancelarTurno, ingresos, egresos, showModal, setShowModal} ) {

  
//   let totalIngresos = 0;

// // Probar hacer el filtro de acuerdo a si es ingreso, egreso, o total
//   const sumarMonto = ( tipo ) => {
//   const plata = tipo.map(factura => factura.monto)
//     for (let i = 0; i < plata.length; i++ ) {
//         totalIngresos += plata[i]
//       }
//     return totalIngresos;
//     }

    
//   sumarMonto(ingresos)
//   sumarMonto(egresos)
//   sumarMonto(lista)

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