(function obtenerTokenUsuario(){
    const token = localStorage.getItem('token');
    fetch("/mi-perfil", {
      headers: {
        "Authorization": token
      }
    })
    .then(response => {
        if (response.ok) {
            window.location.href='/mi-usuario';
        } else{
            throw new Error('El usuario tiene que iniciar sesión');
        }
    }).catch(error => {
        console.log(error);
      // manejar el error
    });
})()