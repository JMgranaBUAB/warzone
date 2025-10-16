// Cargar el nivel guardado al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
    cargarNivelGuardado();
});

let enviarNivel = document.getElementById("enviarNivel");
enviarNivel.onclick = newEvent;

// Botones de subir y bajar nivel
let subirNivel = document.getElementById("subirNivel");
let bajarNivel = document.getElementById("bajarNivel");

// Guardar el nivel cada vez que se cambie el input
let inputNivel = document.getElementById("miNivel");
inputNivel.addEventListener('input', function() {
    guardarNivel(this.value);
});

// Funcionalidad de los botones de subir y bajar nivel
subirNivel.addEventListener('click', function() {
    let nivelActual = parseInt(inputNivel.value) || 0;
    let nuevoNivel = Math.min(nivelActual + 1, 100); // Máximo 100
    inputNivel.value = nuevoNivel;
    guardarNivel(nuevoNivel.toString());
    newEvent(); // Actualizar cálculos automáticamente
});

bajarNivel.addEventListener('click', function() {
    let nivelActual = parseInt(inputNivel.value) || 0;
    let nuevoNivel = Math.max(nivelActual - 1, 0); // Mínimo 0
    inputNivel.value = nuevoNivel;
    guardarNivel(nuevoNivel.toString());
    newEvent(); // Actualizar cálculos automáticamente
});

async function newEvent() {
    let nivelRestante = await mostrarNivel();
    tiempoRestante(nivelRestante);
}

setInterval(newEvent, 1000);

// Función para guardar el nivel en localStorage
function guardarNivel(nivel) {
    localStorage.setItem('warzone_nivel', nivel);
    console.log('Nivel guardado:', nivel);
}

// Función para cargar el nivel desde localStorage
function cargarNivelGuardado() {
    let nivelGuardado = localStorage.getItem('warzone_nivel');
    if (nivelGuardado !== null && nivelGuardado !== '') {
        document.getElementById("miNivel").value = nivelGuardado;
        console.log('Nivel cargado:', nivelGuardado);
        // Ejecutar el cálculo automáticamente si hay un nivel guardado
        newEvent();
    }
}

function mostrarNivel() {
    let miNivel = document.getElementById("miNivel").value
    console.log(miNivel)

    let resultado = document.getElementById("resultado")
    let nivelRestante = 100 - miNivel

    //resultado.innerHTML=`Mi nivel : ${miNivel} <br>`
    /* resultado.innerHTML = `Remaining :  ${nivelRestante}% <br>` */

    let minutosTotales = nivelRestante * 30;
    let horas = Math.floor(minutosTotales / 60);
    let minutos = Math.floor(minutosTotales % 60);

    resultado.innerHTML = `Time needed in game : ${horas}h ${minutos}min<br>`;

    return (nivelRestante)
}

function tiempoRestante(nivelRestante) {
    let ahora = new Date;
    let limite = new Date("december 4, 2025 18:00:00")/* 2/1/2023 11:00 AM */
    let diff = limite - ahora

    let resultado = document.getElementById("resultado")
    let dias = Math.floor((diff / 86400000))
    let horas = Math.floor((diff - (dias * 86400000)) / 3600000)
    let minutos = Math.floor((diff - (dias * 86400000) - (horas * 3600000)) / 60000)
    //resultado.innerHTML+=`Tiempo restante : ${dias}d ${horas}h ${minutos}m <br>`

    let nivelDia = ((nivelRestante / diff) * 86400000).toFixed(5)
    let nivelHora = ((nivelRestante / diff) * 3600000).toFixed(5)
    let nivelMinuto = ((nivelRestante / diff) * 60000).toFixed(5)

    resultado.innerHTML += `Levels per day : ${nivelDia}%<br>`
    resultado.innerHTML += `Levels per hour : ${nivelHora}%<br>`
    resultado.innerHTML += `Levels per minute : ${nivelMinuto}% <br>`
}
