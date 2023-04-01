/**
 * Este código define la clase Usuario con las propiedades id, username, email y password.
 * En el constructor se reciben los argumentos username, email y password.
 * En el constructor, se asignan los valores ya mencionados.
 * Por último, se exporta la clase.
 */

class Usuario {
    id;
    username;
    email;
    password;

    constructor(username, email, password){
        this.username=username;
        this.email=email;
        this.password=password;
    }
}

module.exports = Usuario;