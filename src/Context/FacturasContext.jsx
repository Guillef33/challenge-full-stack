import React, { useState, createContext, useEffect } from "react";


import Axios from 'axios'

import Swal from 'sweetalert2';

export const FacturasContext = createContext(null);



const FacturasProvider = (props) => {

  


const [ingresos, setIngresos] = useState([]);
 const [egresos, setEgresos] = useState([]);
 const [listaFacturas, setListaFacturas] = useState([]);
 const [showIngresos, setShowIngresos] = useState(false)
 const [showEgresos, setShowEgresos] = useState(false)
const [showModal, setShowModal] = useState(false)

function cancelarTurno (id) {
    Axios.delete(`http://localhost:3050/delete/${id}`, {

      }).then((response) => {
        console.log(response)
         Swal.fire({
        title: 'Factura eliminada',
        text: 'Excelente, ya no la veras en la lista',
        icon: 'danger',
        confirmButtonText: 'Seguir'
    })
    const newList = listaFacturas.filter(item => item.id !== id);
    setListaFacturas(newList)
    });
  }

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

  // Categorias

  const [categorias, setCategorias] = useState(['entretenimiento', 'hogar', 'comida']);
  const [categoria, setCategoria] = useState('');


  const selectCategoria = (e) => {
     console.log('Select Categoria')
     setCategoria(e.target.value);
     console.log(categoria)
     let categoriaLista = listaFacturas.filter(ingreso => console.log(ingreso.categoria === categoria))
     console.log(categoriaLista)
     return categoriaLista; 
    }

    const filterCategoria = () => {
      let listado = listaFacturas.filter(categoria => categoria.tipo === categoriaLista)
    }

  // Analizar que dependencia puede generar el cambio 
  useEffect(() => {
    getFacturas();
    getIngresos();
    getEgresos();
  }, []);

  const showAll = () => {
    setShowEgresos(false)
    setShowIngresos(false)
  }

  function editFactura( id ) {

      console.log(id)
      setShowModal(true);

      Axios.put(`http://localhost:3050/update/${id}`,{ 
      
      concepto: "Trabajos de carpinteria",  
      fecha: "29/02/22",
      monto: '2000',
      tipo: "egreso",
      categoria: "hogar",
      id: 1
    }).then((response) => {
      console.log(response);  
      
    });

    }

    const updateFactura = ( id, form ) => {

    const concepto = form.concepto;
    const monto =form.monto;
    const tipo = form.tipo;
    const fecha = form.fecha;
    const categoria = form.categoria;

    console.log(concepto, monto, tipo, fecha, categoria)

    Axios.put(`http://localhost:3050/update/${id}`, {
      concepto: concepto,  
      fecha: fecha,
      monto: monto,
      tipo: tipo,
      categoria: categoria,
      id: id
    }).then((response) => {
      console.log(response);  
      Swal.fire({
      title: 'Editaste tu factura',
      text: 'Excelente, ya puedes verla actualizadda en la lista',
      icon: 'success',
      confirmButtonText: 'Seguir'
    })
    });
    // listado.push(factura)
    // setSubmitted(true);
  };



  
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
  sumarMonto(listaFacturas)


  return (
    <FacturasContext.Provider
      value={{      
        ingresos,
      setIngresos,
      egresos,
      setEgresos,
      cancelarTurno,
      showAll,
      editFactura,
      getFacturas,
      filterIngresos,
      filterEgresos,
      getIngresos,
      getEgresos,
      categoria,
      setCategoria,
      categorias,
      setCategorias,
      selectCategoria,
      listaFacturas,
      showModal,
      setShowModal,
      totalIngresos,
      sumarMonto,
      updateFactura

      }}
    >
    {props.children}
    </FacturasContext.Provider>
  );
};

export default FacturasProvider;
