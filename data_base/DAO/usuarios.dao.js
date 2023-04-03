/**
 * Se importa la configuración de conexión a la base de datos de MySQL y se definen las funciones readUsuario y buscarUsuarioPorEmail. 
 * Ambas ejecutan una consulta a la base de datos y devuelven una promesa.
 */

const { conexion } = require('../database-config');
const Usuario = require('../../modelo/usuario');

//La función readUsuario ejecuta una consulta para obtener un usuario a partir de su id.
// Devuelve una promesa que resuelve con un array de objetos Usuario que coinciden con el id dado

function readUsuario(idUsuario){
    let query = `SELECT username, email from usuarios WHERE id = ?`;
    return new Promise ((resolve, reject) =>{
        try {
            conexion.query(query, idUsuario, (errors, result) => {
                if (errors){
                    throw errors;
                }
                let usuario = [];
                result.forEach(user => {
                    usuario.push(new Usuario(user['username'], user['email'], '')) //agregamos cada persona al array para obtenerlas
                    //dejamos el campo de password vacío para que no se vea
                });
                resolve(usuario);  
            });   
        } catch (error) {
            reject();
        }
    })
}

//La función buscarUsuarioPorEmail lanza una consulta para obtener un usuario a partir de su email. 
// Retorna una promesa que resuelve con un objeto Usuario si encuentra dicho email.
// Si lo encuentra, va a devolver el usuario con todos sus datos en la BD.
//

function buscarUsuarioPorEmail(usuario){
    let query = `SELECT id, username, email, password from usuarios where email=?`
    return new Promise ((resolve, reject ) => {
        try {
            conexion.query(query, [usuario.email], (errors, result) => {
            if (errors){
                throw errors
            } if (result.length > 0) {
                const usuarioBD = new Usuario (result[0]['username'], result[0]['email'], result[0]['password']);
                usuarioBD.id = result[0]['id']
                resolve(usuarioBD);
            } else {
                reject();
            } 
            })    
        } catch (error) {
             reject (error);
        }
    })
}

// Exportamos ambas funciones
module.exports = {
    readUsuario,
    buscarUsuarioPorEmail
}