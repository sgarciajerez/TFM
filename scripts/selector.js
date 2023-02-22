function mostrarConsorcios() {    
    fetch("http://api.ctan.es/v1/Consorcios/7/consorcios").then(
        (response) => response.json() //esto es un return y retorna otra promesa al ser un .json
        //necesito hacer un then de ese resultado
    ).then(  //este es el then del json
        (data) => {
            let autobuses = data.results;
            console.log(autobuses);
//            listarConsorcios(autobuses);
        }
    ).catch( //esto es para errores
    () => {
        console.log ('Error en la petición');
    }
    )
}

function listarConsorcios(autobuses) {
    let contenedor = document.querySelector('#desde');
    pokemones.forEach((consorcio, index) => {
        let area = document.createElement("option");
        area.innerHTML= `${consorcio.nombre}`
        contenedor.appendChild(area);
    });
}

const button = document.getElementById('desde');

button.addEventListener('click', mostrarConsorcios);