
// la URL a donde estoy accediendo
// http://localhost/PWA/04-cache-offline/index.html
const CACHE_STATIC_NAME = 'static-v3';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

/*
controlar el numero de archivos en cache
 */
function limpiarCache( cacheName, numeroItems){
    caches.open( cacheName )
        .then( cache=>{
          return  cache.keys()
               .then( keys=>{
                   if(keys.length > numeroItems){
                       cache.delete(keys[0]).then( limpiarCache( cacheName, numeroItems ));
                   }
                   console.log(keys);
               });
        });
}

self.addEventListener('install', e=>{
    const cacheProm = caches.open( CACHE_STATIC_NAME )
        .then(cache=>{
            //app shelll
                return cache.addAll([
                    '/PWA/04-cache-offline/',
                    'index.html',
                    'css/style.css',
                    'img/main.jpg',
                    'js/app.js'
                ]);
    });

    const cacheInmutable = caches.open( CACHE_INMUTABLE_NAME)
        .then( cache =>{
            return cache.add( 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'); //esto retorna una promesa
        });
    e.waitUntil(Promise.all([cacheProm, cacheInmutable]));


});
//app shell: lo que la app necesita a fuerza paara que funcione, es algo que se necesita que se caqgue rapidamente
//en el cache



/*
cache only: una vez que se realiza la instalacion de la paguiana web, jamas regresa a la web
 */

self.addEventListener('fetch', e=>{

    //1. catch only: esta es usada cuando queremos que toda la app es servida desde la cache
    //            es decir no haber peticion que acceda a la web


    //se va a todos los caches que esten en el dominio que coincida, ej si el servidor esta el index, busca en la cache el index
    // esta estrategia tiene ciertos problemas
    // si jamas actualizamos el sw, jamas se actualiza a la web
    // e.respondWith( caches.match( e.request ));

    //2. cache fallback then cache: intenta primero el cache y despues ve a la internet

    const respuesta = caches.match( e.request )
        .then( res=>{

            if( res ) return res;

            // NO existe el archivo
            // tengo que ir a la web
            console.log('no existe', e.request.url );

            return fetch( e.request ).then( newRes =>{
                    // vuelve a cargar un archivo al cache y lo actualiza (put)
                    caches.open(CACHE_DYNAMIC_NAME)
                        .then( cache=>{
                            cache.put( e.request, newRes );
                            limpiarCache(CACHE_DYNAMIC_NAME, 50 );
                        });
                    return newRes.clone();
                });
        });
    e.respondWith( respuesta );
})


