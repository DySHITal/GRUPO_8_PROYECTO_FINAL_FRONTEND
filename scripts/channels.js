const exChannel = document.getElementById('explore');
const addChannel = document.getElementById('add');
const containerServidor = document.getElementById('container_servidor');
const parrafo = document.getElementById('empty')
var	overlay = document.getElementById('overlay'),
	popup = document.getElementById('popup'),
	btnCerrarPopup = document.getElementById('btn-cerrar-popup');

let visible = false;

exChannel.addEventListener('click', () => {
    if(visible){
        parrafo.style.display = 'block'
        containerServidor.style.display = 'none';
    } else{
        containerServidor.style.display = 'grid';
        cargarServidoresExplorar //se cargan los servidores a seleccionar
        parrafo.style.display = 'none'
    }
    visible = !visible
})

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

//Cargar servidores
function cargarServidoresExplorar() {
    fetch('/cargar_servidores')  //NOTA: DEBO OBTENER ID de canal o con nombre de servidor es suficinte?
                                 //asi como tambien el nombre del servidor,  src de la imagen
        .then(response => response.json())
        .then(data => {
            // Maneja los datos de los servidores
            const servidores = data.servidores;

            servidores.forEach(servidor => {
                const nombreServidor = servidor.nombre;
                const direccionImagen = servidor.imagen;
                const servidorElement = document.createElement('div');
                const imagenServidor = document.createElement('img');
                servidorElement.className = 'servidor';
                servidorElement.setAttribute('data-nombre-servidor', nombreServidor);
                servidorElement.textContent = nombreServidor;
                imagenServidor.src=direccionImagen;

                // Agrega el servidor al DOM, por ejemplo, a un contenedor div con id="server-list"
                containerServidor.appendChild(servidorElement);
            });
        })
        .catch(error => {
            console.error('Error al cargar los servidores:', error);
        });
}

function cargarsidebar() {
    fetch('/servidoresdelcliente') //Recibo los servidores a los que esta registrado el cliente
        .then(response => response.json())
        .then(data => {
                // Maneja los datos de los servidores
            const servidores = data.servidores;
            servidores.forEach(servidor => {
            const nombreServidor = servidor.nombre;
            const direccionImagen = servidor.imagen;
const servidorElement = document.createElement('div');
const imagenServidor = document.createElement('img');
servidorElement.className = 'servidor';
servidorElement.setAttribute('data-nombre-servidor', nombreServidor);
servidorElement.textContent = nombreServidor;
imagenServidor.src=direccionImagen;

// Agrega el servidor al DOM, por ejemplo, a un contenedor div con id="server-list"
containerServidor.appendChild(servidorElement);
});
})
}