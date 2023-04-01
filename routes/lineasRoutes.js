/** 
 * Este código define un archivo de enrutamiento para la ruta /lineas.
 * Importa la librería Express y crea un nuevo objeto router que se usa para definir las rutas.
 * También se importa el middleware validarJwt.
 * Importa las funciones addLineaFavorita y obtenerMisLineas del controlador que se encargan de manejar las peticiones.
 * 
 * Además, se definen las siguientes rutas:
 * - Una para agregar una línea favorita. Se utiliza el verbo HTTP POST y el middleware validarJwt para validar el token de autenticación.
 * Si la validación es exitosa, se llama a la función addLineaFavorita.
 * 
 * La segunda ruta obtiene las líneas favoritas del usuario autenticado. Se utiliza HTTP GET y la URL relativa /mis-lineas. 
 * También validarJwt para validar el token y se llama a la función obtenerMisLineas.
 * 
 * Por último, se exporta el objeto router para que pueda ser usado en otros archivos.
*/

const express = require('express');
const router = express.Router();
const {validarJwt} = require ('../middlewares/jwt-validator.middleware')

//RUTA /lineas

//controlador
const { addLineaFavorita, obtenerMisLineas } = require('../controller/lineas_controller');


router.post ('/', [
    validarJwt,
], addLineaFavorita);


router.get ('/mis-lineas', [
    validarJwt
], obtenerMisLineas);


module.exports = router;