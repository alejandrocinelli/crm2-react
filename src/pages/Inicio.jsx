import {useEffect, useState} from "react"
import Cliente from "../componentes/Cliente";
import { useNavigate } from "react-router-dom";

function Inicio() {

    const [clientes, setClientes] = useState([]);

   

    useEffect(() => {
      // una funcion que mire a db.json y me traiga los clientes
      // y los guarde en una variable
      
      const obtenerClientes = async () => {
        const respuesta = await fetch('http://localhost:3000/clientes')
        const clientes = await respuesta.json()
        //console.log(clientes)
        setClientes(clientes)
      
      }
      obtenerClientes()
      

    } , [])

    const handlerEliminar = async (id) => {
      
      const confirmar = confirm("Estas seguro que quieres eliminar este cliente?")
      if(confirmar){
        
        const url = `http://localhost:3000/clientes/${id}`;
        const respuesta = await fetch(url, {
          method: "DELETE"
        })
         await respuesta.json()
          setClientes(clientes.filter(cliente => cliente.id !== id))
        
      }
    }

  return (
    <>
    <h1 className="font-black text-4xl text-blue-700 uppercase">Clientes</h1>
    <p className="mt-3 uppercase font-bold" >Administra tus clientes</p>
    <table className="w-full mt-5 table-auto shadow bg-white">
      <thead className="bg-indigo-500 text-white">
        <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Acciones</th>
        </tr>
        
      </thead> 
      <tbody>
        {clientes.map(cliente => (
          <Cliente key={cliente.id} cliente={cliente} handlerEliminar={handlerEliminar} />
        ))}
      </tbody>
    </table>
    
    </>
  )
}
export default Inicio