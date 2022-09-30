import React, { useState, useEffect} from "react";

import FilterTable from "./FilterTable";

import Axios from 'axios'


function ListFacturas() {



  return (
    <div className="flex-container">

            <FilterTable />  


    </div>
  );
}

export default ListFacturas;
