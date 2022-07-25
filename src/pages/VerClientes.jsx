import React from "react"
import {useParams} from "react-router-dom"
import { useEffect,useState } from "react";

// con useparams puede saber el id de la pagina, mejor dicho ve lo que esta en la URL 

function VerClientes() {

    const [clienteId, setClienteId] = useState({})
    const {id} = useParams(); // y lo voy a desestructurar para poder usarlo
    const [cargando, setCargando] = useState(false)

    useEffect(() => {
        
        setCargando(!cargando)

        const obtieneCliente = async () => {
            
            const fetchData = await fetch(`http://localhost:3000/clientes/${id}`);
            const response = await fetchData.json();
            
            setClienteId(response);
            setCargando(false)
        }
        obtieneCliente()
    } , [])

  return (

    Object.keys(clienteId).length === 0 ?  <h2 className="text-2xl">No Existe el Cliente</h2> : (
    <>
    {cargando ? <h1>Cargando...</h1> : 
    <div>
    <h1 className="font-black text-4xl text-blue-700 uppercase">Cliente: {clienteId.nombre}</h1>
    <p className="mt-3 font-bold uppercase ">Informacion del Cliente</p>
    <div className="mt-10">
        <p className="text-2xl text-gray-500 mt-2">
            <span className=" uppercase font-bold text-gray-700">Cliente: </span> {clienteId.nombre}
        </p>
        <p className="text-2xl text-gray-500 mt-2">
            <span className=" uppercase font-bold text-gray-700">Empresa: </span> {clienteId.empresa}
        </p>
        <p className="text-2xl text-gray-500 mt-2">
            <span className=" uppercase font-bold text-gray-700">Email: </span> {clienteId.email}
        </p>
        <p className="text-2xl text-gray-500 mt-2">
            <span className=" uppercase font-bold text-gray-700">Telefono: </span> {clienteId.telefono}
        </p>

    {clienteId.notas && 
    <p className="text-2xl text-gray-500 mt-2">
            <span className=" uppercase font-bold text-gray-700">Notas: </span> {clienteId.notas}
        </p>}

    </div>
    </div>}
    </>
  ))
  
}
export default VerClientes