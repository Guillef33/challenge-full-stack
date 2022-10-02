import React, { useState, useEffect } from "react";
import { Button, TableFooter, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

import Axios from 'axios'
import RowMap from "./RowMap";

import Swal from 'sweetalert2';


function FilterTable() {
 const [ingresos, setIngresos] = useState([]);
 const [egresos, setEgresos] = useState([]);
 const [listaFacturas, setListaFacturas] = useState([]);
 const [showIngresos, setShowIngresos] = useState(false)
 const [showEgresos, setShowEgresos] = useState(false)


  const getFacturas = (e) => {
    Axios.get("http://localhost:3050/facturas").then((response) => {
      setListaFacturas(response.data);
    });
  };
    const filterIngresos = () => {
     let listado = listaFacturas.filter(ingreso => ingreso.tipo === "ingreso")
     console.log(listado)
     setShowIngresos(!showIngresos)
     setShowEgresos(false)
     return listado;
    }

    const filterEgresos = () => {
     let listado = listaFacturas.filter(egreso => egreso.tipo === "egreso")
      setShowEgresos(!showEgresos)
      setShowIngresos(false)
     return listado;
    }

  const [categorias, setCategorias] = useState(['entretenimiento', 'hogar', 'comida']);
    const [categoria, setCategoria] = useState('');


  const selectCategoria = (e) => {
      console.log('Select Categoria')
      setCategoria(e.target.value);
      console.log(categoria)
     let categoriaLista = listaFacturas.filter(ingreso =>console.log(ingreso.categoria === categoria))
     console.log(categoriaLista)
     return categoriaLista;
      
    }

    
  const getIngresos = (e) => {
    Axios.get("http://localhost:3050/facturas-ingresos").then((response) => {
      setIngresos(response.data);
    });
  };

    const getEgresos = (e) => {
    Axios.get("http://localhost:3050/facturas-egresos").then((response) => {
      setEgresos(response.data);
    });
  };

  let totalIngresos = 0;

  const sumarMonto = ( tipo ) => {
  const plata = tipo.map(factura => factura.monto)
    for (let i = 0; i < plata.length; i++ ) {
        totalIngresos += plata[i]
      }
    return totalIngresos;
    }
    
  useEffect(() => {
    getFacturas();
    getIngresos();
    getEgresos();
  }, []);

  sumarMonto(ingresos)
  sumarMonto(egresos)

  const showAll = () => {
    setShowEgresos(false)
    setShowIngresos(false)
  }

  
    
    function cancelarTurno () {
         Swal.fire({
      title: 'Error!',
      text: 'Los campos no pueden estar vacios',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }

    function editarTurno() {
      Swal.fire({
      title: 'Error!',
      text: 'Los campos no pueden estar vacios',
      icon: 'error',
      confirmButtonText: 'Cool'
      
    })
    const res = Axios.put('http://localhost:3050/update',{
      concepto: concepto,  
      fecha: fecha,
      monto: monto,
      tipo: tipo,
      categoria: categoria,
    }).then((response) => {
      console.log(response);  
    });
    }





  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Concepto</TableCell>
            <TableCell align="right">Monto</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Tipo</TableCell>
            <TableCell align="right"><Button onClick={filterIngresos}>Ver solo ingresos</Button></TableCell>
            <TableCell align="right"><Button onClick={filterEgresos}>Ver solo egresos</Button></TableCell>
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
        </TableHead>
        <TableBody>
          {showIngresos      
          ? (   
            <RowMap lista={ingresos}  cancelarTurno={cancelarTurno} editarTurno={editarTurno} />
            )
           : (
            showEgresos ? (
            <RowMap lista={egresos} cancelarTurno={cancelarTurno} editarTurno={editarTurno} />
            ) : (
            <RowMap lista={listaFacturas} cancelarTurno={cancelarTurno} editarTurno={editarTurno} />
            ))}

        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total Ingresos</TableCell>
            <TableCell align="right">{totalIngresos}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}


export default FilterTable;