const { conexion } = require('../database-config');
const Usuario = require('../../modelo/usuario');

function readUsuarios(){
    let query = `SELECT username, email from usuarios`;

    return new Promise ((resolve, reject) =>{
        try {
            conexion.query(query, (errors, result) => {
                if (errors){
                    throw errors;
                }
                let usuarios = [];
                result.forEach(usuario => {
                    usuarios.push(new Usuario(usuario['username'], usuario['email'], '')) //agregamos cada persona al array para obtenerlas
                    //dejamos el campo de password vacío para que no se vea
                });
                resolve(usuarios);  
            });   
        } catch (error) {
            reject();
        }
    })
}

function buscarUsuarioPorEmail(usuario){
    let query = `SELECT email, password from usuarios where email=?`
    return new Promise ((resolve, reject ) => {
        try {
            conexion.query(query, [usuario.email], (errors, result) => {
            if (errors){
                console.log('hola');
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
            console.log('estoy en el catch');
             reject (error);
        }
    })
}

// function insertarUsuario(usuario){

//     let query = 'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)';

//     return new Promise ((resolve, reject) =>{
//         try {
    
//             conexion.query(query, [usuario.username, usuario.email, usuario.password], (errors, result) => {
//                 if (errors){
//                     throw errors;
//                 }
//                 resolve();  
//             });   
//         } catch (error) {
//             reject();
//         }
//     })
// }

module.exports = {
    readUsuarios,
    buscarUsuarioPorEmail
}