const formulario = document.getElementById("formulario_registro");
const botonRegistro = document.getElementById("boton_registro");
const botonLogin = document.getElementById('boton_login');
const contenedorErrores = document.getElementById('errores_container');

if (botonRegistro!=null){  
  botonRegistro.addEventListener("click", function(evento) {
    evento.preventDefault(); //para evitar que se envíe solo
    limpiarErrores();
    const urlRegistro = '/usuarios'; //url de la petición
    peticionAPI(urlRegistro);
  });
} else {
  botonLogin.addEventListener("click", function(evento) {
    evento.preventDefault(); //para evitar que se envíe solo
    limpiarErrores();
    const urlLogin = '/usuarios/login'; //url de la petición
    peticionAPI(urlLogin);
  });  
}

function peticionAPI (url){
  // Recopilación de datos del formulario a través de FormData
  let datosFormulario = new FormData(formulario);

  // Esto convierte los datos de FormData en un objeto JSON
  let datosJSON = {};
  datosFormulario.forEach(function(valor, clave) {
    datosJSON[clave] = valor;
  });

  // A través de fetch enviamos los datos JSON con una solicitud HTTP
  fetch(url, {
    method: "POST",
    body: JSON.stringify(datosJSON), //para volverlos un JSON
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(function(respuesta) {
    if(respuesta.ok){
        mostrarRespuestaApi(respuesta);
        redireccionarPagina();
    }else{
        mostrarRespuestaApi(respuesta);
    }
  })
  .catch(function(error) {
    console.log(error);
  });
}

function limpiarErrores() {
    while (contenedorErrores.firstChild) {
        contenedorErrores.removeChild(contenedorErrores.firstChild);
    }
}

function mostrarRespuestaApi (respuesta) {
    // Procesamos el json para mostrar el mensaje de respuesta en la página
    respuesta.json().then(function(data) {
        //primero preguntamos si los datos que nos da la respuesta que son en formato array o no
        if(Array.isArray(data)){ //si es array, lo recorremos
            data.forEach((element) => {
                let listado = document.createElement('li');
                listado.textContent=element.msg;
                contenedorErrores.appendChild(listado);
            })
        } else { //sino, mostramos directamente el mensaje
            alert(data.msg);
            if(botonLogin!=null){
              localStorage.setItem('token', data.token);
            }
        }
    });
}

function redireccionarPagina(){
  if(botonLogin!=null){
    window.location.href="/mi-perfil";
  } else {
    window.location.href="/login";
  }
}
