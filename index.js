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

app.post('/submitLinea', (req, res) => {
    const idLinea= req.body.idLinea;
    const idConsorcio= req.body.idConsorcio;
    res.render('result', { idLinea, idConsorcio });
});
  
  
app.get ('/home', (req, res) =>{
    res.render ('home')
})

app.listen(
    PORT,
    () => {
        console.log('ejecuta puerto')
    }
)