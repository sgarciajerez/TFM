const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

//RUTA /usuarios

//controlador
const {crearUsuario, getUsuarios} = require('../controller/usuarios_controller');

router.get ('/', getUsuarios);
router.post('/', 
[ //validaciones
    check('username', 'Este campo no puede estar vacío').notEmpty(),
    check('username', 'El nombre de usuario debe de tener minimo dos caracteres y máximo 16').isLength({min:2, max:16}),
    check('email', 'Este campo no puede estar vacío').notEmpty(),
    check('email', 'El correo debe de tener formato e-mail').isEmail(),
    check('email', 'Máximo 255 caracteres para el correo').isLength({min:2, max:255}),
    check('password', 'Este campo no puede estar vacío').notEmpty(),
    check('password', 'La password debe de tener mínimo 5 caracteres y máximo 32 caracteres').isLength({min:5, max:32})
],
crearUsuario);



module.exports = router;