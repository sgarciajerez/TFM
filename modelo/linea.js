/**
 * Este código define la clase Linea que tiene dos atributos: "idLinea" y "idConsorcio". 
 * La clase tiene un constructor que inicializa estos atributos.
 * También tiene dos métodos "set" para establecer los valores de los atributos "idLinea" e "idConsorcio".
 * Por último, se exporta la clase para que pueda se pueda usar en otros módulos.
 */

class Linea {
    idLinea;
    idConsorcio;

    constructor(idConsorcio, idLinea){
        this.idConsorcio=idConsorcio;
        this.idLinea=idLinea;
    }

    set idConsorcio (idConsorcio) {
        this.idConsorcio=idConsorcio;
    }

    set idLinea (idLinea) {
        this.idLinea=idLinea;
    }

}

module.exports = Linea;