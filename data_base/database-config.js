/**
 * Este código crea una conexión a una base de datos MySQL utilizando el paquete mysql. 
 */

const mysql = require('mysql');

// Se define una variable conexion instanciando mysql.createConnection() y recibe una configuración
let conexion = mysql.createConnection(
    {
        database: 'usuarios_app',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: ''
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