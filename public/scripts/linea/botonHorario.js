/**
 * La función "cargarPaginaHorario" crea un objeto FormData con los valores "Consorcio" y "Linea".
 * Estos se obtienen a través de la URL actual. 
 * Luego, el FormData se pasa por un URLSearchParams y se abre la URL /horario seguida de la URL generada
 */

(function botonHorario () {
    const params = new URLSearchParams(window.location.search);
    const idConsorcio = params.get('Consorcio');
    const idLinea = params.get('Linea');
    const boton_horario = document.getElementById('boton_horario');

    boton_horario.addEventListener('click', cargarPaginaHorario);

    function cargarPaginaHorario(){
            const formData = new FormData();
            formData.append('Consorcio', idConsorcio);
            formData.append('Linea', idLinea);
            const queryString = new URLSearchParams(formData).toString();
            window.open('horario?' + queryString, '_blank');
    }
}) ()
