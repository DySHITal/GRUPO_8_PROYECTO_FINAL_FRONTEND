const exChannel = document.getElementById('explore'),
    containerCanal = document.getElementById('container_canal'),
    parrafo = document.getElementById('empty'),
    addChannel = document.getElementById('add'),
    addServer = document.getElementsByClassName('canal'),
    overlay = document.getElementById('overlay'),
	popup = document.getElementById('popup'),
	btnCerrarPopup = document.getElementById('btn-cerrar-popup')
window.addEventListener('load', function(){
    getAlias();
    agregarServidorAlSidebar();
})



let visible = false;
let servidoresCargados = false;

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
        }
        visible = !visible
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
                        // let li_id = event.target.id;
                        console.log(servidorElement.id);
                        cargarCanales(servidorElement.id);
                    });
                    servidorElement.hasEventListeners = true; // Marcar que se agregó el evento
                }
                });

                // // Agregar evento de clic fuera del bucle forEach
                // sideBar.addEventListener('click', function(event) {
                //     if (event.target.classList.contains('servidor')) {
                //         console.log("click");
                //         let li_id = event.target.id;
                //         console.log(li_id);
                //         cargarCanales(li_id);
                //     }
                // });
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
// // Abrir servidor - cargar canales
//     const servidores = document.getElementById('sideBar');
//     servidores.addEventListener('click', function(event) {
//         if (event.target.classList.contains('tooltip')) {
//             console.log("click");
//             let li_id = event.target.id;
//             console.log(li_id);
//             cargarCanales(li_id);
//         }
//     });


function cargarCanales(li_id) {
    fetch(`http://127.0.0.1:5000/cargar_canales/${li_id}`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                const canales = data; // La respuesta ya contiene los nombres de los canales
                const containerCanal = document.getElementById('canales');
                containerCanal.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos canales
                canales.forEach(canal => {
                    const nombreCanal = canal[0]; // Obtener el nombre del canal de la tupla
                    const canalElement = document.createElement('div');
                    canalElement.className = 'msgs';
                    canalElement.id = nombreCanal; // Puedes usar el nombre como ID si es único
                    const h5 = document.createElement('h5');
                    h5.textContent = nombreCanal;
                    canalElement.appendChild(h5);
                    containerCanal.appendChild(canalElement);
                });
            });
        } else {
            // Manejar el caso cuando la respuesta no es 200 (puede ser un error)
            return response.json().then(data => {
                document.getElementById('message').innerHTML = data.msg;
            });
        }
    })
    .catch(error => {
        console.error(error);
        document.getElementById('message').innerHTML = 'An error occurred.';
    });
}
