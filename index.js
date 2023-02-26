const express = require('express');

const app = express();
const PORT = 8000;

//RUTAS
const usuariosRouter = require('./routes/usuariosRoutes');

app.use('/usuarios' , usuariosRouter);

app.listen(
    PORT,
    () => {
        console.log('ejecuta puerto')
    }
)