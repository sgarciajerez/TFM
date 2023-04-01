/**
 * Este código define una función autoinvocada para mandar el token del usuario a la BD
 * Si hay éxito, la página va a redireccionar directamente al perfil del usuario
 * Sino, la página va a permitir entrar al login y para que el usuario inicie sesión
*/

(function obtenerTokenUsuario(){
    const token = localStorage.getItem('token'); //obtenemos el token almacenado en el localStorage
    fetch("/mi-perfil", { //mandamos la petición con el token en la cabecera
      headers: { 
        "Authorization": token
      }
    })
    .then(response => { //si es ok, redirigimos
        if (response.ok) {
            window.location.href='/mi-usuario';
        } else{ //sino, entramos en el login
            throw new Error('El usuario tiene que iniciar sesión');
        }
    }).catch(error => {
        console.log(error);
      // manejar el error
    });
})()