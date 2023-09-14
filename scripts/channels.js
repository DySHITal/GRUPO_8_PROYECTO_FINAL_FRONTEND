const exChannel = document.getElementById('explore');
const addChannel = document.getElementById('add');
const containerServidor = document.getElementById('container_servidor');
const parrafo = document.getElementById('empty')
var	overlay = document.getElementById('overlay'),
	popup = document.getElementById('popup'),
	btnCerrarPopup = document.getElementById('btn-cerrar-popup');
const sideBar = document.querySelector(".sidebar ul");
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
function cargarServidoresExplorar(servidor) {
    // fetch('/cargar_servidores')  //NOTA: DEBO OBTENER ID de canal o con nombre de servidor es suficinte?
    //                              //asi como tambien el nombre del servidor,  src de la imagen
    //     .then(response => response.json())
    //     .then(data => {
    //         // Maneja los datos de los servidores
            // const servidores = data.servidores;

            // servidores.forEach(servidor => {
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
            // });
        // })
        // .catch(error => {
        //     console.error('Error al cargar los servidores:', error);
        // });
}


//SE CARGAN SERVIDORES A SIDEBAR
function agregarServidorAlSidebar(servidor) {
    // Crea un elemento de servidor en formato HTML deseado
    const servidorElement = document.createElement("li");
    servidorElement.className = "tooltip";

    // Crea la imagen del servidor
    const imagenServidor = document.createElement("img");
    imagenServidor.className = "icono hover";
    imagenServidor.src = servidor.imagen; 

    // Crea el elemento del tooltip
    const tooltipElement = document.createElement("span");
    tooltipElement.className = "tooltiptext";
    tooltipElement.textContent = servidor.nombre; // Reemplaza con la descripción del servidor

    // Agragamos al elemento de servidor
    servidorElement.appendChild(imagenServidor);
    servidorElement.appendChild(tooltipElement);
    
    sideBar.appendChild(servidorElement);
}

//DATOS DE PRUEBA
// Datos ficticios de servidores (reemplaza esto con los datos reales de tu fetch)
const servidor1 = { nombre: "Servidor 1", imagen: "../src/assets/images/canales/consola.png" };
const servidor2 = { nombre: "Servidor 2", imagen: "../src/assets/images/canales/musica.png" };

// Agrega los servidores al DOM utilizando la función
agregarServidorAlSidebar(servidor1);
agregarServidorAlSidebar(servidor2);

cargarServidoresExplorar(servidor1);
cargarServidoresExplorar(servidor2);
