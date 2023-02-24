document.addEventListener("DOMContentLoaded", () => {

  const SELECTOR_CONSORCIO = document.getElementById('selector_consorcio');
  const SELECTOR_MUNICIPIOS = document.getElementById('selector_municipio');
  const SELECTOR_NUCLEOS = document.getElementById('selector_nucleo');
  const SELECTOR_LINEAS = document.getElementById('selector_linea');
  
  (function mostrarConsorcios(){
      fetch("http://api.ctan.es/v1/Consorcios/7/consorcios").then((response) => {
        if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    })
    .then((responseJson) => {
      let autobuses = responseJson.consorcios;
      autobuses.forEach(element => {
        let option = document.createElement('option');
        option.value = element.idConsorcio;
        option.text = element.nombre.toUpperCase();
        SELECTOR_CONSORCIO.appendChild(option);
        });
    })
    .catch((error) => {
      console.log(error)
    });
  }) ();

  function limpiarSelector(selector) {
    for (let i = selector.options.length; i >= 0; i--) {
      selector.remove(i);
    }
  };

  (function mostrarMunicipios() {
    console.log('calling');
    SELECTOR_CONSORCIO.addEventListener('change', () => {
      limpiarSelector(SELECTOR_MUNICIPIOS);
      fetch(`http://api.ctan.es/v1/Consorcios/${SELECTOR_CONSORCIO.value}/municipios`).then((response) => {
        if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    })
    .then((responseJson) => {
      let municipios = responseJson.municipios;
      municipios.forEach(element => {
        let option = document.createElement('option');
        option.value = element.idMunicipio;
        option.text = element.datos.toUpperCase();
        SELECTOR_MUNICIPIOS.appendChild(option);
        });
    })
    .catch((error) => {
      console.log(error)
    });
    })
  })();

  (function mostrarNucleos() {
    console.log('calling');
    SELECTOR_CONSORCIO.addEventListener ('change', () => {
      limpiarSelector (SELECTOR_NUCLEOS);
    })
    SELECTOR_MUNICIPIOS.addEventListener('change', () => {
      limpiarSelector(SELECTOR_NUCLEOS);
      fetch(`http://api.ctan.es/v1/Consorcios/${SELECTOR_CONSORCIO.value}/municipios/${SELECTOR_MUNICIPIOS.value}/nucleos`).then((response) => {
        if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    })
    .then((responseJson) => {
      let nucleos = responseJson.nucleos;
      nucleos.forEach(element => {
        let option = document.createElement('option');
        option.value = element.idNucleo;
        option.text = element.nombre.toUpperCase();
        SELECTOR_NUCLEOS.appendChild(option);
        });
    })
    .catch((error) => {
      console.log(error)
    });
    })
  })();
  (function mostrarLineas() {
    console.log('calling');
    SELECTOR_CONSORCIO.addEventListener ('change', () => {
      limpiarSelector (SELECTOR_LINEAS);
    })
    SELECTOR_MUNICIPIOS.addEventListener ('change', () => {
      limpiarSelector (SELECTOR_LINEAS);
    })
    SELECTOR_NUCLEOS.addEventListener('change', () => {
      limpiarSelector(SELECTOR_LINEAS);
      fetch(`http://api.ctan.es/v1/Consorcios/${SELECTOR_CONSORCIO.value}/nucleos/${SELECTOR_NUCLEOS.value}/lineas`).then((response) => {
        if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    })
    .then((responseJson) => {
      let lineas = responseJson.lineas;
      lineas.forEach(element => {
        let option = document.createElement('option');
        option.value = element.idLinea;
        option.text = element.nombre.toUpperCase();
        SELECTOR_LINEAS.appendChild(option);
        });
    })
    .catch((error) => {
      console.log(error)
    });
    })
  })();
});;
  
