const params = new URLSearchParams(window.location.search);
const idConsorcio = params.get('Consorcio');
const idLinea = params.get('Linea');
const idNucleo = params.get('Nucleo');

function pedirHorarioAPI(){

    fetch(`http://api.ctan.es/v1/Consorcios/${idConsorcio}/horarios_lineas?dia=&frecuencia=&lang=ES&linea=${idLinea}&mes=`).then(
        (response)=>{
            if(response.ok){
                return response.json()
            } else{
                throw new Error ('Something went wrong');
            }
        }).then((data) =>{
            mostrarNucleos(data);
            crearTablaHorarios(data);
        }).catch((error) => console.log(error));
}

function mostrarNucleos(data){
    const nucleosIda = data.planificadores[0].nucleosIda;
    const listado = document.getElementById('listaNucleos');
    nucleosIda.forEach((nucleo) => {
        let elementoLista = document.createElement('li');
        elementoLista.textContent = nucleo.nombre;
        listado.appendChild(elementoLista);
    });
}

function crearTablaHorarios(data){

    // Obtener la tabla HTML
    const tabla = document.getElementById("tabla");

    // Crear la fila del encabezado
    const encabezadoFila = document.createElement("tr");
    //obtener los bloques de ida del json
    const bloquesIda = data.planificadores[0].bloquesIda;

    // Agregar las celdas del encabezado
    bloquesIda.forEach((bloque) => {
    const encabezadoCelda = document.createElement("th");
    encabezadoCelda.innerText = bloque.nombre;
    encabezadoFila.appendChild(encabezadoCelda);
    });

    // Agregar la fila del encabezado a la tabla
    tabla.appendChild(encabezadoFila);

    // obtener los horarios para las siguientes filas
    const horarioIda = data.planificadores[0].horarioIda;

    // Crear una fila por cada bloque horario
    horarioIda.forEach((bloqueHorario) => {
        const Fila = document.createElement("tr");
        const horasDelBloque = bloqueHorario.horas;
        const frecuencia = bloqueHorario.frecuencia
        const observaciones = bloqueHorario.observaciones
        horasDelBloque.forEach(hora => addInfoACelda(hora, Fila)); //iteramos cada hora en el bloque y la añadimos a una celda
        addInfoACelda(frecuencia, Fila);
        addInfoACelda(observaciones, Fila);
        tabla.appendChild(Fila);  //agregar a la tabla cada fila
    });
}

function addInfoACelda(texto, Fila){
    const celda = document.createElement("td");
    celda.innerText = texto;
    Fila.appendChild(celda);
}

pedirHorarioAPI();