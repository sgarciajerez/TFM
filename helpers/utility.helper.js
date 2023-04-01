/**
 * Importamos Bcrypt para manejar contraseñas como helper en la aplicación.
 */

const bcrypt = require('bcrypt');

// La función encrypt utiliza la función bcrypt.genSaltSync() para generar un Salt único 
// Luego utiliza la función bcrypt.hashSync() para cifrar la contraseña. 

function encrypt (word){
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(word, salt);
}

// La función compararEncrypt toma una contraseña y la compara con la versión cifrada utilizando la función bcrypt.compareSync().

function compararEncrypt (word, encriptado){
    return bcrypt.compareSync(word, encriptado)
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