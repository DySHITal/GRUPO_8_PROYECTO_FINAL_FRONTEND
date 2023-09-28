const infoUsuario = document.querySelector('.infousuario')
      servidoresCreados = document.querySelector('.servidoresCreados'),
      mensajeUsuario = document.querySelector('mensajeUsuario')


//CARGAMOS LA INFORMACION AL ACCEDER  A LA PAGINA
document.addEventListener('DOMContentLoaded', function () {
    // Solicitud para obtener la información del usuario
    fetch('http://127.0.0.1:5000/ruta_info_usuario', {
    method: 'GET',
    credentials: 'include'
})
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                
                const infoUsuarioHTML = `
                    <p><strong>Nombre:</strong> ${data.nombre || 'N/A'}</p>
                    <p><strong>Apellido:</strong> ${data.apellido || 'N/A'}</p>
                    <p><strong>Alias:</strong> ${data.alias || 'N/A'}</p>
                    <p><strong>Correo:</strong> ${data.correo || 'N/A'}</p>
                    <p><strong>Fecha Nacimiento:</strong> ${data.fechas_nacimiento || 'N/A'}</p>
                `;

                infoUsuario.innerHTML = infoUsuarioHTML;
            });
        } else {
            return response.json().then(data => {
                document.getElementById('message').innerHTML = data.msg;
            });
        }
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario', error);
        document.getElementById('message').innerHTML = 'An error occurred.';
    });

    // Cargar servidores creados por el usuario
const servidoresCreados = document.querySelector('.servidoresCreados');

fetch('http://127.0.0.1:5000/ruta_servidores_creados', {
    method: 'GET',
    credentials: 'include'
})
.then(response => {
    if (response.status === 200) {
        return response.json().then(data => {
            // Rellena la lista de servidores creados por el usuario
            servidoresCreados.innerHTML = '';
            data.servidores.forEach(servidor => {
                const li_serv = document.createElement('li');
                li_serv.textContent = servidor.nombre_servidor;
                li_serv.id=servidor.id;
                servidoresCreados.appendChild(li_serv);
               // Agregar evento de clic solo si aún no se ha agregado
               if (!li_serv.hasEventListeners) {
                msj.addEventListener('dblclick', function(event) {
                    // editarEliminarServidor(li_serv.id)
                });
                servidorElement.hasEventListeners = true; // Marcar que se agregó el evento
            } 
            });
        });
    } else {
        return response.json().then(data => {
            document.getElementById('message').innerHTML = data.msg;
        });
    }
})
.catch(error => {
    console.error('Error al cargar servidores creados', error);
    document.getElementById('message').innerHTML = 'An error occurred.';
});

// Cargar últimos mensajes enviados por el usuario
const mensajesUsuario = document.querySelector('.mensajesUsuario');

fetch('http://127.0.0.1:5000/ruta_mensajes_enviados', {
    method: 'GET',
    credentials: 'include'
})
.then(response => {
    if (response.status === 200) {
        return response.json().then(data => {
            // Rellena la lista de mensajes enviados por el usuario
            mensajesUsuario.innerHTML = '';
            console.log(data)
            data.mensajes.forEach(mensaje => {
                const msj = document.createElement('li');
                msj.textContent = mensaje.contenido;
                msj.id=mensaje.id;
                mensajesUsuario.appendChild(msj);

                // Agregar evento de clic solo si aún no se ha agregado
                if (!msj.hasEventListeners) {
                    msj.addEventListener('dblclick', function(event) {
                        eliminarMensaje(msj.id);
                    });
                    servidorElement.hasEventListeners = true; // Marcar que se agregó el evento
                }
            });
        });
    } else {
        return response.json().then(data => {
            document.getElementById('message').innerHTML = data.msg;
        });
    }
})
.catch(error => {
    console.error('Error al cargar mensajes enviados', error);
    document.getElementById('message').innerHTML = 'An error occurred.';
});
});

function eliminarMensaje(mensaje_id){

}


