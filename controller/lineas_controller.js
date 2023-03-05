const { conexion } = require('../data_base/database-config');
const { response, request } = require('express');
const {internalServerError} = require ('../helpers/utility.helper');
const {obtenerLineasDeUsuario} = require('../data_base/DAO/lineas.dao');

//Pre-condicion Middleware JWT validar = obtengo el id de Usuario

function addLineaFavorita(peticion = request, respuesta = response) {
    const idUsuario = peticion.idUsuario;
    const {idConsorcio, idLinea} = peticion.body; //hace falta el dato del idDelConsorcio para cargar el enlace de la API

    try {
        comprobarSiExisteLinea(idUsuario, idConsorcio, idLinea);  //solo voy a dejar guardar al usuario si no ha guardado antes la Línea
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

function obtenerMisLineas (peticion = request, respuesta = response) { //me devuelve un json con las líneas del usuario que hace la petición
    const idUsuario = peticion.idUsuario;
    return obtenerLineasDeUsuario(idUsuario).then((lineas) => {
        respuesta.status(200).json(lineas);
        lineas.forEach(linea => {
            console.log(linea.idLinea);
        });
    }
    ).catch(() => internalServerError(respuesta)
    );
}

module.exports = {
    addLineaFavorita,
    obtenerMisLineas
}