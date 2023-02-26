const express = require('express');
const { conexion } = require ('../scripts/database-config');
const router = express.Router();

//RUTA /usuarios

router.get ('/', (peticion, respuesta) => {});

router.post('/:username/:email/:password', (peticion, respuesta) => {

    const {username, email, password} = peticion.params;

    let query = 'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)';

    try{
        conexion.query(query, [username, email, password], (errors, result) => {
            if (errors){
                throw errors
            }
            console.log(result);
            respuesta.status(200).send({
                mensaje: `Registrado el usuario con nombre ${username}, email ${email} y contraseña ${password}`
            })
        })

    } catch(error){
        console.log('error al ejecutar la query');
        respuesta.status(500).send({
            mensaje: 'Internal server error...'
        })
    }
})

module.exports = router;