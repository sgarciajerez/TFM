const bcrypt = require('bcrypt');

function encrypt (word){
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(word, salt);
}

function compararEncrypt (word, encriptado){
    return bcrypt.compareSync(word, encriptado)
}

function internalServerError(respuesta){
    console.log('error al ejecutar la query');
    respuesta.status(500).send({
        mensaje: 'Internal server error...'
    })
}

module.exports = {
    encrypt,
    compararEncrypt,
    internalServerError
}