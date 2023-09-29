const infoUsuario = document.querySelector('.infousuario');
let userId;    
      
//CARGAMOS LA INFORMACION AL ACCEDER  A LA PAGINA
document.addEventListener('DOMContentLoaded', function () {
    
    cargarInfoUsuario()
    console.log(userId)
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
   
function cargarInfoUsuario(){
    let userId; 
    // Solicitud para obtener la información del usuario
    fetch('http://127.0.0.1:5000/ruta_info_usuario', {
    method: 'GET',
    credentials: 'include'
})
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                datausuario=data
                console.log(datausuario)
                const infoUsuarioHTML = `
                    <p><strong>Nombre:</strong> ${datausuario.nombre || 'N/A'}</p>
                    <p><strong>Apellido:</strong> ${datausuario.apellido || 'N/A'}</p>
                    <p><strong>Alias:</strong> ${datausuario.alias || 'N/A'}</p>
                    <p><strong>Correo:</strong> ${datausuario.correo || 'N/A'}</p>
                    <p><strong>Fecha Nacimiento:</strong> ${datausuario.fechas_nacimiento || 'N/A'}</p>
                `;
                userId = datausuario.id_usuario;
                console.log(userId)
                infoUsuario.innerHTML = infoUsuarioHTML;
                cargarServidoresperfil(userId)

                cargarMensajesPerfil(userId)

            });
        } else {
            throw new Error('Error al obtener la información del usuario');
            
        }
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario', error);
        document.getElementById('message').innerHTML = 'An error occurred.';
    });
   
};

function cargarServidoresperfil(userId){
    const servidoresCreados = document.querySelector('.servidoresCreados');
console.log(`http://127.0.0.1:5000/ruta_servidores_creados/${userId}`) //Aqui
fetch(`http://127.0.0.1:5000/ruta_servidores_creados/${userId}`, {
    method: 'GET',
    credentials: 'include'
})
.then(response => {
    if (response.status === 200) {
        return response.json().then(data => {
            // Verifica si data.nombre_servidor es un array y tiene elementos
            if (Array.isArray(data.nombre_servidor) && data.nombre_servidor.length > 0) {
                // Rellena la lista de servidores creados por el usuario
                servidoresCreados.innerHTML = '';
                data.nombre_servidor.forEach(servidor => {
                    const li_serv = document.createElement('li');
                    li_serv.textContent = servidor[0]; // Si el nombre está en la primera posición del sub-array
                    // li_serv.textContent = servidor; // Si el nombre está en el nivel superior del array
                    li_serv.id = servidor[1]; // Si el id está en la segunda posición del sub-array
                    servidoresCreados.appendChild(li_serv);
    
                    // Agregar evento de doble clic solo si aún no se ha agregado
                    if (!li_serv.hasEventListeners) {
                        li_serv.addEventListener('dblclick', function(event) {
                            // Llama a la función para editar o eliminar el servidor aquí
                            editarEliminarServidor(li_serv.id);
                        });
                        li_serv.hasEventListeners = true; // Marcar que se agregó el evento
                    }
                });
            } else {
                console.log('El array de servidores está vacío o contiene elementos no definidos.');
            }
        });
    } else {
        // Maneja otros códigos de estado aquí si es necesario
        return response.json().then(data => {
            document.getElementById('message').innerHTML = data.msg;
        });
    }
})
.catch(error => {
    console.error('Error al cargar servidores creados', error);

    document.getElementById('message').innerHTML = 'Ocurrió un error.';
});

};

function cargarMensajesPerfil(userId){
    const mensajesUsuario = document.querySelector('.mensajesUsuario');

fetch(`http://127.0.0.1:5000/ruta_mensajes_enviados/${userId}`, {
    method: 'GET',
    credentials: 'include'
})
.then(response => {
    if (response.status === 200) {
        return response.json(); // No llames a .json() aquí, solo devuelve la promesa
    } else {
        throw new Error('Error al cargar mensajes enviados');
    }
})
.then(data => {
            datosmensaje=data
            console.log(datosmensaje)
            // Verifica si data.mensajes es un array y tiene elementos
            if (Array.isArray(datosmensaje) && datosmensaje.length > 0) {
                // Limpia la lista de mensajes
                console.log(datosmensaje)
                mensajesUsuario.innerHTML = '';
                datosmensaje.forEach(mensajeArray => {
                    console.log(mensajeArray)
                    // Verifica si mensajeArray[1] está definido
                    if (mensajeArray[1] !== undefined) {
                        let mensaje = mensajeArray[1];
                        console.log(mensaje)
            
                        // Crea un elemento de lista para el mensaje
                        const mensajeElement = document.createElement('li');
            
                        // Configura el contenido del mensaje
                        const mensajeContenido = document.createElement('p');
                        mensajeContenido.textContent = mensaje; // La posición 1 contiene el mensaje
                        mensajeElement.appendChild(mensajeContenido);
            
                        // // Configura la fecha del mensaje
                        // const fecha = new Date(mensajeArray[2]);
                        // const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
                        // const fechaFormateada = fecha.toLocaleDateString(undefined, options);
                        // mensajeFecha.textContent = fechaFormateada; // La posición 2 contiene la fecha
                        // mensajeElement.appendChild(mensajeFecha);
            
                        // Agrega el mensaje a la lista de mensajes
                        mensajesUsuario.appendChild(mensajeElement);
            
                        // Agregar evento de doble clic solo si aún no se ha agregado
                        if (!mensajeElement.hasEventListeners) {
                            mensajeElement.addEventListener('dblclick', function(event) {
                                eliminarMensaje(mensajeArray[0]); // La posición 0 contiene el ID del mensaje
                            });
                            mensajeElement.hasEventListeners = true; // Marcar que se agregó el evento
                        }
                    }
                });
            
    }
})
.catch(error => {
    console.error('Error al cargar mensajes enviados', error);
    document.getElementById('message').innerHTML = 'Ocurrió un error.';
});
};


function eliminarMensaje(mensaje_id){
  console.log(mensaje_id);
  fetch(`http://127.0.0.1:5000/eliminar_mensajes_enviados/${mensaje_id}`,  {
    method: 'DELETE',
    credentials: 'include'
})
.then(response => {
    if (response.status === 200) {
        return response.json().then(data => {
            location.reload()
        })
    } else {
        return response.json().then(data => {
            document.getElementById('message').innerHTML = data.msg;
        })
    }
})
.catch(error => {
    document.getElementById('message').innerHTML = 'An error ocurred.';
})
}
function editarEliminarServidor(serv_id){
    console.log(serv_id);
    
};