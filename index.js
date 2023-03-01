const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json()); //esto sirve para recibir json como peticiones

const PORT = process.env.PORT; //lee el puerto desde los env en las rutas

//RUTAS
const usuariosRouter = require('./routes/usuariosRoutes');
const lineasRouter = require('./routes/lineasRoutes');

app.use('/usuarios' , usuariosRouter);
app.use('/lineas' , lineasRouter);

app.listen(
    PORT,
    () => {
        console.log('ejecuta puerto')
    }
)