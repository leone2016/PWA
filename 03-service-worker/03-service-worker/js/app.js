

// Detectar si podemos usar Service Workers
if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('sw.js');
}

fetch('https://reqres.in/api/users')
    .then( res => res.text())
    .then( console.log );
