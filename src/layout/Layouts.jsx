import {Outlet, Link, useLocation } from 'react-router-dom'

function Layouts() {

    const location = useLocation(); // esto es para obtener la ruta actual
    const urlActual = location.pathname;
   // console.log(urlActual) // esto es para obtener la ruta actual
    return (
    <div className='md:flex md:min-h-screen '>
   
   <div className='md:w-1/4 bg-indigo-500 px-5 py-10'>
    <h2 className='text-3xl font-black text-center text-white'>
        CRM - CLIENTES
    </h2>
    <nav className='mt-10'>

    <Link to="/clientes" className={`${urlActual === "/clientes" ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300 uppercase shadow text-center`}>
        Clientes</Link>
    <Link to="/clientes/nuevo" className={`${urlActual === '/clientes/nuevo' ? 'text-blue-300' : 'text-white' } text-2xl block mt-2 hover:text-blue-300 uppercase shadow text-center`}>
        Nuevo Cliente</Link>

    </nav>
   </div>
    <div className='md:w-3/4 p-10 md:h-screen overflow-scroll' > 
    <Outlet />
    </div>

    </div>
  )
}
export default Layouts