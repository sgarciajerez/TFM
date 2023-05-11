/**
 * Este código crea una conexión a una base de datos MySQL utilizando el paquete mysql. 
 */
require("dotenv").config();
const mysql = require('mysql');


// Se define una variable conexion instanciando mysql.createConnection() y recibe una configuración
let conexion = mysql.createConnection(
    {
        database: process.env.DB_NAME || 'usuarios_app',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ''
    }
);

// Se utiliza connect() para conectarse a la base de datos.

conexion.connect(
    (error) => { // Si hay algún error en la conexión, se lanza una excepción.
        if(error){
            throw error;
        }
    }
);

// Finalmente, se exporta
module.exports = {
    conexion
}