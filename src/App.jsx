import { useState } from 'react'
import AppRouter from './Router/AppRouter'

import FacturasProvider from './Context/FacturasContext'

export default function App() {

  return (
        <FacturasProvider>
            <AppRouter />
        </FacturasProvider>

   
  )
}

