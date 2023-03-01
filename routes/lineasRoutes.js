const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validarJwt} = require ('../middlewares/jwt-validator.middleware')

//RUTA /lineas

//controlador
const { addLineaFavorita, obtenerMisLineas } = require('../controller/lineas_controller');


// router.get ('/', getLineas);

router.post ('/', [
    validarJwt,
], addLineaFavorita);


router.get ('/mis-lineas', [
    validarJwt
], obtenerMisLineas);


module.exports = router;