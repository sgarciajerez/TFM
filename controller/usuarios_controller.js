/**
 * Este código exporta las funciones crearUsuario, getUsuario y login. 
 * Las funciones manejan las solicitudes HTTP con Express.
 */

const { conexion } = require('../data_base/database-config');
const { response, request } = require('express');
const Usuario = require('../modelo/usuario');
const {validationResult} = require('express-validator');
const {readUsuario, buscarUsuarioPorEmail} = require('../data_base/DAO/usuarios.dao');
const  {crearJWT}= require('../helpers/jwt.helper');
const {internalServerError, encrypt, compararEncrypt} = require ('../helpers/utility.helper');


// La función login maneja una solicitud POST para autenticar a un usuario registrado en la BD. 
// La función extrae el email y password de la solicitud HTTP para hacer la búsqueda
// Si la búsqueda es exitosa, se crea un token JWT y se envía al cliente como respuesta. 
// Si la contraseña no coincide, se devuelve un error y un 404. 
// Por último, si la búsqueda de usuario falla, se devuelve un mensaje de error y un HTTP 500.

function login (peticion = request, respuesta = response) {
    const validador = validationResult(peticion);
    if(validador.errors.length>0){ //Si el validador encuentra errores, entonces no se ejecuta la función 
        return respuesta.status(400).json(validador.errors);
    }

    const {email, password} = peticion.body;
    const usuario = new Usuario ("", email, password);

    buscarUsuarioPorEmail (usuario).then(
        (usuarioValidado) => {
            if (compararEncrypt(password, usuarioValidado.password)){
                crearJWT(usuarioValidado.id).then((token) => {
                    respuesta.status(202).json({
                        msg: "Login realizado con éxito",
                        token,
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

// La función crearUsuario maneja una solicitud POST para crear un nuevo usuario en la BD. 
// La función extrae el username, email y password del body y los utiliza para crear una instancia de la clase Usuario. 
// Después, verifica que no hay ningún usuario con el mismo email en la BD.
// Si no hay, la función inserta el nuevo usuario en la BD y crea un token JWT para enviar al cliente como respuesta. 
// Si se produce un error, se devuelve un HTTP 500.
 
function crearUsuario (peticion = request, respuesta = response) {
    const validador = validationResult(peticion);

    if(validador.errors.length>0){ //Si el validador encuentra errores, entonces no se ejecuta la función 
        return respuesta.status(400).json(validador.errors);
    }
    
    //Extraemos info del body
    const {username, email, password} = peticion.body;
    const usuario = new Usuario (username, email, encrypt(password));

    try {
        comprobarSiExisteEmail(usuario);
    } catch (error) {
        internalServerError(respuesta);
    }

    //FUNCIONES EN CREAR USUARIO

    // Verificamos que no exista el usuario. 
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
            } else { //Si no existe, lo insertamos
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

// getUsuario maneja una solicitud GET para devolver a un usuario.
// Se extrae el id del usuario del body y se utiliza para buscarlo en la BD. 
// Si se encuentra, la función retorna información del usuario en formato JSON. 
// Si no existe, se lanza un error y un HTTP 500.

function getUsuario (peticion = request, respuesta = response) {
    // const idUsuario = peticion.idUsuario;
    const {idUsuario} = peticion.body;
    return readUsuario(idUsuario).then(
        (usuario) => respuesta.status(200).json(usuario)
    ).catch(() => internalServerError(respuesta)
    );
}

//Finalmente, se exportan las tres funciones

module.exports = {
    crearUsuario,
    getUsuario,
    login
}