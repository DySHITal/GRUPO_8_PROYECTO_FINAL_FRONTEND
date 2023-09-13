document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    login();
});

function login() {
    const data = {
        correo: document.getElementById("email").value,
        contrasena: document.getElementById("password").value,
    };

    fetch("http://127.0.0.1:5000/login", {
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