
// Variables necesarias
var notas = []; // Array para almacenar las notas ingresadas por el usuario

// Función para capturar las entradas y calcular el promedio
function calcularPromedio() {
    var cantidadNotas = parseInt(document.getElementById('cantidad-notas').value);

    for (var i = 0; i < cantidadNotas; i++) {
        var nota = parseFloat(document.getElementById('nota-' + i).value);
        notas.push(nota);
    }

    var total = 0;
    for (var j = 0; j < notas.length; j++) {
        total += notas[j];
    }

    var promedio = total / notas.length;
    // Mostrar el resultado en el DOM
    var resultadoElement = document.getElementById('resultado');
    resultadoElement.textContent = 'El promedio es: ' + promedio;

    // Almacenar las notas en el Storage
    localStorage.setItem('notas', JSON.stringify(notas));
}

// Event listener para el botón de calcular promedio
document.getElementById('btn-calcular').addEventListener('click', calcularPromedio);

// Event listener para detectar cambios en la cantidad de notas ingresadas
document.getElementById('cantidad-notas').addEventListener('input', function () {
    var cantidadNotas = parseInt(this.value);
    var notasInputsDiv = document.getElementById('notas-inputs');
    notasInputsDiv.innerHTML = ''; // Limpiamos los inputs existentes

    // Creamos nuevos inputs para las notas
    for (var i = 0; i < cantidadNotas; i++) {
        var notaInput = document.createElement('input');
        notaInput.type = 'number';
        notaInput.id = 'nota-' + i; // Identificador único para cada input de nota
        notaInput.min = 0;
        notasInputsDiv.appendChild(notaInput);
    }

    // Recuperar las notas almacenadas y cargarlas en los inputs
    var notasGuardadas = localStorage.getItem('notas');
    if (notasGuardadas) {
        notas = JSON.parse(notasGuardadas);
        for (var i = 0; i < notas.length; i++) {
            var notaInput = document.getElementById('nota-' + i);
            notaInput.value = notas[i];
        }
    }
});

// Al cargar la página, verificar si hay notas almacenadas y cargarlas
window.addEventListener('load', function () {
    var notasGuardadas = localStorage.getItem('notas');
    if (notasGuardadas) {
        notas = JSON.parse(notasGuardadas);
        var cantidadNotasElement = document.getElementById('cantidad-notas');
        cantidadNotasElement.value = notas.length;

        // Simular un evento 'input' para generar los inputs de notas automáticamente
        var inputEvent = new Event('input');
        cantidadNotasElement.dispatchEvent(inputEvent);
    }
});
