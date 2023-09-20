const exChannel = document.getElementById('explore');
const containerCanal = document.getElementById('container_canal');
const parrafo = document.getElementById('empty');
const addChannel = document.getElementById('add');
const addServer = document.getElementsByClassName('canal');
const overlay = document.getElementById('overlay'),
	popup = document.getElementById('popup'),
	btnCerrarPopup = document.getElementById('btn-cerrar-popup');
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


// //funcion crear servidores
// function crearServidor() {
//     const data = {
//         server_name: document.getElementById("server_name").value,
//         server_descripcion: document.getElementById("server_descripcion").value,
//     };

//     fetch("http://127.0.0.1:5000/crear_server", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//         credentials: 'include'
//     })
//     .then(response => {
//         if (response.status === 200) {
//             return response.json().then(data => {
//                 window.location.href = "vistaprincipal.html";
//             });
//         } else {
//             return response.json().then(data => {
//                 document.getElementById("message").innerHTML = data.msg;
//             });
//         }
//     })
//     .catch(error => {
//         document.getElementById("message").innerHTML = "An error occurred.";
//     });
// }

const crearServer = document.getElementById('crearServer')
crearServer.addEventListener('click', function(){
       crearServidor()
})

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

// addServer.addEventListener('click', () => {
//     cargarsidebar()
// })

// function cargarsidebar() {
//     fetch('http://127.0.0.1:5000/servidores_del_usuario', {
//         method: 'GET',
//         credentials: 'include'
//     }) //Recibo los servidores a los que esta registrado el cliente
//     .then(response => {
//         if (response.status === 200){
//             return response.json().then(data => {
//                 const servidores = data.servidores;
//                 const containerServidor = document.getElementById('user_servers');
//                 const serverId = data.id

//                 servidores.forEach(servidor => {
//                     const rutaImagen = `../src/assets/images/canales/${nombreServidor}.png`;
//                     const servidorElement = document.createElement('div');
//                     const imagenServidor = document.createElement('img');
//                     servidorElement.className = 'servidor';
//                     servidorElement.setAttribute('data-nombre-servidor', nombreServidor);
//                     imagenServidor.src = rutaImagen
//                     containerServidor.appendChild(servidorElement);
//                 });
//             });
//         } else {
//             return response.json().then(data => {
//                 document.getElementById('message').innerHTML = data.msg;
//             });
//         }
//     })
//     .catch(error => {
//         document.getElementById('message').innerHTML = 'An error occurred.';
//     });
// }
//SE CARGAN SERVIDORES A SIDEBAR
function agregarServidorAlSidebar(servidor) {
    fetch('http://127.0.0.1:5000/servidores_del_usuario', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                // Maneja los datos de los servidores
                const servidores = data;
    
             servidores.forEach(servidor => {
    
            // Crea un elemento de servidor en formato li
              const servidorElement = document.createElement("li");
              servidorElement.className = "tooltip";
              servidorElement.id = servidor.id;

            // Crea la imagen del servidor
              const imagenServidor = document.createElement("img");
              imagenServidor.className = "icono hover";
              imagenServidor.src = servidor.imagen; 

           // Crea el elemento del tooltip
              const tooltipElement = document.createElement("span");
              tooltipElement.className = "tooltiptext";
              tooltipElement.textContent = servidor.nombre; 

           // Agragamos al elemento de servidor
              servidorElement.appendChild(imagenServidor);
             servidorElement.appendChild(tooltipElement);
    
             sideBar.appendChild(servidorElement);
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
        }; 
    //FUNCION PARA MANIPULAR LOS CICKS EN LAS LISTAS
function manejarClicEnLista(event) {
    const elementoClicado = event.target;
    const id = elementoClicado.id
    
    return id
}

// const lista = document.getElementById("miLista");
// lista.addEventListener("click", manejarClicEnLista);

    //SE CARGAN LOS CANALES DE UN SERVIDOR AL HACER CLICK EN UN SERVIDOR sideBar
sideBar.addEventListener("click", manejarClicEnLista);
    //SE CARGAN LOS MENSAJES AL HACER CLICK EN UN CANAL
const msgs = document.querySelector(".msgs ul");