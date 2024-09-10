
// Obtener referencias a elementos de la UI mediante sus IDs actualizados.
const botonInicio = document.getElementById('button-mic');
const salida = document.getElementById('chat-input');
const botonLimpiar = document.getElementById('botonLimpiar');

// Funcionalidad del botón de limpiar: limpia el texto del elemento de salida.
/*
botonLimpiar.onclick = function() {
    // Limpia el contenido del elemento 'salida'.
    salida.value = '';
};*/

// Funcionalidad del botón de inicio: inicia el reconocimiento de voz.
botonInicio.addEventListener('click', function() {
    //alert("asdas")
    // Indicador para controlar el inicio del reconocimiento de voz.
    var speech = true;
    // Compatibilidad con prefijo webkit para navegadores que lo requieran.
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

    // Crear una instancia de SpeechRecognition.
    const reconocimiento = new SpeechRecognition();
    reconocimiento.lang = 'es-ES';
    // Configurar para obtener resultados intermedios (no finales).
    reconocimiento.interimResults = true;

    // Manejar el evento 'result' para procesar los resultados del reconocimiento.
    reconocimiento.addEventListener('result', e => {
        // Convertir los resultados del evento en un solo string de texto.
        const transcripcion = Array.from(e.results)
            .map(resultado => resultado[0])
            .map(resultado => resultado.transcript)
            .join('');

        // Actualizar el input 'salida' con el texto transcrito.
        salida.value = transcripcion;

        // Opcional: Mostrar el texto transcrito en la consola para depuración.
        console.log(transcripcion);
    });

    // Iniciar el reconocimiento de voz si la variable 'speech' es true.
    if (speech === true) {
        reconocimiento.start();
    }
});