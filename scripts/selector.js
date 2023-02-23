document.addEventListener("DOMContentLoaded", () => {

    const AGREGAR_VALOR_A_SELECTOR = (selector, valor) => {
        let option = document.createElement('option');
        option.value = valor.idConsorcio;
        option.text = valor.nombre.toUpperCase();
        selector.appendChild(option);
    };

    const SELECTOR_CONSORCIO = document.getElementById('selector_consorcio');
    const SELECTOR_MUNICIPIO = document.getElementById('selector_municipio');

    function mostrarConsorcios(){
        fetch("http://api.ctan.es/v1/Consorcios/7/consorcios").then((response) => {
          if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((responseJson) => {
        let autobuses = responseJson.consorcios;
        listarArrayEnSelector(SELECTOR_CONSORCIO, autobuses);
      })
      .catch((error) => {
        console.log(error)
      });
    }

    function mostrarMunicipios(id){
        fetch(`http://api.ctan.es/v1/Consorcios/${id}/municipios`).then((response) => {
          if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((responseJson) => {
        console.log(responseJson);
        let municipios = responseJson.consorcios;
        listarArrayEnSelector(SELECTOR_MUNICIPIO, municipios);
      })
      .catch((error) => {
        console.log(error)
      });
    }

    function listarArrayEnSelector(selector, array){
        array.forEach(bus => {
            AGREGAR_VALOR_A_SELECTOR(selector,bus);        
        });
    }

    // SELECTOR_CONSORCIO.onchange() = () =>{
    //     function seleccionar_Consorcio(){
    //         let idConsorcio = SELECTOR_CONSORCIO.value;
    //         mostrarMunicipios(idConsorcio);
    //     }
    // };
    
    SELECTOR_CONSORCIO.addEventListener("click", mostrarConsorcios());

});;
  
