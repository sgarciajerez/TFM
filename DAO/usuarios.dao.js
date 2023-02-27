const { conexion } = require('../data_base/database-config');
const Usuario = require('../modelo/usuario');

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

// function validarEmail (usuario){
//     let query = `SELECT email from usuarios where email=?`;

//     return new Promise ((resolve, reject ) => {
//         try {
//         conexion.query(query, [usuario.email], (errors, result) => {
//         if (errors){
//             throw errors
//         }
//         if(result.length > 0){
//             reject(400);
//         }
//         resolve();
//         })    
//         } catch (error) {
//             reject (500);
//         }
//     })
// }

module.exports = {
    readUsuarios,
}