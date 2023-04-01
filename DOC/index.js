/**
 * Módulo de la aplicación principal.
 * @module app
 */

const express = require('express');
const app = express();
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
require('dotenv').config();

// Middleware para recibir json como peticiones
app.use(express.json());

// Middleware para leer información enviada desde el body
app.use(bodyParser.urlencoded({ extended: false }));

// Lee el puerto desde los env en las rutas
const PORT = process.env.PORT;

// Configuración de vistas con Handlebars
app.engine('handlebars', exphbs.engine({ defaultLayout: 'default' }));
app.set('view engine', 'handlebars');

// Configuración de carpetas públicas
app.use(express.static('public'));

// Rutas
const usuariosRouter = require('./routes/usuariosRoutes');
const lineasRouter = require('./routes/lineasRoutes');
const { validarJwt } = require('./middlewares/jwt-validator.middleware');

// Middleware para validar JWT en la ruta /mi-perfil
/**
 * Middleware para validar JWT en la ruta /mi-perfil.
 * @function
 * @name validarJwt
 * @memberof module:app
 * @inner
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {function} next - Función que llama al siguiente middleware.
 */
app.use('/usuarios', usuariosRouter);
app.use('/lineas', lineasRouter);

// Vistas

/**
 * Renderiza la vista home.
 * @function
 * @name home
 * @memberof module:app
 * @inner
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
app.get('/home', (req, res) => {
    res.render('home')
})

/**
 * Renderiza la vista autobuses.
 * @function
 * @name autobuses
 * @memberof module:app
 * @inner
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
app.get('/autobuses', (req, res) => {
    res.render('autobuses')
})

/**
 * Renderiza la vista registro.
 * @function
 * @name registro
 * @memberof module:app
 * @inner
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
app.get('/registro', (req, res) => {
    res.render('registro')
})

/**
 * Renderiza la vista login.
 * @function
 * @name login
 * @memberof module:app
 * @inner
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
app.get('/login', (req, res) => {
    res.render('login')
})

/**
 * Renderiza la vista línea.
 * @function
 * @name linea
 * @memberof module:app
 * @inner
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
app.get('/linea', (req, res) => {
    res.render('linea');
})

/**

Renderiza la vista de horario.
@function
@name horario
@memberof app
@inner
@param {Object} req - Objeto de solicitud de Express.
@param {Object} res - Objeto de respuesta de Express.
*/

app.get('/horario', (req, res) => {
    res.render('horario');
});

/**

Renderiza la vista de mi usuario.
@function
@name miUsuario
@memberof app
@inner
@param {Object} req - Objeto de solicitud de Express.
@param {Object} res - Objeto de respuesta de Express.
*/
app.get('/mi-usuario', (req, res) => {
res.render('mi-usuario');
});

/**

Renderiza la vista de mi perfil y devuelve la información del usuario autenticado.
@function
@name miPerfil
@memberof app
@inner
@param {Object} req - Objeto de solicitud de Express.
@param {Object} req.idUsuario - ID del usuario autenticado.
@param {Object} res - Objeto de respuesta de Express.
*/
app.get('/mi-perfil', validarJwt, (req, res) => {
    let user = {
        id: req.idUsuario
    };
    res.send(user);
});

/**

Redirige a la vista de línea con los parámetros Consorcio y Linea especificados en la solicitud.
@function
@name queryLinea
@memberof app
@inner
@param {Object} req - Objeto de solicitud de Express.
@param {string} req.body.idConsorcio - ID del consorcio de la línea.
@param {string} req.body.idLinea - ID de la línea.
@param {Object} res - Objeto de respuesta de Express.
*/

app.post('/queryLinea', (req, res) => {
    const idConsorcio = req.body.idConsorcio;
    const idLinea = req.body.idLinea;
    res.redirect(`linea?Consorcio=${idConsorcio}&Linea=${idLinea}`);
});

/**
Inicia la aplicación Express en el puerto especificado en las variables de entorno.
@function
@name listen
@memberof app
@inner
@param {number} PORT - Puerto en el que se iniciará la aplicación.
*/

app.listen(
    PORT,
);