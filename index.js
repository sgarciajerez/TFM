const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json()); //esto sirve para recibir json como peticiones

const PORT = 8000 //lee el puerto desde los env en las rutas

//RUTAS
const usuariosRouter = require('./routes/usuariosRoutes');

app.use('/usuarios' , usuariosRouter);

app.listen(
    PORT,
    () => {
        console.log('ejecuta puerto')
    }
)