/**
Importamos las dependencias necesarias para nuestro proyecto: express, express-handlebars, body-parser y dotenv.
*/
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
require("dotenv").config();

/**
Utilizamos el middleware de express.json() para poder recibir peticiones en formato JSON.
*/
app.use(express.json());

/**
Utilizamos el middleware de body-parser.urlencoded() para poder leer información enviada desde el body.
*/
app.use(bodyParser.urlencoded({ extended: false }));

/**
Leemos el puerto desde las variables de entorno .env.
*/
const PORT = process.env.PORT;

/**
Configuramos el motor de vistas de handlebars y le indicamos el layout por defecto.
*/
app.engine("handlebars", exphbs.engine({ defaultLayout: "default" }));
app.set("view engine", "handlebars");

/**
Configuramos la carpeta public como carpeta de recursos estáticos.
*/
app.use(express.static("public"));

/**
Importamos las rutas de los módulos usuarios y lineas, así como el middleware que valida el JWT.
*/
const usuariosRouter = require("./routes/usuariosRoutes");
const lineasRouter = require("./routes/lineasRoutes");
const { validarJwt } = require("./middlewares/jwt-validator.middleware");

/**
Establecemos las rutas base de los módulos usuarios y lineas.
*/

app.use("/usuarios", usuariosRouter);
app.use("/lineas", lineasRouter);

/**
Establecemos las rutas de las vistas de nuestra aplicación.
*/

app.get("/home", (req, res) => {
  res.render("home");
});
app.get("/autobuses", (req, res) => {
  res.render("autobuses");
});
app.get("/registro", (req, res) => {
  res.render("registro");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/linea", (req, res) => {
  res.render("linea");
});

app.get("/horario", (req, res) => {
  res.render("horario");
});

app.get("/mi-usuario", (req, res) => {
  res.render("mi-usuario");
});

/**
Establecemos la ruta para obtener el perfil de usuario, y utilizamos el middleware validarJwt
para validar el token enviado en la cabecera de la petición.
*/

app.get("/mi-perfil", validarJwt, (req, res) => {
  let user = {
    id: req.idUsuario,
  };
  res.send(user);
});

/**
Establecemos la ruta para redirigir a la vista de linea, y obtenemos los parámetros
idConsorcio e idLinea enviados mediante la petición POST.
*/

app.post("/queryLinea", (req, res) => {
  const idConsorcio = req.body.idConsorcio;
  const idLinea = req.body.idLinea;
  res.redirect(`linea?Consorcio=${idConsorcio}&Linea=${idLinea}`);
});

/**
Iniciamos el servidor de express en el puerto leído desde las variables de entorno, y mostramos
un mensaje por consola indicando que el servidor está en ejecución.
*/
app.listen(PORT, () => {
  console.log("ejecuta puerto");
});
