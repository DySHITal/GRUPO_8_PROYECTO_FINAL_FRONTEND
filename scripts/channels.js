const exChannel = document.getElementById('explore'),
    containerCanal = document.getElementById('container_canal'),
    parrafo = document.getElementById('empty'),
    addChannel = document.getElementById('add'),
    addServer = document.getElementsByClassName('canal'),
    overlay = document.getElementById('overlay'),
	popup = document.getElementById('popup'),
	btnCerrarPopup = document.getElementById('btn-cerrar-popup'),
    chatContainer = document.getElementById('chat-container'),
    salirServidor = document.getElementById('delete-server'),
    crearCanal = document.getElementById('crear_canal'),
    cerrarCanal = document.getElementById('cerrar'),
    canalPop = document.getElementById('ventana_canal'),
    canalForm = document.getElementById('crearCanal')
window.addEventListener('load', function(){
    getAlias();
    agregarServidorAlSidebar();
})



let visible = false;
let servidoresCargados = false;
let canalSeleccionado;
let servidorSeleccionado;

    exChannel.addEventListener('click', () => {
        if (!servidoresCargados) {
            cargarServidoresExplorar();
            servidoresCargados = true; // Marcamos que los servidores ya se cargaron
        }
        if(visible){
            parrafo.style.display = 'block'
            containerCanal.style.display = 'none';
        } else{
            containerCanal.style.display = 'grid';
            parrafo.style.display = 'none'
            chatContainer.style.display = 'none'
        }
        visible = !visible
        canalPop.style.visibility = 'hidden'
    });

function getAlias() {
    fetch('http://127.0.0.1:5000/alias',{
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if(response.status === 200) {
            return response.json().then(data => {
                document.getElementById('alias').innerText = data.alias;
            });
        } else {
            return response.json().then(data => {
                document.getElementById('message').innerHTML = data.msg;
            });
        }
    })
    .catch(error => {
        document.getElementById('message').innerHTML = 'An error ocurred.';
    });
}

//Crear servidores
addChannel.addEventListener('click', function(){
	overlay.classList.add('active');
	popup.classList.add('active');
    canalPop.style.visibility = 'hidden'
});

btnCerrarPopup.addEventListener('click', function(e){
	e.preventDefault();
	overlay.classList.remove('active');
	popup.classList.remove('active');
});

const crearServer = document.getElementById('crearServer')
crearServer.addEventListener('submit', function(e){
    e.preventDefault()
    crearServidor()
})

//funcion crear servidores
function crearServidor() {
    const data = {
        server_name: document.getElementById("server_name").value,
        server_descripcion: document.getElementById("server_description").value,
    };
    fetch("http://127.0.0.1:5000/crear_server", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                window.location.href = "vistaprincipal.html";
            });
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.msg;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}


