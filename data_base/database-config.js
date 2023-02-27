const mysql = require('mysql');

let conexion = mysql.createConnection(
    {
        database: 'usuarios_app',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: ''
    }
);

conexion.connect(
    (error) => {
        if(error){
            throw error;
        }
    }
);

module.exports = {
    conexion
}