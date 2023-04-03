/**
 * Importamos crypto para manejar contraseñas como helper en la aplicación.
 */

const crypto = require('crypto');

// La función encrypt utiliza la función createHash para generar un hash único y cifrar la contraseña. 

function encrypt (password){
    // Generar el hash de la contraseña ingresada por el usuario
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    return hash;
}

// La función compararEncrypt toma una contraseña y la compara con la versión cifrada utilizando el mismo hash.

function compararEncrypt (passwordRecibida, passwordEncriptada){  
    const hash = crypto.createHash('sha256').update(passwordRecibida).digest('hex');
    const hashTruncado = hash.slice(0, 32); // Truncamos el string a sus primeros 32 caracteres
    //queremos truncarlo hasta el 32 porque en la base de datos solo almacenamos 32 caracteres para el password
    let iguales = false;
    if (hashTruncado == passwordEncriptada) {
        iguales = true;
    }
    return iguales
}

// La función internalServerError escribe un mensaje de error y envía una respuesta de error 500.
function internalServerError(respuesta){
    console.log('error al ejecutar la query');
    respuesta.status(500).send({
        mensaje: 'Internal server error...'
    })
}

//Por último, se exportan

module.exports = {
    encrypt,
    compararEncrypt,
    internalServerError
}
