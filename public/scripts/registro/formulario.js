/**
 * Este código se va a utilizar tanto para /login como /registro
 * Va a recopilar los errores y los va a mostrar en el propio formulario 
 */

const formulario = document.getElementById("formulario_registro"); //este id es el mismo en ambas páginas
const botonRegistro = document.getElementById("boton_registro"); //definimos boton de registro
const botonLogin = document.getElementById('boton_login'); //definimos boton de login
const contenedorErrores = document.getElementById('errores_container');

if (botonRegistro!=null){ //Si existe el boton Registro, significa que estamos en la página registro 
  botonRegistro.addEventListener("click", function(evento) {
    evento.preventDefault(); //para evitar que se envíe automáticamente
    limpiarErrores();
    const urlRegistro = '/usuarios'; //mandamos este url a la petición
    peticionAPI(urlRegistro);
  });
} else { //si no existe, significa que estamos en el login
  botonLogin.addEventListener("click", function(evento) {
    evento.preventDefault(); //para evitar que se envíe solo
    limpiarErrores();
    const urlLogin = '/usuarios/login'; //url de la petición
    peticionAPI(urlLogin);
  });  
}

function peticionAPI (url){ //va a recibir como parámetro la url
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

function limpiarErrores() { //cada vez que lancemos la petición, vamos a limpiar los errores que se hayan mostrado
    while (contenedorErrores.firstChild) {
        contenedorErrores.removeChild(contenedorErrores.firstChild);
    }
}

function mostrarRespuestaApi (respuesta) {
    // Procesamos el json para mostrar el mensaje de respuesta en la página
    respuesta.json().then(function(data) {
        //primero preguntamos si los datos que nos da la respuesta son en formato array o no, porque puede haber solo un error o varios
        if(Array.isArray(data)){ //si es array, lo recorremos
            data.forEach((element) => {
                let listado = document.createElement('li');
                listado.textContent=element.msg;
                contenedorErrores.appendChild(listado);
            })
        } else { //sino, mostramos directamente el mensaje
            alert(data.msg);
            if(botonLogin!=null){ //además, si la petición se está haciendo desde el Login, vamos a almacenar el token de la respuesta en el localstorage
              localStorage.setItem('token', data.token);
            }
        }
    });
}

//Esto nos va a redireccionar a diferentes sitios en función del botón que haga la petición
// Si es desde el Login, se manda al perfil del usuario
// Si es desde Registro, se manda al Login para que el usuario recién registrado pueda iniciar sesión

function redireccionarPagina(){
  if(botonLogin!=null){
    window.location.href="/mi-usuario";
  } else {
    window.location.href="/login";
  }
}
