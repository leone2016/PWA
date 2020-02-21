// const CACHE_NAME = 'cache-1';
const CACHE_STATIC_NAME  = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

const CACHE_DYNAMIC_LIMIT = 50;


function limpiarCache( cacheName, numeroItems ) {


    caches.open( cacheName )
        .then( cache => {

            return cache.keys()
                .then( keys => {

                    if ( keys.length > numeroItems ) {
                        cache.delete( keys[0] )
                            .then( limpiarCache(cacheName, numeroItems) );
                    }
                });


        });
}




self.addEventListener('install', e => {


    const cacheProm = caches.open( CACHE_STATIC_NAME )
        .then( cache => {

            return cache.addAll([
                '/PWA/05-navegacion-offline/',
                'index.html',
                'css/style.css',
                'img/main.jpg',
                'js/app.js',
                'img/no-img.jpg',
                'pages/offline.html'
            ]);


        });

    const cacheInmutable = caches.open( CACHE_INMUTABLE_NAME )
        .then( cache => cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'));


    e.waitUntil( Promise.all([cacheProm, cacheInmutable]) );

});

// se aplica la segunda estrategia

self.addEventListener('fetch', e=>{
    //2. cache fallback then cache: intenta primero el cache y despues ve a la internet

    const respuesta = caches.match( e.request )// busca lo que sea que se este solicitando en la cache Eg. Bootstrap, imagenes etc
        .then( res=>{

            if( res ) return res // si existe retorna y hasta ahi llega

            // NO existe el archivo
            // tengo que ir a la web
            //console.log('no existe', e.request.url );

            // en el caso de que no exista la busca en la web (FETCH)
            return fetch( e.request ).then( newRes =>{ // si lo encuentra tendriamos una nueva respuesta
                    // vuelve a cargar un archivo al cache y lo actualiza (put)
                    caches.open(CACHE_DYNAMIC_NAME) // y lo guarda en el Dinamic caches
                        .then( cache=>{
                            cache.put( e.request, newRes );
                            limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT );
                        });
                    return newRes.clone();
                });
        });
    e.respondWith( respuesta );
})
