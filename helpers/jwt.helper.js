/**
 * Este código exporta una función llamada crearJWT que crea un JSON Web token para autenticar solicitudes.
 * Primero, se importa la librería jsonwebtoken necesaria para crear tokens JWT.
 */

const jwt = require('jsonwebtoken');

// La función crearJWT toma como parámetro el idUsuario que se utilizará en el payload del JWT
// Esta función va a crear una promesa que devolverá el token.

function crearJWT (idUsuario) {
    return new Promise ((resolve, reject) => {

        // El payload contiene el id del usuario.
        const payload = {
            id: idUsuario
        }
        // jwt.sign() se utiliza para firmar el token, usando la pass de JWT que se encuentra en process.env.JWT_SECRET. 
        // El token expira en 24 horas.
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '24h'
        }, (error, token) => {

            //Si hay error, se rechaza la promesa con un error. Si no hay error, se resuelve la promesa con el token.
            if(error){
                reject('No se ha podido generar el token');
            } else{
                resolve(token);
            }
        })
    })
}

//Por último, se exporta
module.exports = {
    crearJWT
}