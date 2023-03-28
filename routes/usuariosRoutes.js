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