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