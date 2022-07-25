import React from "react"
import {useNavigate} from "react-router-dom";


function Cliente({cliente,handlerEliminar}) {

    const navigate = useNavigate();

  return (
    <tr className="border-b hover:bg-gray-50">
        <td className="p-3">{cliente.nombre}</td>
        <td className="p-3">{cliente.empresa}</td>
        <td className="p-3">
        <p><span className="text-gray-800 uppercase font-bold">Phono: </span>{cliente.telefono}</p>
            <p><span className="text-gray-800 uppercase font-bold">Email: </span>{cliente.email}</p>
        </td>
        <td className="p-3 ">
        <button 
            type="button"
            className="bg-sky-600 hover:bg-sky-700 mt-1 text-white font-bold p-2 w-full text-xs uppercase rounded-sm"
            onClick={() => navigate(`/clientes/${cliente.id}`)}
            >VER</button>
            <button 
            type="button"
            className="bg-blue-600 hover:bg-blue-700 mt-1 text-white font-bold p-2 w-full text-xs uppercase rounded-sm"
            onClick={ () => navigate(`/clientes/editar/${cliente.id}`)}
            >Editar</button>

            <button
             type="button"
             className="bg-red-600 hover:bg-red-700 mt-1 text-white font-bold p-2 w-full text-xs uppercase rounded-sm"
            onClick={() => handlerEliminar(cliente.id)}
            >Eliminar</button>

        </td>

    </tr>
  )
}
export default Cliente