//Cargar servidores
function cargarServidoresExplorar() {
    fetch('http://127.0.0.1:5000/cargar_servidores', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                // Maneja los datos de los servidores
                const servidores = data.nombre_servidor;
                const containerServidor = document.getElementById('container_canal');
    
                servidores.forEach(servidor => {
                    const nombreServidor = servidor; // Nombre del servidor
                    const rutaImagen = `../src/assets/images/canales/${nombreServidor}.png`;
                    const servidorElement = document.createElement('div');
                    servidorElement.className = 'canal';
                    servidorElement.id = nombreServidor
                    const img = document.createElement('img');
                    img.src = rutaImagen;
                    img.style.width = '100px';
                    const h5 = document.createElement('h5');
                    h5.textContent = nombreServidor;
                    servidorElement.appendChild(img)
                    servidorElement.appendChild(h5);
                    // Agrega el servidor al DOM, por ejemplo, a un contenedor div con id="container_canal"
                    containerServidor.appendChild(servidorElement);
                    if (!servidorElement.hasEventListeners) {
                        servidorElement.addEventListener('click', function() {
                            agregarServidorAlDb(nombreServidor);
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
        document.getElementById('message').innerHTML = 'An error occurred.';
    });
}

function agregarServidorAlDb(nombre_servidor){
    fetch(`http://127.0.0.1:5000/registrar_db/${nombre_servidor}`, {
        method: 'POST',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                agregarServidorAlSidebar();
                location.reload();
            });
        } else {
            return response.json().then(data => {
                document.getElementById('message').innerHTML = data.msg;
            });
        }
    })
    .catch(error => {
        document.getElementById('message').innerHTML = 'An error ocurred.';
    })
}

//SE CARGAN SERVIDORES A SIDEBAR
function agregarServidorAlSidebar() {
    fetch('http://127.0.0.1:5000/servidores_del_usuario', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                // Maneja los datos de los servidores
                const servidores = data.nombre_servidor;
                const sideBar = document.getElementById('sideBar');
                if (servidores && servidores.length > 0) {
                    parrafo.style.display = 'none';}
                servidores.forEach(servidor => {
        
                // Crea un elemento de servidor en formato li
                const servidorElement = document.createElement("li");
                servidorElement.className = "tooltip servidor";
                servidorElement.id = servidor;

                // Crea la imagen del servidor
                const imagenServidor = document.createElement("img");
                imagenServidor.className = "icono hover";
                imagenServidor.src = `../src/assets/images/canales/${servidor}.png`; 

                // Crea el elemento del tooltip
                const tooltipElement = document.createElement("span");
                tooltipElement.className = "tooltiptext";
                tooltipElement.textContent = servidor; 

                // Agragamos al elemento de servidor
                servidorElement.appendChild(imagenServidor);
                servidorElement.appendChild(tooltipElement);
        
                sideBar.appendChild(servidorElement);
                
                // Agregar evento de clic solo si aún no se ha agregado
                if (!servidorElement.hasEventListeners) {
                    servidorElement.addEventListener('click', function(event) {
                        salirServidor.style.display = 'block'
                        crearCanal.style.visibility = 'visible'
                        servidorSeleccionado = servidor;
                        cargarCanales(servidorElement.id);
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
        document.getElementById('message').innerHTML = 'An error occurred.';
    });
}

function cargarCanales(li_id) {
    fetch(`http://127.0.0.1:5000/cargar_canales/${li_id}`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                const canales = data; 
                const contCanal = document.getElementById('canales');
                contCanal.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos canales
                canales.forEach(canal => {
                    const nombreCanal = canal[0]; 
                    const canalElement = document.createElement('div');
                    canalElement.className = 'msgs';
                    canalElement.id = nombreCanal;
                    canalElement.dataset.canalId = nombreCanal;
                    const h5 = document.createElement('h5');
                    h5.textContent = nombreCanal;
                    canalElement.appendChild(h5);
                    contCanal.appendChild(canalElement);

                    if (!canalElement.hasEventListeners) {
                        canalElement.addEventListener('click', function(event) {
                            parrafo.style.display = 'none';
                            containerCanal.style.display = 'none';
                            chatContainer.style.display = 'block';
                            canalSeleccionado = nombreCanal;
                            loadmsgs(nombreCanal);
                        });
                        canalElement.hasEventListeners = true; // Marcar que se agregó el evento
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
        document.getElementById('message').innerHTML = 'An error occurred.';
    });
}

salirServidor.addEventListener('click', function() {
    deleteServerUser(servidorSeleccionado);
})

function deleteServerUser(servidorSeleccionado) {
    fetch(`http://127.0.0.1:5000/eliminar_server/${servidorSeleccionado}`, {
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


crearCanal.addEventListener('click', function() {
    canalPop.style.visibility = 'visible'
})

cerrarCanal.addEventListener('click', function() {
    canalPop.style.visibility = 'hidden'
})

canalForm.addEventListener('submit', function(e) {
    e.preventDefault()
    createChannel(servidorSeleccionado);
})

function createChannel(servidorSeleccionado) {
    const data = {
        nombre_canal: document.getElementById('nombre_canal').value
    };
    fetch(`http://127.0.0.1:5000/crear_canal/${servidorSeleccionado}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                window.location.href = 'vistaprincipal.html';
            });
        } else {
            return response.json().then(data => {
                document.getElementById('message').innerHTML = data.msg;
            });
        }
    })
    .catch(error => {
        document.getElementById('message').innerHTML = 'An error occurred.';
    })
}