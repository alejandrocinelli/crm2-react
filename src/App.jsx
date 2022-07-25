import { useState } from 'react'
import {BrowserRouter, Router, Route, Link, Routes} from 'react-router-dom'
import Layouts from './layout/Layouts'
import EditarCliente from './pages/EditarCliente'
import Inicio from './pages/Inicio'
import NuevoCliente from './pages/NuevoCliente.jsx'
import VerClientes from './pages/VerClientes'

function App() {
 

  return (
   <BrowserRouter>
   <Routes>
    
    <Route path='clientes' element={<Layouts/>}> {/* este seria el masterpage*/}
      <Route index element={<Inicio/>} /> {/* con estu puedo usar el outlet de react-dom y puedo agrupar varios rutas en layout */}
      <Route path='nuevo' element={<NuevoCliente/>}/>
      <Route path='editar/:id' element={<EditarCliente/>}/>
      <Route path=':id' element={<VerClientes/>}/>
    </Route>

   </Routes>
   </BrowserRouter>
  )
}

export default App
