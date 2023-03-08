(function cargarPuntoVenta(){
    
    const params = new URLSearchParams(window.location.search);
    const idConsorcio = params.get('Consorcio');
    const idLinea = params.get('Linea');
    const idNucleo = params.get ('Nucleo');

    pedirAPIPuntosVenta();
    pedirAPIPrecio();


    function pedirAPIPuntosVenta() {
        fetch(`http://api.ctan.es/v1/Consorcios/${idConsorcio}/puntos_venta`).then((response) => {
            if (response.ok) {
                return response.json();
            } else{
                throw new Error('Something went wrong');
            } 
        }
        ).then((data) => {
            mostrarPuntoVentaMunicipio(data);
        }).catch((error) => {
        console.log(error)
        });
    }

    function mostrarPuntoVentaMunicipio(data) {
        const listado = document.getElementById('listaVenta');
        const Array = data.puntosVenta;
        Array.forEach(element => {
            let numeroPuntos=0;
            if(element.idNucleo == idNucleo){
                numeroPuntos++;
                const puntoVenta = document.createElement('li');
                puntoVenta.textContent = element.direccion;
                listado.appendChild(puntoVenta);
            }   
        });
    }

    function pedirAPIPrecio() {
        fetch(`http://api.ctan.es/v1/Consorcios/${idConsorcio}/tarifas_interurbanas`).then((response) => {
            if (response.ok) {
                return response.json();
            } else{
                throw new Error('Something went wrong');
            } 
        }
        ).then((data) => {
            crearTablaPrecios(data);
            console.log(data);
        }).catch((error) => {
        console.log(error)
        });
    }

    function crearTablaPrecios(data) {

        // Obtener la tabla HTML y datos json
        const tabla = document.getElementById("tablaPrecios");
        const Array = data.tarifasInterurbanas;

        // Crear la fila del encabezado
        const encabezadoFila = document.createElement("tr");
    
        // Agregar las celdas del encabezado
        Array.forEach((saltos) => {
        const encabezadoCelda = document.createElement("th");
        encabezadoCelda.innerText = `${saltos.saltos} Saltos`;
        encabezadoFila.appendChild(encabezadoCelda);
        });
    
        // Agregar la fila del encabezado a la tabla
        tabla.appendChild(encabezadoFila);
        const FilaBase = document.createElement("tr");
        const FilaTarjeta = document.createElement("tr");
        
        // Llenamos las filas con la información
        Array.forEach((precios) => {
            const precioBase = precios.bs;
            let redondeado = parseFloat(precioBase).toFixed(2);
            addInfoACelda(redondeado, FilaBase);
        });

        tabla.appendChild(FilaBase);  //agregar a la tabla cada fila

        // Llenamos las filas con la información
        Array.forEach((precios) => {
            const precioTarjeta = precios.tarjeta;
            let redondeado = parseFloat(precioTarjeta).toFixed(2); 
            addInfoACelda(redondeado, FilaTarjeta);
        });
        
        tabla.appendChild(FilaTarjeta);  //agregar a la tabla cada fila
    }
        
        function addInfoACelda(texto, Fila){
            const celda = document.createElement("td");
            celda.innerText = texto + ' €';
            Fila.appendChild(celda);
        }
        
    
})()