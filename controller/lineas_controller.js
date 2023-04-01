/**
 * Este módulo exporta las funciones addLineaFavorita y obtenerMisLineas.
 * Primero, importamos dependencias.
 */

const { conexion } = require('../data_base/database-config');
const { response, request } = require('express');
const {internalServerError} = require ('../helpers/utility.helper');
const {obtenerLineasDeUsuario} = require('../data_base/DAO/lineas.dao');

//Pre-condicion Middleware JWT validar = obtengo el id de Usuario


// Antes de ejecutar addLineaFavorita, se ejecuta el middleware para verificar el JWT y si el usuario ha iniciado sesión 
// Tras esto, se extrae el id del usuario, incluido en el JWT, y los datos del body con la Id del Consorcio y la Id de la Linea
// Estos dos datos son necesarios debidos a la API externa a la que se conecta la aplicación desde el FrontEnd
// Luego, se llama a la función comprobarSiExisteLinea que verifica si el usuario ya ha guardado la línea. 
// Si la línea ya está guardada, se devuelve un error 400. 
// Sino, se llama a la función insertarLinea para agregar la línea favorita a la BD en relación con dicho usuario.

function addLineaFavorita(peticion = request, respuesta = response) {
    const idUsuario = peticion.idUsuario;
    const {idConsorcio, idLinea} = peticion.body; //hace falta el dato del idDelConsorcio para cargar el enlace de la API
    try {
        //solo se va a permitir almacenar la información al usuario si no ha guardado antes la Línea
        comprobarSiExisteLinea(idUsuario, idConsorcio, idLinea);  
    } catch (error) {
        internalServerError(respuesta);
    }

    function comprobarSiExisteLinea(idUsuario, idConsorcio, idLinea) {
        let query = `SELECT idUsuario from lineas_de_usuarios where idLinea=?`;
        conexion.query(query, [idLinea], (errors, result) => {
            if (errors){
                throw errors
            }
            if(result.length > 0){  //si el resultado es mayor que cero significa que esa línea ya existe en el registro
                respuesta.status(400).json({
                    mensaje: `Ya has guardado esa línea en favoritos`
                })
            } else {
                insertarLinea(idUsuario, idConsorcio, idLinea);
            }
        })
    }

    // insertarLinea es una función que ejecuta una consulta INSERT SQL
    // Sirve para agregar la línea a la BD en relación con el ID del usuario. 
    // Si hay algún error, se devuelve error. 
    // Si se realiza con éxito, se lanza una respuesta 201 que informna que se ha guardado la línea.
    
    function insertarLinea(idUsuario, idConsorcio, idLinea) { //aquí tenemos la orden de insertar el id de la Línea con el del usuario
        let query = `INSERT INTO lineas_de_usuarios (idUsuario, idConsorcio, idLinea) VALUES (?,?,?)`
    
        conexion.query(query, [idUsuario, idConsorcio, idLinea], (errors, result) => {
            if (errors) {
                internalServerError(respuesta);
            }
            if (result) {
                respuesta.status(201).json({
                    mensaje: `Has guardado con éxito la línea ${idLinea}`
                })
            }
        })
    }    
}

// Esta función devuelve un json con las líneas del usuario que hace la petición
// Primero, el middleware valida el JWT y extrae la identificación del usuario
// Se llama a la función DAO obtenerLineasDeUsuario para obtener las líneas de la BD que corresponden al id del Usuario. 
// Si hay éxito, se lanza un 200 con las líneas. 
// Si hay error, se lanza un error.

function obtenerMisLineas (peticion = request, respuesta = response) { 
    const idUsuario = peticion.idUsuario;
    return obtenerLineasDeUsuario(idUsuario).then((lineas) => {
        respuesta.status(200).json(lineas);
    }
    ).catch(() => internalServerError(respuesta)
    );
}

// Finalmente, se exportan las dos funciones

module.exports = {
    addLineaFavorita,
    obtenerMisLineas
}