const { conexion } = require('../database-config');
const Linea = require('../../modelo/linea');

function obtenerLineasDeUsuario(idUsuario){
    let query = `SELECT idLinea FROM usuarios_app.lineas_de_usuarios WHERE idUsuario = ?;`;

    return new Promise ((resolve, reject) =>{
        try {
            conexion.query(query, idUsuario, (errors, result) => {
                if (errors){
                    throw errors;
                }
                let lineas = [];
                result.forEach(linea => {
                    lineas.push(new Linea(linea['idLinea'], '', '', '', '', '', '')) //agregamos cada linea con su id
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