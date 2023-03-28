const { conexion } = require('../database-config');
const Usuario = require('../../modelo/usuario');

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
                console.log(usuarioBD);
                resolve(usuarioBD);
            } else {
                reject();
            } 
            })    
        } catch (error) {
            console.log('estoy en el catch');
             reject (error);
        }
    })
}

module.exports = {
    readUsuario,
    buscarUsuarioPorEmail
}