const jwt = require('jsonwebtoken');

function crearJWT (idUsuario) {
    return new Promise ((resolve, reject) => {
        
        const payload = {
            id: idUsuario
        }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '24h'
        }, (error, token) => {
            if(error){
                reject('No se ha podido generar el token');
            } else{
                resolve(token);
            }
        })
    })
}

module.exports = {
    crearJWT
}