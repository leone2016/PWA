


self.addEventListener('install', e=>{
    const cacheProm = caches.open( 'cache-1' )
        .then(cache=>{
                return cache.addAll([
                    'index.html',
                    'css/style.css',
                    'img/main.jpg',
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
                    'js/app.js'
                ]);
    });

    e.waitUntil(cacheProm);


});
//app shell: lo que la app necesita a fuerza paara que funcione, es algo que se necesita que se caqgue rapidamente
//en el cache
