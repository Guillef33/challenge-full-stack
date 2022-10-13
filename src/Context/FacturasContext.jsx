import React, { useState, createContext, useEffect } from "react";

import Axios from "axios";

import Swal from "sweetalert2";

export const FacturasContext = createContext(null);

const FacturasProvider = (props) => {
  const [ingresos, setIngresos] = useState([]);
  const [egresos, setEgresos] = useState([]);
  const [listaFacturas, setListaFacturas] = useState([]);
  const [showIngresos, setShowIngresos] = useState(false);
  const [showEgresos, setShowEgresos] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function cancelarTurno(id) {
    Axios.delete(`http://localhost:3050/delete/${id}`, {}).then((response) => {
      console.log(response);
      Swal.fire({
        title: "Factura eliminada",
        text: "Excelente, ya no la veras en la lista",
        icon: "danger",
        confirmButtonText: "Seguir",
      });
      const newList = listaFacturas.filter((item) => item.id !== id);
      setListaFacturas(newList);
    });
  }

  const getFacturas = (e) => {
    Axios.get("http://localhost:3050/facturas").then((response) => {
      setListaFacturas(response.data);
    });
  };

  const filterIngresos = () => {
    console.log("Hola Filter Ingresos");

    let listado = listaFacturas.filter((ingreso) => ingreso.tipo === "ingreso");
    console.log(listado, "ingresos");
    setShowIngresos(!showIngresos);
    setShowEgresos(false);
    return listado;
  };

  const filterEgresos = () => {
    console.log("Hola Filter Egresos");

    let listado = listaFacturas.filter((egreso) => egreso.tipo === "egreso");

    /// Hacer algo tridimensional por string o number
    console.log(listado, "egresos");

    setShowEgresos(!showEgresos);
    setShowIngresos(false);
    return listado;
  };
  // Categorias

  const [showComida, setShowComida] = useState(false)

  const filterComidas = () => {
    console.log("Hola Filter Comidas");

    let listado = listaFacturas.filter((categoria) => categoria.categoria === "comida");

    console.log(listado, "comida");

    setShowEgresos(!showEgresos);
    setShowIngresos(false);
    setShowComida(true)
    return listado;
  };

  // const [categorias, setCategorias] = useState([
  //   "entretenimiento",
  //   "hogar",
  //   "comida",
  // ]);
  // const [categoria, setCategoria] = useState("");
  // const [comidas, setComidas] = useState([]);

  // const selectCategoria = (value) => {
  //   setCategoria(value);
  //   console.log(categoria);

  //   let categoriaLista = listaFacturas.filter(
  //     (categoria) => categoria.categoria === categoria
  //   );

  //   console.log(categoriaLista);
  //   return categoriaLista;
  // };

  // const filterCategoria = () => {
  //   let listado = listaFacturas.filter(
  //     (categoria) => categoria.tipo === categoriaLista
  //   );
  // };

  // const getComidas = (e) => {
  //   Axios.get("http://localhost:3050/categoria-hogar").then((response) => {
  //     setComidas(response.data);
  //   });
  // };

  // Analizar que dependencia puede generar el cambio
  useEffect(() => {
    getFacturas();
  }, []);

  const showAll = () => {
    setShowEgresos(false);
    setShowIngresos(false);
  };

  function editFactura(id) {
    console.log(id);
    setShowModal(true);

    Axios.put(`http://localhost:3050/update/${id}`, {
      concepto: "Trabajos de carpinteria",
      fecha: "29/02/22",
      monto: "2000",
      tipo: "egreso",
      categoria: "hogar",
      id: 1,
    }).then((response) => {
      console.log(response);
    });
  }

  const updateFactura = (id, form) => {
    const concepto = form.concepto;
    const monto = form.monto;
    const tipo = form.tipo;
    const fecha = form.fecha;
    const categoria = form.categoria;

    console.log(concepto, monto, tipo, fecha, categoria);

    Axios.put(`http://localhost:3050/update/${id}`, {
      concepto: concepto,
      fecha: fecha,
      monto: monto,
      tipo: tipo,
      categoria: categoria,
      id: id,
    }).then((response) => {
      console.log(response);
      Swal.fire({
        title: "Editaste tu factura",
        text: "Excelente, ya puedes verla actualizadda en la lista",
        icon: "success",
        confirmButtonText: "Seguir",
      });
    });
    // listado.push(factura)
    // setSubmitted(true);
  };

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
        categoria,
        setCategoria,
        categorias,
        setCategorias,
        selectCategoria,
        listaFacturas,
        showModal,
        setShowModal,
        updateFactura,
        comidas,
        getComidas,
        showIngresos,
        showEgresos,
        filterComidas,
        showComida,
        setShowComida
      }}
    >
      {props.children}
    </FacturasContext.Provider>
  );
};

export default FacturasProvider;
