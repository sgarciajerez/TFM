const jwt = require('jsonwebtoken');

function validarJwt (peticion, respuesta, next) {
    const token =peticion.header('Authorization');
    const errorRespuesta = {
        mensaje: 'Necesitas iniciar sesión para realizar esta acción'
    };
    
    if (!token){
        return respuesta.status(401).json(errorRespuesta);
    } else{
        try {
            const {id} = jwt.verify(token, process.env.JWT_SECRET);
            peticion.idUsuario = id;
            next()
        } catch(error) {
            return respuesta.status(401).json(errorRespuesta);
        }
    }
}

module.exports = {
    validarJwt
}