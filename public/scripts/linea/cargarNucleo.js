//Obtenemos los datos de la URL

const params = new URLSearchParams(window.location.search);
const Consorcio = params.get('Consorcio');
const Linea = params.get('Linea');
const listado = document.getElementById('listaNucleos'); //elemento ul de html

//pedirHorarioAPI() hace la petición a la API usando los parámetros de la URL. 
//Si hay éxito, llama a cargarNucleos() pasando los datos obtenidos. Si hay un error, mensaje en consola

function pedirHorarioAPI(){

    fetch(`http://api.ctan.es/v1/Consorcios/${Consorcio}/horarios_lineas?dia=&frecuencia=&lang=ES&linea=${Linea}&mes=`).then(
        (response)=>{
            if(response.ok){
                return response.json()
            } else{
                throw new Error ('Something went wrong');
            }
        }).then((data) =>{
            cargarNucleos(data);
        }).catch((error) => console.log(error));
}

//Leemos los nucleos Ida de los datos obtenidos de la URL
function cargarNucleos(data){
    const nucleosIda = data.planificadores[0].nucleosIda;
    buscarIdNucleo(nucleosIda)
}

//Esta función se realiza debido a que en los primeros datos obtenidos en la API, el Nucleo no carga su id
// Entonces, en esta segunda URL, donde sí tenemos el id de los nucleos, comparamos datos y lo obtenemos

function buscarIdNucleo (nucleosIda) {
    fetch(`http://api.ctan.es/v1/Consorcios/${Consorcio}/nucleos`).then(
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
            }]; //creamos un array vacío y en el que cada elemento va a tener el nombre del nucleo y la id
            // esto nos servirá para guardar info en el futuro
            
            if (nucleosIda==null){
                crearParrafoNeutro(); //hay casos en los que la API no da datos, por eso creamos este elemento para evitar errores
            }
            else{ //si hay información en nucleosIda, entonces comparamos la lista Nucleos
                // vamos a recorrer el array Nucleos ida y en cada elemento vamos a comparar las dos listas 
                nucleosIda.forEach((element, index) => {
                    let contador=0;
                    let nombreBuscado = element.nombre
                    let encontrado;
                    
                    do{ //bucle pasando por cada elemento de la listaNucleos comparando los nombres hasta que encuentre coincidencias
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
                    } //entonces, guardamos el nombre y el id del primer nucleo y repetimos con cada elemento de nuestro array
                });
                mostrarNucleos(listaIdNucleos); //una vez tenemos los id, ya podemos mostrar los nucleos
            }
        }).catch((error) => console.log(error));
}

//Parrafo del error
function crearParrafoNeutro(){
    let parrafo = document.createElement('p');
    parrafo.className = 'error';
    parrafo.textContent = 'No se ha encontrado ningún núcleo para mostrar esta información. Disculpe las molestias';
    listado.appendChild(parrafo);
}

// Vamos a crear li que contengan el nombre del nucleo y un formulario para enviar la info con un POST
// este formulario va a tener dos elementos hidden, como son el Id del consorcio y del nucleo, necesarios para las URL de la API
function mostrarNucleos (listaIdNucleos){ 
    //recorremos cada elemento del array de listaIdNucleos y cada elemento será un <li> que tendrá un <p> y un <form> en su interior
    listaIdNucleos.forEach((nucleo,index) => {
        let elementoLista = document.createElement('li');
        let parrafo = document.createElement('p');
        let formulario = document.createElement('form');
        let inputConsorcio = document.createElement('input');
        let inputNucleo = document.createElement('input');
        let boton = document.createElement('input');
        let selectorLista = document.createElement('select');

        //Definimos action y metodo del form
        formulario.action='/queryLinea';
        formulario.method='post';

        //El texto del p
        parrafo.textContent = `${index+1}. ${nucleo.nombre}`;
        //Los input del form
        inputNucleo.type='hidden';
        inputNucleo.name='idNucleo';
        inputNucleo.value=nucleo.idNucleo; //value
        inputConsorcio.type='hidden';
        inputConsorcio.name='idConsorcio';
        inputConsorcio.value=Consorcio; //value
        //también mandaremos el id de la Linea, por eso creamos este name en el selector
        selectorLista.name='idLinea';
        //el input type submit
        boton.value = 'Ver más detalles';
        boton.type = 'submit';
        //clase predefinida con elementos css
        boton.className = 'boton_animado';
        
        //le pasamos cada nucleo del array y el selector creado
        mostrarLineas(nucleo, selectorLista);

        //agregamos los elementos
        formulario.appendChild(inputConsorcio);
        formulario.appendChild(inputNucleo);
        formulario.appendChild(selectorLista);
        formulario.appendChild(boton);
        
        elementoLista.appendChild(parrafo);
        elementoLista.appendChild(formulario);
        listado.appendChild(elementoLista);
    });
}


// La función va a cargar los datos de las lineas y necesita el id del nucleo y del consorcio
// Es por esta función por la que tuvimos que obtener el id del Nucleo 
function mostrarLineas(nucleo, selector) {
    fetch(`http://api.ctan.es/v1/Consorcios/${Consorcio}/nucleos/${nucleo.idNucleo}/lineas`).then(
      (response) => realizarPeticionAPI(response)).then(
        (data) => {
          let lineas = data.lineas; //obtenemos las lineas y rellenamos el selector con ellas
          rellenarSelector(selector, lineas);
        }
    ).catch((error) => console.log(error))
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

//función por ahorrar código

function realizarPeticionAPI (response){
    if(response.ok){
        return response.json()
    } else{
        throw new Error ('Something went wrong');
    }
}


pedirHorarioAPI();