document.getElementById('registro').addEventListener("submit", function(event){
    event.preventDefault();
    register();
});

function register(){
    const data = {
        correo: document.getElementById('email').value,
        alias: document.getElementById('alias').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        contrasena: document.getElementById('password').value,
        fechas_nacimiento: document.getElementById('date').value
    };

    fetch("http://127.0.0.1:5000/register", {
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
                window.location.href = 'index.html';
            });
        } else{
            return response.json().then(data => {
                document.getElementById('message').innerHTML = data.msg;
            });
        }
    })
    .catch(error => {
        document.getElementById('message').innerHTML = 'An error occurred.';
    });
}