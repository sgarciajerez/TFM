const express = require('express');
const app = express();
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(express.json()); //esto sirve para recibir json como peticiones
app.use(bodyParser.urlencoded({ extended: false })); //para leer información enviada desde el body

const PORT = process.env.PORT; //lee el puerto desde los env en las rutas

//CONFIGURACIÓN DE VISTAS
app.engine('handlebars', exphbs.engine({defaultLayout: 'default'}));
app.set('view engine', 'handlebars');

//CONFIGURACIÓN DE CARPETAS PUBLIC
app.use(express.static('public'));

//RUTAS
const usuariosRouter = require('./routes/usuariosRoutes');
const lineasRouter = require('./routes/lineasRoutes');

app.use('/usuarios' , usuariosRouter);
app.use('/lineas' , lineasRouter);
  
app.get ('/home', (req, res) =>{
    res.render ('home')
})

app.get ('/autobuses', (req, res) =>{
    res.render ('autobuses')
})
app.get ('/registro', (req, res) =>{
    res.render ('registro')
})
  
app.get ('/linea', (req, res) =>{
    res.render ('linea');
})

app.get ('/horario', (req, res) =>{
    res.render('horario');
})

app.post('/queryLinea', (req, res) => {
    const idConsorcio= req.body.idConsorcio;
    const idLinea= req.body.idLinea;
    res.redirect(`linea?Consorcio=${idConsorcio}&Linea=${idLinea}`);
});


app.listen(
    PORT,
    () => {
        console.log('ejecuta puerto')
    }
)