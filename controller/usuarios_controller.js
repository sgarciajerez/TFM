const { conexion } = require('../data_base/database-config');
const { response, request } = require('express');
const Usuario = require('../modelo/usuario');
const {validationResult} = require('express-validator');
const {readUsuarios, buscarUsuarioPorEmail} = require('../data_base/DAO/usuarios.dao');
const  {crearJWT}= require('../helpers/jwt.helper');
const {internalServerError} = require ('../helpers/utility.helper');


function login (peticion = request, respuesta = response) {
    const validador = validationResult(peticion);
    if(validador.errors.length>0){
        return respuesta.status(400).json(validador.errors);
    }

    const {email, password} = peticion.body;
    const usuario = new Usuario ("", email, password);

    buscarUsuarioPorEmail (usuario).then(
        (usuarioValidado) => {
            if (password === usuarioValidado.password){
                crearJWT(usuarioValidado.id).then((token) => {
                    respuesta.status(202).json({
                        msg: "Login realizado con éxito",
                        token
                    })
                }
                ).catch((error) => internalServerError(respuesta))
            } else{
                respuesta.status(404).json({
                    msg: 'La contraseña que has introducido es incorrecta'
                })
        }
    }).catch((error)=>{
        if (error){
            internalServerError(respuesta);
        } else {
            respuesta.status(404).json({
                msg: 'El email que has introducido no existe en la Base de Datos'
            })
        }
    })

}
 
function crearUsuario (peticion = request, respuesta = response) {
    const validador = validationResult(peticion);

    if(validador.errors.length>0){
        return respuesta.status(400).json(validador.errors);
    }
    
    const {username, email, password} = peticion.body;
    const usuario = new Usuario (username, email, password);

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
                    msg: `Ya está registrado el email ${usuario.email}`,
                    error: `Intente iniciar sesión`
                })
            } else {
                insertarUsuario (usuario);
            }
        })
    }

    function insertarUsuario (usuario) {
        let query = 'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)';
        conexion.query(query, [usuario.username, usuario.email, usuario.password], (errors, result) => {
            if (errors){
                internalServerError(respuesta);
            }
            if (result){
                let idUsuario = result.insertId; //este es el id del usuario
                crearJWT(idUsuario).then(
                    (token) => {
                        respuesta.status(201).json({
                            msg: `Registrado el usuario con nombre ${usuario.username} con email ${usuario.email}`,
                            token
                        })
                }).catch(
                    (error)=>{
                        internalServerError(respuesta)
                })
            }
        })
    }
}

function getUsuarios (peticion = request, respuesta = response) {
    return readUsuarios().then(
        (usuarios) => respuesta.status(200).json(usuarios)
    ).catch(() => internalServerError(respuesta)
    );
}

module.exports = {
    crearUsuario,
    getUsuarios,
    login
}