const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})


function buscarClima(e) {
    e.preventDefault();

    
    // Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === '') {
        //hubo un error
        mostrarError('Ambos campos son obligatorios');

        return;
    }



    // Consultar la API
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta) {
     // Crear un alerta
    const alerta = document.createElement('div');

    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

    alerta.innerHTML = `
        <strong class = "font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
    `;

    container.appendChild(alerta); 
    
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
}

function consultarAPI(ciudad, pais){

    const appId = '9ccf3774dd5b22bd6edd1fb98231842c';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    //console.log(url);

    Spinner(); // muestra un spinner de carga

    fetch(url)
        .then( respuesta => respuesta.json())
        .then(datos => {
            console.log(datos)

            limpiarHTML(); //limpiar el html previo
            
            //console.log(datos);
            
            if(datos.cod === "404") {
                mostrarError('Ciudad no encontrada')
                return;
            }

            // Imprimela respuesta en el html
            mostrarClima(datos);
        })
    
}

function mostrarClima(datos) {
    const { name, main: {temp, temp_max, temp_min} } = datos;

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent =`Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl')

    const centigrados = temp - kelvinACentigrados(temp);
    const max = temp - kelvinACentigrados(temp_max);
    const min = temp - kelvinACentigrados(temp_min);

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('font-bold', 'text-xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('font-bold', 'text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv);
}

function kelvinACentigrados(grados) {
    return parseInt(grados - 273.15);
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-circle');

    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-child"></div>
    <div class="sk-circle2 sk-child"></div>
    <div class="sk-circle3 sk-child"></div>
    <div class="sk-circle4 sk-child"></div>
    <div class="sk-circle5 sk-child"></div>
    <div class="sk-circle6 sk-child"></div>
    <div class="sk-circle7 sk-child"></div>
    <div class="sk-circle8 sk-child"></div>
    <div class="sk-circle9 sk-child"></div>
    <div class="sk-circle10 sk-child"></div>
    <div class="sk-circle11 sk-child"></div>
    <div class="sk-circle12 sk-child"></div>
    
    `;

    resultado.appendChild(divSpinner);
}