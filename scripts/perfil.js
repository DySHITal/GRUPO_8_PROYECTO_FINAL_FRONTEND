const infoUsuario = document.querySelector('.infousuario')
      servidoresCreados = document.querySelector('.servidoresCreados'),
      


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

    const inputAvatar = document.getElementById('inputAvatar');

    inputAvatar.addEventListener('change', function(event) {
        upload_img(event);
    });

    function upload_img(event) {
        const input = event.target;

        if (input.files.length === 0) {
            // No se seleccionó ningún archivo
            return;
        }

        const formData = new FormData();
        formData.append('avatar', input.files[0]);

        fetch('http://127.0.0.1:5000/upload_img', {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
        .then(response => {
            if (response.status === 200) {
                return response.json().then(data => {
                    show_img();
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

    function show_img() {
        fetch('http://127.0.0.1:5000/show_img', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            if (response.status === 200) {
                return response.json().then(data => {
                    const avatar = document.getElementById('avatar');
                    const img = document.createElement('img');
                    const ruta = data.avatar;
                    console.log(ruta)
                    img.src = ruta;
                    img.style.width = '100px';
                    avatar.appendChild(img);
                })
            } else {
               return response.json().then(data => {
                document.getElementById('message').innerHTML = data.msg;
               });
            }
        })
        .catch(error => {
            document.getElementById('message').innerHTML = 'An error occurred.'
        });

    }
})
    // Cargar servidores creados por el usuario

// const servidoresCreados = document.querySelector('.servidoresCreados'); // Asegúrate de que esta referencia sea correcta

// fetch('http://127.0.0.1:5000/ruta_servidores_creados', {
//     method: 'GET',
//     credentials: 'include'
// })
// .then(response => {
//     if (response.status === 200) {
//         return response.json().then(data => {
//             // Rellena la lista de servidores creados por el usuario
//             console.log(data);
//             servidoresCreados.innerHTML = '';
//             data.servidores.forEach(servidor => {
//                 const li_serv = document.createElement('li');
//                 li_serv.textContent = servidor.nombre_servidor;
//                 li_serv.id = servidor.id;
//                 servidoresCreados.appendChild(li_serv);

//                 // Agregar evento de doble clic solo si aún no se ha agregado
//                 if (!li_serv.hasEventListeners) {
//                     li_serv.addEventListener('dblclick', function(event) {
//                         // Llama a la función para editar o eliminar el servidor aquí
//                         editarEliminarServidor(li_serv.id);
//                     });
//                     li_serv.hasEventListeners = true; // Marcar que se agregó el evento
//                 }
//             });
//         });
//     } else {
//         return response.json().then(data => {
//             document.getElementById('message').innerHTML = data.msg;
//         });
//     }
// })
// .catch(error => {
//     console.error('Error al cargar servidores creados', error);
//     document.getElementById('message').innerHTML = 'An error occurred.';
// });

// // Carga los mensajes enviados por el usuario
// const mensajesUsuario = document.querySelector('.mensajesUsuario');

// fetch('http://127.0.0.1:5000/ruta_mensajes_enviados', {
//     method: 'GET',
//     credentials: 'include'
// })
// .then(response => {
//     if (response.status === 200) {
//         return response.json().then(data => {
//             // Limpia la lista de mensajes
//             mensajesUsuario.innerHTML = '';
//             console.log(data);

//             data.mensajes.forEach(mensajeArray => {
//                 // Crea un elemento de lista para el mensaje
//                 const mensajeElement = document.createElement('li');

//                 // Configura el contenido del mensaje
//                 const mensajeContenido = document.createElement('p');
//                 mensajeContenido.textContent = mensajeArray[1]; // La posición 1 contiene el mensaje
//                 mensajeElement.appendChild(mensajeContenido);

//                 // Configura la fecha del mensaje
//                 const mensajeFecha = document.createElement('p');
//                 mensajeFecha.textContent = mensajeArray[2]; // La posición 2 contiene la fecha
//                 mensajeElement.appendChild(mensajeFecha);

//                 // Agrega el mensaje a la lista de mensajes
//                 mensajesUsuario.appendChild(mensajeElement);

//                 // Agregar evento de doble clic solo si aún no se ha agregado
//                 if (!mensajeElement.hasEventListeners) {
//                     mensajeElement.addEventListener('dblclick', function(event) {
//                         eliminarMensaje(mensajeArray[0]); // La posición 0 contiene el ID del mensaje
//                     });
//                     mensajeElement.hasEventListeners = true; // Marcar que se agregó el evento
//                 }
//             });
//         });
//     } else {
//         return response.json().then(data => {
//             document.getElementById('message').innerHTML = data.msg;
//         });
//     }
// })
// .catch(error => {
//     console.error('Error al cargar mensajes enviados', error);
//     document.getElementById('message').innerHTML = 'Ocurrió un error.';
// });

// });

// function eliminarMensaje(mensaje_id){
//   console.log(mensaje_id);
// }
// function editarEliminarServidor(serv_id){
//     console.log(serv_id);
// }