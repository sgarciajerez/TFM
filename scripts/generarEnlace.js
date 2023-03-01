const SELECTOR_LINEAS = document.getElementById('selector_linea');

SELECTOR_LINEAS.addEventListener ('change', () => {
    let idLinea = SELECTOR_LINEAS.value;
    (function generarEnlace (){
        let url = new URL('http://127.0.0.1:5500?line=1');
        let params = new URLSearchParams(url.search);
        params.append('line', idLinea);
        console.log(idLinea);
        console.log(url);
    })();
});

