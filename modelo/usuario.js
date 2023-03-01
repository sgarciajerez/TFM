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