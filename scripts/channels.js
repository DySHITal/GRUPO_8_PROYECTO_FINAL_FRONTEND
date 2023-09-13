const exChannel = document.getElementById('explore');
const containerCanal = document.getElementById('container_canal');
const parrafo = document.getElementById('empty');
window.addEventListener('load', function(){
    getAlias();
})

let visible = false;

exChannel.addEventListener('click', () => {
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