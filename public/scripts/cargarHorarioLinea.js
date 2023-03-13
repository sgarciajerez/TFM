const params = new URLSearchParams(window.location.search);
const idConsorcio = params.get('Consorcio');
const idLinea = params.get('Linea');

function pedirHorarioAPI(){

    fetch(`http://api.ctan.es/v1/Consorcios/${idConsorcio}/horarios_lineas?dia=&frecuencia=&lang=ES&linea=${idLinea}&mes=`).then(
        (response)=>{
            if(response.ok){
                return response.json()
            } else{
                throw new Error ('Something went wrong');
            }
        }).then((data) =>{
            crearTablaHorarios(data);
            cargarNucleos(data);
            console.log(data);
        }).catch((error) => console.log(error));
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

function cargarNucleos(data){
    const nucleosIda = data.planificadores[0].nucleosIda;
    buscarIdNucleo(nucleosIda)
}

function buscarIdNucleo (nucleosIda) {
    fetch(`http://api.ctan.es/v1/Consorcios/${idConsorcio}/nucleos`).then(
        (response)=>{
            if(response.ok){
                return response.json()
            } else{
                throw new Error ('Something went wrong');
            }
        }).then((data) =>{
            let listaNucleos = data.nucleos;
            let listaIdNucleos = [{
                nombre:'',
                idNucleo:0
            }];
            nucleosIda.forEach((element, index) => {
                let contador=0;
                let nombreBuscado = element.nombre
                let encontrado;
                
                do{
                    let nombreABuscar = listaNucleos[contador].nombre;
                    encontrado=false;
                    if (nombreBuscado == nombreABuscar){
                        encontrado = true;
                    } else {
                        contador++;
                    }
                } while (!encontrado && contador < listaNucleos.length);
                listaIdNucleos[index] = {
                    nombre: nombreBuscado, //nombre
                    idNucleo: listaNucleos[contador].idNucleo //id
                }
            });
            mostrarNucleos(listaIdNucleos);
        }).catch((error) => console.log(error));
}

function mostrarNucleos (listaIdNucleos){
    console.log(listaIdNucleos);
    const listado = document.getElementById('listaNucleos'); //elemento ul de html
    listaIdNucleos.forEach(nucleo => {
        let elementoLista = document.createElement('li');
        let parrafo = document.createElement('p');
        let formulario = document.createElement('form');
        let inputConsorcio = document.createElement('input');
        let inputNucleo = document.createElement('input');
        let boton = document.createElement('input');
        let selectorLista = document.createElement('select');

        formulario.action='/queryLinea';
        formulario.method='post';

        parrafo.textContent = `${nucleo.nombre}`;
        inputNucleo.type='hidden';
        inputNucleo.name='idNucleo';
        inputNucleo.value=nucleo.idNucleo;
        inputConsorcio.type='hidden';
        inputConsorcio.name='idConsorcio';
        inputConsorcio.value=idConsorcio;
        selectorLista.name='idLinea';
        boton.value = 'Ver más detalles';
        boton.type = 'submit';
        
        mostrarLineas(nucleo, selectorLista);

        formulario.appendChild(inputConsorcio);
        formulario.appendChild(inputNucleo);
        formulario.appendChild(selectorLista);
        formulario.appendChild(boton);
        
        elementoLista.appendChild(parrafo);
        elementoLista.appendChild(formulario);
        listado.appendChild(elementoLista);
    });
}



function mostrarLineas(nucleo, selector) {
    fetch(`http://api.ctan.es/v1/Consorcios/${idConsorcio}/nucleos/${nucleo.idNucleo}/lineas`).then(
      (response) => realizarPeticionAPI(response)).then(
        (data) => {
          let lineas = data.lineas;
          console.log(lineas);
          rellenarSelector(selector, lineas);
        }
    ).catch((error) => console.log(error))
}

function realizarPeticionAPI (response){
    if(response.ok){
        return response.json()
    } else{
        throw new Error ('Something went wrong');
    }
}

  function rellenarSelector(selector, array){ //recorre el array que nos devuelve la API y rellena el selector con opciones
    if(array.length===0){ //si el tamaño es cero, nos mostrará este mensaje
      let option = document.createElement('option');
      option.text = 'No existen elementos disponibles'
      option.value = 0; //esto sirve para indicar que el botón no se va a mostrar porque el valor del option es cero
      selector.appendChild(option);
    } else{
      array.forEach(element => {
        let option = document.createElement('option');
        option.value = element['idLinea']; //aquí leo la propiedad id desde el String que recibe la función
        option.text = element['nombre'].toUpperCase(); //lo mismo con el nombre
        selector.appendChild(option);
      });
    }
  }


pedirHorarioAPI();