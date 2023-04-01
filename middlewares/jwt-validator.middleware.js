/**
 * Este código exporta el middleware validarJwt para verificar los token JWT.
*/

const jwt = require('jsonwebtoken');

/** La función toma tres parámetros: peticion, respuesta y next. 
 * En primer lugar, la función extrae el token JWT del encabezado Authorization de la solicitud. 
*/

function validarJwt (peticion, respuesta, next) {
    const token =peticion.header('Authorization');
    const errorRespuesta = {
        mensaje: 'Necesitas iniciar sesión para realizar esta acción'
    };
    
    if (!token){
        // Si el token no está presente, se devuelve una respuesta de error con un mensaje que indica que el usuario debe iniciar sesión.
        return respuesta.status(401).json(errorRespuesta);
    } else{
        try {
            // Si el token está presente, se intenta verificar utilizando la función jwt.verify de la biblioteca jsonwebtoken. 
            // Si la verificación es exitosa, el token decodificado se guarda en el objeto decodedToken.
            // Es importante destacar que también se guarda el ID del usuario, que se extrae del token decodificado. 
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            peticion.idUsuario = decodedToken.id;
            // Luego se llama a next() para avanzar.
            next()
        } catch(error) {
            //Si la verificación del token falla, se devuelve una respuesta de error con un mensaje similar al caso anterior.
            return respuesta.status(401).json(errorRespuesta);
        }
    }
}

//El middleware se exporta como un objeto con la propiedad validarJwt para que se pueda importar y utilizar en otros archivos.

module.exports = {
    validarJwt
}