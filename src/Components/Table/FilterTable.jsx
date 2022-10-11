import React, { useState, useEffect } from "react";
import { Button, TableFooter, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

import Axios from 'axios'
import RowMap from "./RowMap";

import * as XLSX from "xlsx";

import { read, writeFileXLSX } from "xlsx";



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
     /// Hacer algo tridimensional por string o number
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

    
  // Analizar que dependencia puede generar el cambio 
  useEffect(() => {
    getFacturas();
    getIngresos();
    getEgresos();
  }, []);

  console.log(ingresos)


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

      const [showModal, setShowModal] = useState(false)


    function editFactura( id ) {

      console.log(id)
    //   Swal.fire({
    //   title: 'Error!',
    //   text: 'Los campos no pueden estar vacios',
    //   icon: 'error',
    //   confirmButtonText: 'Cool'
      
    // })

    setShowModal(true);

    const res = Axios.put(`http://localhost:3050/update/${id}`,{
      concepto: "Trabajos de carpinteria",  
      fecha: "29/02/22",
      monto: '2000',
      tipo: "egreso",
      categoria: "hogar",
      id: 1
    }).then((response) => {
      console.log(response);  
      
    });



    // Armar un formulario que tenga todos los datos que ya tiene la linea la tarea
    // Crear estado cuando se abra el formulario  
    // O abrir otra ventana aparte
    // Y cuando presione editar se le envian todos los datos del componente a 
    // Le das un value
    // Y cuando presione editar se le envia y se le da un mensaje

    }

    const handleExport = () => {
      console.log(listaFacturas)
      let wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(listaFacturas) ;

      XLSX.utils.book_append_sheet(wb, ws, "ListaFacturas1");

      XLSX.writeFile(wb, 'ListaFacturas.xlsx');
    }

      let totalIngresos = 0;

    // Probar hacer el filtro de acuerdo a si es ingreso, egreso, o total
      const sumarMonto = ( tipo ) => {
      const plata = tipo.map(factura => factura.monto)
        for (let i = 0; i < plata.length; i++ ) {
            totalIngresos += plata[i]
          }
        return totalIngresos;
        }

        
      sumarMonto(ingresos)
      sumarMonto(egresos)


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
{/* 
          pasar un string o un numero, y que le des el nombre de lo que queres renderizar
          {(if ingreso.tipo === 'ingresos') {
            render (
              
            )
          }

          } */}

          {showIngresos      
          ? (   
            <RowMap lista={ingresos}  cancelarTurno={cancelarTurno} editFactura={editFactura} ingresos={ingresos} egresos={egresos} showModal={showModal} setShowModal={setShowModal}  />
            )
           : (
            showEgresos ? (
            <RowMap lista={egresos} cancelarTurno={cancelarTurno} editFactura={editFactura} ingresos={ingresos} egresos={egresos} showModal={showModal} setShowModal={setShowModal}  />
            ) : (
            <RowMap lista={listaFacturas} cancelarTurno={cancelarTurno} editFactura={editFactura} ingresos={ingresos} egresos={egresos} showModal={showModal} setShowModal={setShowModal}  />
            ))}

        </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total Ingresos</TableCell>
                <TableCell align="right">{totalIngresos}</TableCell>
                        <TableCell align="right"> <Button onClick={handleExport}>Exportar a XLS</Button></TableCell>  

              </TableRow>
            </TableFooter>


      </Table>
    </TableContainer>
  );
}


export default FilterTable;