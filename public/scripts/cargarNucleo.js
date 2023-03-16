const params = new URLSearchParams(window.location.search);
const Consorcio = params.get('Consorcio');
const Linea = params.get('Linea');
const listado = document.getElementById('listaNucleos'); //elemento ul de html

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

function cargarNucleos(data){
    const nucleosIda = data.planificadores[0].nucleosIda;
    buscarIdNucleo(nucleosIda)
}

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
            }];
            
            if (nucleosIda==null){
                crearParrafoNeutro();
            }
            else{
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
            }
        }).catch((error) => console.log(error));
}

function crearParrafoNeutro(){
    let parrafo = document.createElement('p');
    parrafo.className = 'error';
    parrafo.textContent = 'No se ha encontrado ningún núcleo para mostrar esta información. Disculpe las molestias';
    listado.appendChild(parrafo);
}

function mostrarNucleos (listaIdNucleos){
    listaIdNucleos.forEach((nucleo,index) => {
        let elementoLista = document.createElement('li');
        let parrafo = document.createElement('p');
        let formulario = document.createElement('form');
        let inputConsorcio = document.createElement('input');
        let inputNucleo = document.createElement('input');
        let boton = document.createElement('input');
        let selectorLista = document.createElement('select');

        formulario.action='/queryLinea';
        formulario.method='post';

        parrafo.textContent = `${index+1}. ${nucleo.nombre}`;
        inputNucleo.type='hidden';
        inputNucleo.name='idNucleo';
        inputNucleo.value=nucleo.idNucleo;
        inputConsorcio.type='hidden';
        inputConsorcio.name='idConsorcio';
        inputConsorcio.value=Consorcio;
        selectorLista.name='idLinea';
        boton.value = 'Ver más detalles';
        boton.type = 'submit';
        boton.className = 'boton_animado';
        
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
    fetch(`http://api.ctan.es/v1/Consorcios/${Consorcio}/nucleos/${nucleo.idNucleo}/lineas`).then(
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