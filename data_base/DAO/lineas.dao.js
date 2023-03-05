const { conexion } = require('../database-config');
const Linea = require('../../modelo/linea');

function obtenerLineasDeUsuario(idUsuario){ //va a recibir el idUsuario que hace la petición
    let query = `SELECT idLinea FROM usuarios_app.lineas_de_usuarios WHERE idUsuario = ?;`; //buscamos las lineas de ese usuario

    return new Promise ((resolve, reject) =>{
        try {
            conexion.query(query, idUsuario, (errors, result) => { //esto nos devuelve un array con las lineas de ese usuario
                if (errors){
                    throw errors;
                }
                let lineas = [];
                result.forEach(linea => {
                    lineas.push(new Linea(linea['idLinea'])) //agregamos cada linea con su id
                });
                resolve(lineas);  
            });   
        } catch (error) {
            reject();
        }
    })
}

module.exports = {
    obtenerLineasDeUsuario
}