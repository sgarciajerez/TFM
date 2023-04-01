/**
 * Este código define un módulo con la función obtenerLineasDeUsuario que realiza una consulta a la base de datos 
 * Obtiene las líneas asociadas a un usuario a partir de su ID de usuario.
 */

const { conexion } = require('../database-config');
const Linea = require('../../modelo/linea');

// La función utiliza una promesa para manejar la consulta. 
// Dentro de la promesa, se define la query que busca las líneas a partir del ID de usuario. 
// Si encuentra información, esta se convierte en objetos Linea que se agregan a un array y se resuelve la promesa.
// Si ocurre algún error, se rechaza la promesa.

function obtenerLineasDeUsuario(idUsuario){ //va a recibir el idUsuario que hace la petición
    let query = `SELECT idConsorcio, idLinea FROM lineas_de_usuarios WHERE idUsuario = ?`; //buscamos las lineas de ese usuario

    return new Promise ((resolve, reject) =>{
        try {
            conexion.query(query, idUsuario, (errors, result) => { //esto nos devuelve un array con las lineas de ese usuario
                if (errors){
                    throw errors;
                }
                let lineas = [];
                result.forEach(linea => {
                    lineas.push(new Linea(linea['idConsorcio'], linea['idLinea'])) //agregamos cada linea con su id
                });
                resolve(lineas);  
            });   
        } catch (error) {
            reject();
        }
    })
}

// Se exporta la función

module.exports = {
    obtenerLineasDeUsuario
}