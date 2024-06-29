let intentos = 6;
let palabra = '';

window.addEventListener('load', init);

const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);

async function init() {
    palabra = await obtenerPalabraAleatoria();
    console.log(palabra); // Para depuración, puedes eliminar esta línea en producción
}

async function obtenerPalabraAleatoria() {
    try {
        const response = await fetch('https://random-word-api.herokuapp.com/word?length=5&lang=es');
        const data = await response.json();
        return data[0].toUpperCase();
    } catch (error) {
        console.error('Error al obtener la palabra:', error);
        return 'ERROR'; // Palabra por defecto en caso de error
    }
}

function intentar() {
    const INTENTO = leerIntento();

    if (INTENTO === palabra) {
        terminar(`<h1>¡GANASTE! 😃</h1><p>La palabra era: ${palabra}</p>`);
        return;
    }

    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';

    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';

        if (INTENTO[i] === palabra[i]) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#79b851';
        } else if (palabra.includes(INTENTO[i])) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#f3c237';
        } else {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#a4aec4';
        }

        ROW.appendChild(SPAN);
    }

    GRID.appendChild(ROW);
    actualizarIntentos();

    if (intentos === 0) {
        terminar(`<h1>¡PERDISTE! 😞</h1><p>La palabra era: ${palabra}</p>`);
    }
}

function leerIntento() {
    let intento = document.getElementById("guess-input").value;
    intento = intento.toUpperCase();
    return intento;
}

function actualizarIntentos() {
    intentos--;
    const intentosElement = document.getElementById('guesses');
    intentosElement.innerHTML = `<p>Intentos restantes: ${intentos}</p>`;
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    const BOTON = document.getElementById("guess-button");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}