const express = require('express');
const router = express.Router();

//RUTA /usuarios

//controlador
const {crearUsuario, getUsuario} = require('../controller/usuarios_controller');

router.get ('/', getUsuario);
router.post('/', crearUsuario);

module.exports = router;