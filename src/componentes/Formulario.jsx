import React from "react";
import {Formik,Form, Field} from "formik";
import * as Yup from "yup";
import Alerta from "./Alerta";
import {useNavigate} from "react-router-dom";

// con nuevoClienteSchema.shape se puede validar los campos del formulario junto con el metodo validateSchema hay que leer la documentacion de yup

function Formulario({clienteId,cargando}) {

    
    const navigate = useNavigate();
    
    const nuevoClienteSchema = Yup.object().shape({
            nombre: Yup.string()
            .min(3, "El nombre es corto")
            .max(20, "El nombre es muy largo")
            .required('El nombre es Obligatorio'),

            empresa: Yup.string()
            .required("El Nombre de la empresa es obligatorio"),

            email: Yup.string()
            .required("El email es obligatorio")
            .email("El email no es valido"),

            telefono: Yup.number()
            .integer('numero invalido')
            .positive(`numero invalido`)
           // .max(13, "El telefono debe tener 13 caracteres")
           // .min(9, "El telefono debe tener 13 caracteres")
            .typeError("El telefono debe ser un numero"),
            
            
    })

    const handlerSubimit = async (values) => {
        
              
            try { 
                let respuesta 

                if(clienteId.id){
                    //estoy editando un cliente
                    const url = `http://localhost:3000/clientes/${clienteId.id}`;
                         respuesta = await fetch(url, {
                            method: "PUT",
                            body: JSON.stringify(values),
                            headers: {
                                "Content-Type": "application/json"
                            }
                })}

                 else{   
                         //estoy creando un cliente

                const url = "http://localhost:3000/clientes";
                 respuesta = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })}
                
                await respuesta.json();
                navigate('/clientes')

            } catch (error) {
                console.log(error)
            

        }

       

    }

   /* Formik trae el onSubmit que me resuelve el submit sin hacer un handler submit y el 
   e.preventeDefaul y le puedo pedir los los valores tambien*/
    return (
        cargando ? <h1>Cargando...</h1> :(
    <div className=" bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">{clienteId.id ? "Editar Cliente" : "Agregar Cliente"}</h1>
       {/* esto es para que el formulario funcione con formik en vez de usar useState, lo treae formik... tengo que rodear todo el form con un array funtion tmb */}
        <Formik 
        initialValues={{
            nombre: clienteId.nombre ? clienteId.nombre : "",// si el clienteId.nombre es undefined entonces lo inicializo con un string vacio
            empresa: clienteId.empresa ? clienteId.empresa : "",
            telefono: clienteId.telefono ? clienteId.telefono : "",
            email: clienteId.email ? clienteId.email : "",
            notas:  clienteId.notas ? clienteId.notas : "",
        }}
        
        enableReinitialize={true} // metodo que trae formik para que se pueda reiniciar el formulario

        onSubmit={ async (value,{resetForm})=>{
          await handlerSubimit(value)
            resetForm()
        }}

        validationSchema={nuevoClienteSchema}

        >
            {({errors,touched}) => {
               // console.log(errors)
                return ( 

            <Form className="mt-10">
                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="nombre">Nombre:</label>
                    <Field type="text" 
                    className='mt-2 block w-full bg-gray-50' 
                    id='nombre'
                    placeholder='Nombre del Cliente'
                    name='nombre' />
                    {errors.nombre && touched.nombre ? (
                    
                        <Alerta> {errors.nombre}</Alerta>): null}
                </div>
                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="empresa">Empresa:</label>
                    <Field type="text" 
                    className='mt-2 block w-full bg-gray-50' 
                    id='empresa'
                    placeholder='Empresa del cliente'
                    name='empresa'/>
                    {errors.empresa && touched.empresa ? (<Alerta>{errors.empresa}</Alerta>) : null}
                </div>
                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="email">E-mail:</label>
                    <Field type="email" 
                    className='mt-2 block w-full bg-gray-50' 
                    id='email'
                    placeholder='E-mail del Cliente'
                    name='email' />
                    {errors.email && touched.email ? (<Alerta>{errors.email}</Alerta>) : null}
                </div>
                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="telefono">Telefono:</label>
                    <Field type="tel" 
                    className='mt-2 block w-full bg-gray-50' 
                    id='telefono'
                    placeholder='Telefono del Cliente'
                    name='telefono'/>
                    {errors.telefono && touched.telefono ? (<Alerta>{errors.telefono}</Alerta>) : null}
                </div>
                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="notas">Notas:</label>
                    <Field type="text" 
                    as="textarea"
                    className='mt-2 block w-full bg-gray-50 h-40' 
                    id='notas'
                    placeholder='Notas del Cliente'
                    name='notas'/>
                </div>
                <input 
                className='bg-blue-600 hover:bg-blue-700 text-white font-bold mt-5 p-3 w-full text-lg uppercase rounded-md' 
                type="submit" 
                value={clienteId.id ? "Editar Cliente" : "Agregar Cliente"}
                 />
                
   
            </Form>
            )}}
        </Formik>

    </div>)
  )
}
Formulario.defaultProps = {clienteId: {}, cargando:false} // si no hay clienteId, le pongo un objeto vacio
export default Formulario