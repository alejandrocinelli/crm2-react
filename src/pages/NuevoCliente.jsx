import React from "react";
import Formulario from "../componentes/Formulario";

function NuevoCliente() {
  return (

    <>
    <h1 className="font-black text-4xl text-blue-700 uppercase">Nuevo Cliente</h1>
    <p className="mt-3 font-bold uppercase ">LLena los siguientes campos para registrar un cliente</p>
    <Formulario/>
    </>
    
  )
}
export default NuevoCliente