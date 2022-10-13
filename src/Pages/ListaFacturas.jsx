import React from "react";

import Header from "../Components/Header/Header";
// import FilterTable from "../Components/Table/FilterTable";
import TableContainerMaster from "../Components/Table/TableContainer";
// import FilterTable from "../Components/Table/FilterTable";

function ListaFacturas() {
  return (
    <>
      <Header />
      {/* <FilterTable /> */}
      <TableContainerMaster />
    </>
  );
}

export default ListaFacturas;
