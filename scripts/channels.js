const exChannel = document.getElementById('explore');
const containerServidor = document.getElementById('container_servidor');
const parrafo = document.getElementById('empty')

let visible = false;

exChannel.addEventListener('click', () => {
    if(visible){
        parrafo.style.display = 'block'
        containerServidor.style.display = 'none';
    } else{
        containerServidor.style.display = 'grid';
        cargarServidores //se cargan los servidores a seleccionar
        parrafo.style.display = 'none'
    }
    visible = !visible
})



function cargarServidores() {
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

