/**
 * Este código nos permite saber si el usuario ha iniciado sesión mandando el token
 * Si ha iniciado sesión, cargaremos su información a través de su id. Si no, lo redireccionamos al login
 * También añade un código para cerrar sesión cuando el usuario pinche el botón 'cerrar sesión'
 *  */

(function obtenerIdUsuario(){
    const token = localStorage.getItem('token');
    console.log(token);
    fetch("/mi-perfil", {
      headers: {
        "Authorization": token
      }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else{
            redireccionarALogin(); //Si no recibe el token, la página redirecciona al login
            throw new Error('Error al obtener los datos del usuario');
        }
    })
    .then(data => {
        let idUsuario = data.id; //leemos el json para obtener el id del usuario
        cargarInfoUsuario(idUsuario);
    })
    .catch(error => {
        console.log(error);
    });
})()

//solamente muestra contenido si se ha recibido token de acceso
function redireccionarALogin(){
    window.location.href='/login';
}

function cargarInfoUsuario(id){
    //Configuramos la petición
    const datos = {idUsuario: id};
    const peticion = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    };
    //realizamos la peticion
    fetch("/usuarios/usuario", peticion) //mandamos la petición al back
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos del usuario');
        }
        return response.json();
    })
    .then(data => {
        pintarInfoUsuario(data);
    })
    .catch(error => {
        console.log(error);
        // manejar el error
    });
}

//Mostramos en el HTML la información obtenida en la petición al back
function pintarInfoUsuario(data){
    const username = document.querySelectorAll('.username_content');
    const email = document.querySelectorAll('.email_content');
    username.forEach(element =>{
        element.innerHTML = data[0].username;
    })

    email.forEach(element =>{
        element.innerHTML = data[0].email;
    })
}


//código para cerrar Sesión
(function cerrarSesion(){
    const boton = document.getElementById('cerrar_sesion');
    boton.addEventListener('click', () =>{
        localStorage.removeItem('token'); //borramos el token
        window.location.href='/home'; //redirigimos al home
    })
})()