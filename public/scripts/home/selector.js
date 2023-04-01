/**
 * Este script maneja el selector principal de la vista /home
 */

(function HOME_SELECTOR (){

  const SELECTOR_CONSORCIO = document.getElementById('idConsorcio');
  const SELECTOR_MUNICIPIOS = document.getElementById('idMunicipio');
  const SELECTOR_NUCLEOS = document.getElementById('idNucleo');
  const SELECTOR_LINEAS = document.getElementById('idLinea');
  const BOTON = document.getElementById('boton_buscar');

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

  function mostrarMunicipios() { //lo mismo que mostrar Consorcios, pero con los municipios
      fetch(`http://api.ctan.es/v1/Consorcios/${SELECTOR_CONSORCIO.value}/municipios`).then(
        (response) => realizarPeticionAPI(response)).then(
          (responseJson) => {
            let municipios = responseJson.municipios;
            let id="idMunicipio";
            let nombre="datos";
            rellenarSelector(SELECTOR_MUNICIPIOS, municipios, id, nombre);
          }
      ).catch((error) => mostrarError(error))
    }

  function mostrarNucleos() { //lo mismo  que los dos casos anteriores
    fetch(`http://api.ctan.es/v1/Consorcios/${SELECTOR_CONSORCIO.value}/municipios/${SELECTOR_MUNICIPIOS.value}/nucleos`).then(
      (response) => realizarPeticionAPI(response)).then(
        (responseJson) => {
          let nucleos = responseJson.nucleos;
          let id="idNucleo";
          let nombre="nombre";
          rellenarSelector(SELECTOR_NUCLEOS, nucleos, id, nombre);
        }
    ).catch((error) => mostrarError(error))
  }

  function mostrarLineas() { //similar función a las anteriores pero con distinta URL y selector
    fetch(`http://api.ctan.es/v1/Consorcios/${SELECTOR_CONSORCIO.value}/nucleos/${SELECTOR_NUCLEOS.value}/lineas`).then(
      (response) => realizarPeticionAPI(response)).then(
        (responseJson) => {
          let lineas = responseJson.lineas;
          let id="idLinea";
          let nombre="nombre";
          rellenarSelector(SELECTOR_LINEAS, lineas, id, nombre);
        }
    ).catch((error) => mostrarError(error))
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

  function limpiarSelector(selector) { //borramos todos los elementos del array salvo el primero, que es el de 'Seleccione una opción'
    for (let i = selector.options.length; i >= 1; i--) {
      selector.remove(i);
    }
  }

  function mostrarBoton(){
    if (SELECTOR_LINEAS.value != 0){ //solo se va a mostrar el boton si el valor de Lineas es distinto de cero
      BOTON.style.visibility = "visible";
    }
  }

  function ocultarBoton(){
    BOTON.style.visibility = "hidden";
  }
    
  document.addEventListener("DOMContentLoaded", () => { //ponemos aquí las funciones para que carguen una vez ha cargado el contenido de la página

    mostrarConsorcios();

    SELECTOR_CONSORCIO.addEventListener('change', () => { //si cambia el valor del selector CONSORCIO, quiero que el resto de valores se eliminen
      limpiarSelector(SELECTOR_MUNICIPIOS);
      limpiarSelector(SELECTOR_NUCLEOS);
      limpiarSelector(SELECTOR_LINEAS);
      mostrarMunicipios();
      ocultarBoton();
    })

    SELECTOR_MUNICIPIOS.addEventListener('change', () => {
      limpiarSelector(SELECTOR_NUCLEOS);
      limpiarSelector(SELECTOR_LINEAS);
      mostrarNucleos();
      ocultarBoton();
    })

    SELECTOR_NUCLEOS.addEventListener('change', () => {
      limpiarSelector(SELECTOR_LINEAS);
      mostrarLineas();
      ocultarBoton();
    })

    SELECTOR_LINEAS.addEventListener('change', mostrarBoton);
    
  })

})()