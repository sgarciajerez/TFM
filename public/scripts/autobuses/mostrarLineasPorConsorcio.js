const SELECTOR_CONSORCIO = document.getElementById('idConsorcio');
const BOTON_MOSTRAR = document.getElementById('boton_mostrar_lineas');
const listado = document.getElementById('listadoConsorcios'); //elemento ul de html
const desliza = document.getElementById('parrafo_desliza');
const contenedor_listado = document.getElementById('container');

function mostrarConsorcios(){ //pide a la API la información de los Consorcios disponibles
    fetch("http://api.ctan.es/v1/Consorcios/7/consorcios").then((response) => realizarPeticionAPI(response)).then(
      (responseJson) => {
        let autobuses = responseJson.consorcios;
        let id="idConsorcio"; //estos campos sirven para definir los elementos que quiero sacar del array
        let nombre="nombre"; //son propiedades nombradas desde la Api
        rellenarSelector(SELECTOR_CONSORCIO, autobuses, id, nombre); //si recibe info, rellena el selector con las opciones disponibles
      })
      .catch((error) => mostrarError(error))
};

SELECTOR_CONSORCIO.addEventListener('change', mostrarBoton);

function mostrarBoton(){
    if (SELECTOR_CONSORCIO.value != 0){ //solo se va a mostrar el boton si el valor de Lineas es distinto de cero
    BOTON_MOSTRAR.style.visibility = "visible";
    }
}

// Al hacer click, va a escribir el h2, vaciar el listado disponible, pone visible  el boton 'desliza' y muestra las lineas del consorcio
BOTON_MOSTRAR.addEventListener('click', () =>{
    let idConsorcio = SELECTOR_CONSORCIO.value;
    escribirTitulo();
    listado.innerHTML='';  //esto vacía el listado
    contenedor_listado.style.display='block';
    desliza.style.visibility="visible";
    mostrarLineas(idConsorcio);
});

function escribirTitulo(){
    const h2 = document.getElementById('titulo_listado');
    const opcionSeleccionada = SELECTOR_CONSORCIO.selectedOptions[0].textContent;
    h2.textContent=`LISTADO DE LÍNEAS EN ${opcionSeleccionada}`
}

//Para mostrar las lineas, le pasamos el id del Consorcio
function mostrarLineas(idConsorcio) {
    fetch(`http://api.ctan.es/v1/Consorcios/${idConsorcio}/lineas`).then(
      (response) => realizarPeticionAPI(response)).then(
        (data) => {
          let lineas = data.lineas;
          //creamos un listado de lineas con los datos y el id del Consorcio
          crearListado(lineas, idConsorcio);
        }
    ).catch((error) => console.log(error))
}

//Creamos un listado y recorremos los datos recibidos del api

function crearListado (array, idConsorcio){
    //En cada elemento del array, creamos un <li> que contiene un <p> y un <form>
    array.forEach((element, index) => {

      let elementoLista = document.createElement('li');
      let parrafo = document.createElement('p');
      let formulario = document.createElement('form');
      //cada form va a tener estos inputs
      let inputConsorcio = document.createElement('input');
      let inputLinea = document.createElement('input');
      let boton = document.createElement('input');

      //action y metodo del form
      formulario.action='/queryLinea';
      formulario.method='post';

      //el p va a tener el elemento
      parrafo.textContent = `${index+1}. ${element.nombre}`;

      //Los dos inputs que tiene son de tipo hidden para que no se muestren en el HTML
      inputLinea.type='hidden';
      inputLinea.name='idLinea';
      inputLinea.value=element.idLinea;
      inputConsorcio.type='hidden';
      inputConsorcio.name='idConsorcio';
      inputConsorcio.value=idConsorcio;

      //el input type submit
      boton.value = 'Ver';
      boton.type = 'submit';
      boton.className ='boton_animado';
      
      //Añadimos los elementos
      formulario.appendChild(inputConsorcio);
      formulario.appendChild(inputLinea);
      formulario.appendChild(boton);
      
      elementoLista.appendChild(parrafo);
      elementoLista.appendChild(formulario);
      listado.appendChild(elementoLista);
    });
}

  function realizarPeticionAPI(response){ //si la petición a la API recibe respuesta, nos la devuelve
    if (response.ok) {
    return response.json();
    }
    throw new Error('Something went wrong');
  }


  function mostrarError (error) { //muestra el error 
    console.log(`Error en la petición a la API: ${error}`);
  }

  function rellenarSelector(selector, array, id, nombre){ //recorre el array que nos devuelve la API y rellena el selector con opciones
    if(array.length===0){ //si el tamaño es cero, nos mostrará este mensaje
      let option = document.createElement('option');
      option.text = 'No existen elementos disponibles'
      option.value = 0; //esto sirve para indicar que el botón no se va a mostrar porque el valor del option es cero
      selector.appendChild(option);
    } else{
      array.forEach(element => {
        let option = document.createElement('option');
        option.value = element[id]; //aquí leo la propiedad id desde el String que recibe la función
        option.text = element[nombre].toUpperCase(); //lo mismo con el nombre
        selector.appendChild(option);
      });
    }
  }

  mostrarConsorcios();