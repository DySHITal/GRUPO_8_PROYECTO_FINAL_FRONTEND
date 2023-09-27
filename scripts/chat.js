const chatBox = document.getElementById('chatbox');
const mensajeInput = document.getElementById('mensaje');
const enviarBtn = document.getElementById('enviar');

enviarBtn.addEventListener('click', () => {
  sendmsgs();
});

function sendmsgs(){
  const canalId = canalSeleccionado;
  if (!mensaje) {
    return;
  }
  const data = {
    'mensaje': mensajeInput.value,
    'canal': canalId
  }
  // Enviar el mensaje al servidor
  fetch('http://127.0.0.1:5000/mensajes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({data}),
    credentials: 'include'
  })
    .then(response => {
      if (response.status === 200) {
          return response.json().then(data => {
              loadmsgs(canalId);
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

function loadmsgs(canalSeleccionado) {
  fetch(`http://127.0.0.1:5000/mensajes/${canalSeleccionado}`)
    .then(response => {
      if (response.status === 200) {
        return response.json().then(data => {
            const mensajes = data;
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
      document.getElementById('message').innerHTML = 'An error ocurred.';
    });
}
