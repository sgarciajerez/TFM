(function obtenerLineasUsuario(){
    const token = localStorage.getItem('token');
    console.log(token);
    fetch("/lineas/mis-lineas", { //le pasamos el token con el que obtenemos el id de Usuario
      headers: {
        "Authorization": token
      }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos del usuario');
        }
        return response.json();
    })
    .then(data => { //el backend procesa los datos y nos envía las líneas almacenadas en la base de datos
        let lineas = data;
        procesarLineasUsuario(lineas);
    })
    .catch(error => {
        console.log(error);
      // manejar el error
    });
})();

//esta función va a esperar a recibir información de la promesa 'obtenerDatosLinea'
//recorre la información de las líneas y muestra aquellas almacenadas por el usuario
function procesarLineasUsuario(array){
    if(array.length>0){ //solamente va a hacer esto siempre que haya recibido información de la petición
        array.forEach(async (element) => {
            const idConsorcio = element.idConsorcio;
            const idLinea = element.idLinea;
            let nombreLinea = await obtenerDatosLinea(idConsorcio, idLinea);
            pintarNombreLinea(nombreLinea, idConsorcio, idLinea);
        });
    } else{
        mostrarError(); //esto va a mostrar un mensaje predeterminado en el listado 
    }
}


//la función hace la petición a la API de los autobuses y retorna el nombre de la línea
function obtenerDatosLinea (idConsorcio, idLinea){
    return new Promise((resolve, reject) => {
        fetch(`http://api.ctan.es/v1/Consorcios/${idConsorcio}/lineas/${idLinea}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else{
                throw new Error('Something went wrong');
            } 
        }).then((data) => {
            let nombreLinea = data.nombre;
            resolve(nombreLinea);
        }).catch((error) => {
            reject(error);
        });
    });
}

//esta función crea el elemento visible del HTML en formato formulario con método POST
function pintarNombreLinea(nombreLinea, idConsorcio, idLinea){
    const listado = document.getElementById('listado_lineas');
    const elementoLista = document.createElement('li');
    const parrafo = document.createElement('p');
    const formulario = document.createElement('form');
    const inputConsorcio = document.createElement('input');
    const inputLinea = document.createElement('input');
    const boton = document.createElement('input');
    
    formulario.action='/queryLinea';
    formulario.method='post';

    parrafo.textContent = nombreLinea;
    inputLinea.type='hidden';
    inputLinea.name='idLinea';
    inputLinea.value=idLinea;
    inputConsorcio.type='hidden';
    inputConsorcio.name='idConsorcio';
    inputConsorcio.value=idConsorcio;
    boton.value = 'VER';
    boton.type = 'submit';
    boton.className = 'boton_animado';
        
    formulario.appendChild(inputConsorcio);
    formulario.appendChild(inputLinea);
    formulario.appendChild(boton);
        
    elementoLista.appendChild(parrafo);
    elementoLista.appendChild(formulario);
    listado.appendChild(elementoLista);
}

function mostrarError(){
    const listado = document.getElementById('listado_lineas');
    const elementoLista = document.createElement('li');

    elementoLista.textContent='No hemos encontrado líneas almacenadas';
    listado.appendChild(elementoLista);
}