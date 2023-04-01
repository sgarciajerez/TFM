/**
 * Este código define un enrutador (router) para la ruta /usuarios de la aplicación web creada con Express y Node.js.

Se importan los siguientes módulos:

express: el framework web para Node.js
express-validator: un módulo para validar los datos de entrada de una solicitud HTTP
jwt-validator.middleware: el middleware para validar token JWT

Después, se definen las rutas para responder a las solicitudes HTTP que se realicen a la ruta /usuarios. En este caso, son las siguientes:

- POST /usuarios/usuario: para registrar un usuario. Mandamos el id desde el Body.
 Se utiliza el controlador getUsuario para manejar la solicitud.

- POST /usuarios: para crear un nuevo usuario. Se utiliza el middleware check de express-validator para validar los datos. 
Si la validación es correcta, se llama al controlador crearUsuario.

- POST /usuarios/login: para que un usuario registrado pueda iniciar sesión. También se utiliza check para validar los datos.
Si son correctos, se llama al controlador login para la autenticación.

Por último, se exporta el enrutador para que se pueda utilizar en la aplicación principal.
 */


const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validarJwt} = require ('../middlewares/jwt-validator.middleware')

//RUTA /usuarios

//controlador
const {crearUsuario, getUsuario, login} = require('../controller/usuarios_controller');


router.post ('/usuario', getUsuario);
router.post('/', 
[    
    check('username', 'El nombre de usuario no puede estar vacío').notEmpty(),
    check('username', 'El nombre de usuario debe de tener minimo dos caracteres y máximo 16').isLength({min:2, max:16}),
    check('email', 'El correo no puede estar vacío').notEmpty(),
    check('email', 'El correo debe de tener formato e-mail').isEmail(),
    check('email', 'Máximo 255 caracteres para el correo').isLength({min:2, max:255}),
    check('password', 'La contraseña no puede estar vacía').notEmpty(),
    check('password', 'La contraseña debe de tener mínimo 5 caracteres y máximo 32 caracteres').isLength({min:5, max:32})
]
, crearUsuario);

router.post('/login', 
[
    check('email', 'El correo no puede estar vacío').notEmpty(),
    check('email', 'El correo debe de tener formato e-mail').isEmail(),
    check('email', 'Máximo 255 caracteres para el correo').isLength({min:2, max:255}),
    check('password', 'La contraseña no puede estar vacía').notEmpty(),
    check('password', 'La password debe de tener mínimo 5 caracteres y máximo 32 caracteres').isLength({min:5, max:32})
]
, login);

module.exports = router;