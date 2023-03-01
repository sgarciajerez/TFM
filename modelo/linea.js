class Linea {
    idLinea;
    nombre;
    operador;
    termometroIda;
    termometroVuelta;
    pmr;
    observacionesModoTransporte;

    constructor(idLinea, nombre, operador, termometroIda, termometroVuelta, pmr, observacionesModoTransporte){
        this.idLinea=idLinea;
        this.nombre=nombre;
        this.operador=operador;
        this.termometroIda=termometroIda;
        this.termometroVuelta=termometroVuelta;
        this.pmr=pmr;
        this.observacionesModoTransporte=observacionesModoTransporte;
    }

    set idConsorcio (idConsorcio) {
        this.idConsorcio=idConsorcio;
    }

    set idLinea (idLinea) {
        this.idLinea=idLinea;
    }

    rellenarDatosLinea(idConsorcio, idLinea) {
        fetch(`http://api.ctan.es/v1/Consorcios/${idConsorcio}/lineas/${idLinea}`).then((response) => {
            if (response.ok) {
                response.json();
            } else{
                throw new Error('Something went wrong');
            } 
        }
        ).then((responseJson) => {
            let linea;
            let nombre = responseJson.nombre;
            let operador = responseJson.operadores;
            let termometroIda = responseJson.termometroIda;
            let termometroVuelta = responseJson.termometroVuelta;
            let pmr = responseJson.pmr;
            let observacionesModoTransporte = responseJson.observacionesModoTransporte;
            return linea = new Linea (idLinea, nombre, operador, termometroIda, termometroVuelta, pmr. observacionesModoTransporte);
        }
        ).catch((error) => {
        console.log(error)
        });
    }
}

module.exports = Linea;