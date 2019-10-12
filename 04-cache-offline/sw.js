
// la URL a donde estoy accediendo
// http://localhost/PWA/04-cache-offline/index.html

self.addEventListener('install', e=>{
    const cacheProm = caches.open( 'cache-1' )
        .then(cache=>{
                return cache.addAll([
                    '/PWA/04-cache-offline/',
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



/*
cache only: una vez que se realiza la instalacion de la paguiana web, jamas regresa a la web
 */

self.addEventListener('fetch', e=>{

    //catch only: esta es usada cuando queremos que toda la app es servida desde la cache
    //            es decir no haber peticion que acceda a la web


    //se va a todos los caches que esten en el dominio que coincida, ej si el servidor esta el index, busca en la cache el index
    // esta estrategia tiene ciertos problemas
    // si jamas actualizamos el sw, jamas se actualiza a la web
    e.respondWith( caches.match( e.request ));
})
