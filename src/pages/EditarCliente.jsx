import React from "react"
import {useParams} from "react-router-dom"
import { useEffect,useState } from "react";
import Formulario from "../componentes/Formulario";

function EditarCliente() {

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
    
    <>
    {clienteId.id ? 
    <div> 
    <h1 className="font-black text-4xl text-blue-700 uppercase">Editar Cliente</h1>
    <p className="mt-3 font-bold uppercase ">Utiliza este formulario para editar el cliente</p>
    </div> : null}
    
    {clienteId.id ?  <Formulario clienteId={clienteId} cargando={cargando}/> : <p className="uppercase text-red-600 text-4xl font-semibold">Cliente id no valido</p>}
   
    </>
    
  )
}

export default EditarCliente