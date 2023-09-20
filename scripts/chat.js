const chatBox = document.getElementById('chatbox');
const mensajeInput = document.getElementById('mensaje');
const enviarBtn = document.getElementById('enviar');

enviarBtn.addEventListener('click', () => {
  const mensaje = mensajeInput.value;

  if (mensaje.trim() !== '') {
    // Enviar el mensaje al servidor
    fetch('http://127.0.0.1:5000/mensajes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mensaje }),
    })
      .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                loadmsgs();
                mensajeInput.value = '';
            });
        } else {
            return response.json().then(data => {
                document.getElementById('message').innerHTML = data.msg;
            });
        }
      })
    .catch(error => {
        document.getElementById('message').innerHTML = 'An error occurred.';
    });
    }
});

document.getElementById('canales').addEventListener('click', event => {
    if (event.target.classList.contains('canal')) {
      const canalSeleccionado = event.target.dataset.canalId; // Hay que definir 'data-canal-id' en los elementos de canal
      
      loadmsgs(canalSeleccionado);
    }
  });


function loadmsgs(canalSeleccionado) {
  fetch(`http://127.0.0.1:5000/mensajes/${canalSeleccionado}`)
    .then(response => {
      if (response.status === 200) {
        return response.json().then(data => {
            const mensajes = data.mensajes;
            // Limpia el contenido actual de chatBox
            chatBox.innerHTML = '';
      
            // Agrega los mensajes del canal al chatBox
            mensajes.forEach(mensaje => {
              const mensajeElement = document.createElement('div');
              mensajeElement.classList.add('mensaje');
              mensajeElement.textContent = mensaje;
              chatBox.appendChild(mensajeElement);
            });
          })
    } else {
        return response.json().then(data => {
            document.getElementById('message').innerHTML = data.msg;
      })
    }
    })
    .catch(error => {
      console.error('Error al cargar los mensajes del canal:', error);
    });
}

// Llama a cargarMensajesDelCanalSeleccionado cuando se selecciona un canal
// (debes implementar la lógica para detectar la selección del canal)
