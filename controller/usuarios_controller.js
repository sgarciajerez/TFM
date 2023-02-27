const { conexion } = require('../data_base/database-config');
const { response, request } = require('express');
const Usuario = require('../modelo/usuario');
const {encrypt} = require('../helpers/utility.helper');

function crearUsuario (peticion = request, respuesta = response) {

    const {username, email, password} = peticion.body;
    const usuario = new Usuario (username, email, encrypt(password));

    try {
        comprobarSiExisteEmail(usuario);
    } catch (error) {
        internalServerError(respuesta);
    }

    //FUNCIONES

    function comprobarSiExisteEmail(usuario){
        let query = `SELECT email from usuarios where email=?`;
        conexion.query(query, [usuario.email], (errors, result) => {
            if (errors){
                throw errors
            }
            if(result.length > 0){
                respuesta.status(400).json({
                    mensaje: `Ya está registrado el email ${usuario.email}`
                })
            } else {
                insertarUsuario(usuario);
            }
        })
    }

    function insertarUsuario(usuario){
        let query = 'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)';
        conexion.query(query, [usuario.username, usuario.email, usuario.password], (errors, result) => {
            if (errors){
                internalServerError(respuesta);
            }
            if (result){
                respuesta.status(201).json({
                    mensaje: `Registrado el usuario con nombre ${usuario.username} con email ${usuario.email}`
                })
            }
        })
    }

    function internalServerError(respuesta){
        console.log('error al ejecutar la query');
        respuesta.status(500).send({
            mensaje: 'Internal server error...'
        })
    }
};

function getUsuario (peticion = request, respuesta = response) {
    peticion.send ({
        ok: 'funciona'
    })
}


module.exports = {
    crearUsuario,
    getUsuario
}