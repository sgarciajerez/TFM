/**
 * Esta función realiza una petición a la API propia y se conecta con el back para comprobar los datos del usuario
 * En concreto, va a comprobar si el usuario ha iniciado sesión con el token de autenticación
 * Se le manda el token con el header. Si ha iniciado sesión, se ejecuta la función guardarLinea.
 * */

(function pulsarBoton(){
    const boton = document.getElementById('boton_guardar');
    boton.addEventListener('click', enviarToken);
})()

function enviarToken(){
    const token = localStorage.getItem('token');
    console.log(token);
    fetch("/mi-perfil", {
      headers: {
        "Authorization": token
      }
    })
    .then(response => {
        if (response.ok) {
            guardarLinea();
        } else{
            alert('Debes iniciar sesión para realizar esta acción');
        }
    }).catch(error => {
        console.log(error);
      // manejar el error
    });
}

// Esta función va a mandar una petición al back con el token, el id del Consorcio y el id de la Linea que se quieren guardar 
function guardarLinea(){
    const token = localStorage.getItem('token');
    const params = new URLSearchParams(window.location.search);
    const Consorcio = params.get('Consorcio');
    const Linea = params.get('Linea');

    //los datos de la Linea los obtenemos del URL
    const datosLinea = {
        'idConsorcio':Consorcio,
        'idLinea':Linea
    };
    const datosJSON = JSON.stringify(datosLinea);
    
    //configuramos la peticion
    const requestOptions = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: datosJSON
    }

    //realizamos la peticion al back
    fetch('/lineas', requestOptions).
    then(response =>{
            return response.json();
            //no nos importa si la respuesta es Ok o no
            //el error 400 también es aclarativo
    }).then(data => {
        alert(data.mensaje); //mostramos el mensaje que nos manda el back
    }).catch(error=>{
        console.log(error);
    })
}