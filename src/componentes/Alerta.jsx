import React from "react"

function Alerta({children}) {
  return (
    <div className="text-center my-4 bg-red-500 text-white uppercase
     font-bold p-1 rounded-sm">{children}</div>
  )
}
export default Alerta