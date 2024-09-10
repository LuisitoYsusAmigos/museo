let speechSynthesisInstance;

document.getElementById('control').addEventListener('click', function () {
    hablar("hola como estas mi nombre es paola")
});


function hablar(texto){
    const button = document.getElementById('control');

    if (speechSynthesisInstance && speechSynthesis.speaking) {
      // Si se está reproduciendo algo, detenerlo
      speechSynthesis.cancel();
      button.textContent = '⏵︎';
      button.style.display='none'
    } else {
      // Si no hay nada reproduciéndose, reproducir el texto
      //const texto= "hola mucho gusto";
      //const texto = document.getElementById('chat-input').value;
      if (texto.trim() !== '') {
        const utterance = new SpeechSynthesisUtterance(texto);
        speechSynthesis.speak(utterance);
        speechSynthesisInstance = utterance;
        button.textContent = '⏹︎';//➤⏹︎⏺︎⏵︎
        button.style.display='block'
        // Cambiar el botón a "Play" cuando la reproducción termine
        utterance.onend = function () {
          button.textContent = '⏵︎';
          button.style.display='none'
        };
      }
    }

}



document.getElementById('chat-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        conversacion()
    }
});
// prueba
/*
document.getElementById('botonBajar').addEventListener('click', async function () {
    scrollToBottom()

})
// prueba
*/


document.getElementById('send-left-button').addEventListener('click', async function () {
    conversacion()
});


document.getElementById('chat-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage('left', null);
    }
});


function conversacion(){
        // Enviar el primer mensaje (mensaje del usuario)
        const mensaje = document.getElementById('chat-input').value.trim();
        sendMessage('left', null);
    
        // Enviar el mensaje de "cargando"
        sendMessage('right', 'cargando');
        // Hacer una pausa breve antes de enviar la pregunta a la API
        setTimeout(function() {
            deleteLastMessage('right')
            enviarPreguntaSincrona(mensaje);
        }, 100);
    
}





function enviarPreguntaSincrona(pregunta) {
    try {
        
        // Crear una nueva solicitud
        const xhr = new XMLHttpRequest();

        // Configurar la solicitud como POST y sincrónica
        //xhr.open('POST', 'https://chatbot.dev.dtt.tja.ucb.edu.bo/pregunta', false);
        xhr.open('POST', 'https://chatbot.dev.dtt.tja.ucb.edu.bo/pregunta', false);  // El tercer argumento 'false' hace que la solicitud sea sincrónica

        // Establecer los encabezados
        xhr.setRequestHeader('Content-Type', 'application/json');

        // Enviar la solicitud con la pregunta en el cuerpo
        xhr.send(JSON.stringify({ pregunta: pregunta }));
        const respuestaError="Ocurrio un error intentelo mas tarde"
        
        // Verificar si la solicitud fue exitosa
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            if (data.respuesta) {
                const respuestaapi= data.respuesta
                //const preguntaapi = data.pregunta
                sendMessage("right", respuestaapi)
                //sendMessage("right", preguntaapi)
                hablar(respuestaapi)
                //alert(respuestaapi)
                return data.respuesta;  // Devuelve la respuesta de la API
            } else {
                sendMessage("right","Ocurrio un error intentelo mas tarde 1")
                hablar(respuestaError)
                throw new Error('La respuesta no contiene el campo "respuesta"');
            }
        } else {
            sendMessage("right","Ocurrio un error intentelo mas tarde 2")
            hablar(respuestaError.toString)
            throw new Error(`Error en la solicitud: ${xhr.statusText}`);
        }
    } catch (error) {

        sendMessage("right","Ocurrio un error intentelo mas tarde")
        hablar("Ocurrio un error intentelo mas tarde")
        return `Error: ${error.message}`;  // Devuelve el mensaje de error
    }
}




function scrollToBottom() {
    const element = document.getElementById("myDIV");
    element.scrollTop = element.scrollHeight;
  }


function sendMessage(alignment, aux) {
    const input = document.getElementById('chat-input');
    let messageText;

    if (aux === null || aux === undefined) {
        messageText = input.value.trim();
    } else {
        messageText = aux // Se usa el valor de aux
    }

    if (messageText === '') return; // No enviar si el mensaje está vacío

    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', alignment);
    messageDiv.textContent = messageText;

    chatMessages.appendChild(messageDiv);
    input.value = '';
    scrollToBottom();
}

function deleteLastMessage(alignment) {
    const chatMessages = document.getElementById('chat-messages');
    
    const messages = chatMessages.getElementsByClassName(`chat-message ${alignment}`);
    
    if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        chatMessages.removeChild(lastMessage);
    }
  }
  










