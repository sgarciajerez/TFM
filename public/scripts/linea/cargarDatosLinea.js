/**
 * Este código carga los datos de una línea y obtiene los parámetros de la URL
 * Después, llama a rellenarDatosBasicosLinea() para hacer una petición a la API del Consorcio para obtener los datos de la línea. 
 * Si hay respuesta, se extraen los datos y se llaman a varias funciones encargadas de pintar los datos en la web. 
 * Si hay algún error, se muestra en consola.
 */

(function cargarDatosLinea(){
    const params = new URLSearchParams(window.location.search);
    const idConsorcio = params.get('Consorcio');
    const idLinea = params.get('Linea');
    
    //llamada a la función
    rellenarDatosBasicosLinea();

    function rellenarDatosBasicosLinea() {
        fetch(`http://api.ctan.es/v1/Consorcios/${idConsorcio}/lineas/${idLinea}`).then((response) => {
            if (response.ok) {
                return response.json();
            } else{
                throw new Error('Something went wrong');
            } 
        }
        ).then((responseJson) => {
            let data_text = [ //creamos un array con texto
                nombre = responseJson.nombre,
                operador = responseJson.operadores,
                pmr = responseJson.pmr,
                observacionesModoTransporte = responseJson.observacionesModoTransporte
            ]
            let images = [  //un array con urls de imágenes
                termometroIda = responseJson.termometroIda,
                termometroVuelta = responseJson.termometroVuelta,
            ]

            //funciones encargadas de pintar la información
            introducirNombreLinea(data_text[0]);
            introducirOperadorLinea(data_text[1]);
            introducirPMRLinea(data_text[2]);
            introducirObservacionesLinea(data_text[3]);

            botonIda(images[0]);
            botonVuelta(images[1]);
        }
        ).catch((error) => {
        console.log(error)
        });
    }

    function introducirNombreLinea (data_text) {
        const contenedor = document.getElementById('nombre_linea');
        introducirTexto(contenedor, data_text);
    }

    function introducirOperadorLinea (data_text) {
        const contenedor = document.getElementById('operador_linea');
        introducirTexto(contenedor, data_text);
    }

    function introducirPMRLinea (data_text) {
        const contenedor = document.getElementById('pmr_linea');
        introducirTexto(contenedor, data_text);
    }
    
    function introducirObservacionesLinea (data_text) {
        const contenedor = document.getElementById('observaciones_linea');
        introducirTexto(contenedor, data_text);
    }

    //para ahorrar código, se crea esta función que introduce el texto en mayúscula
    function introducirTexto(contenedor, data_text){
        contenedor.innerHTML = data_text.toUpperCase();
    }

    function botonIda (url){
        const boton = document.getElementById('botonIda');
        boton.href=url;
    }
    function botonVuelta (url){
        const boton = document.getElementById('botonVuelta');
        boton.href=url;
    }

})();