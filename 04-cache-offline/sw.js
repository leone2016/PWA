
// la URL a donde estoy accediendo
// http://localhost/PWA/04-cache-offline/index.html
const CACHE_STATIC_NAME = 'static-v3';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';
const CACHE_DYNAMIC_LIMIT = 50;
const CACHE_PATH_NAME = '/PWA/04-cache-offline/';

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
                    'js/app.js',
                    'img/no-img.jpg'
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

    /*const respuesta = caches.match( e.request )
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
                            limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT );
                        });
                    return newRes.clone();
                });
        });
    e.respondWith( respuesta );*/

    //3. Estrategia: Network with cache fallback: que primero va internet y obtenga el registro y si lo obtiene MUESTRALO
    // caso contrario ve a cache

    //primero ve a internet
    //esta peticion puede F A L L A R
  /*  const respuesta = fetch( e.request ).then( res => {
        if ( !res ) return caches.match( e.request );  //como esta estrategia siempre va a internet, hacemos que priemro vaya a cache
        caches.open( CACHE_DYNAMIC_NAME )
            .then( cache =>{
                cache.put( e.request, res );
                limpiarCache( CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
            });
        return res.clone(); //aprovecho que ya lo obtuve, guardo en cache (arriba)  ↑
    }).catch( err =>{
        //si N O existe conexion a internet, solo queda revisar en cache
        return caches.match( e.request ); // si existe un match con la peticion que se esta pidiendo RETORNA
    });
    e.respondWith(respuesta);*/


  // 4. Cache with network update
    //cuando el rendimiento es critico, cuando necesitamos que la aplicacion aparezca lo mas rapido posible, como nativa
    // las actualizaciones siempre estaran una version atras de la del navegador web

    //suponemos que el rendimiento es critico, la app trabaja solo con lo que tenga en cache

    /*if( e.request.url.includes('bootstrap')){
       return e.respondWith( caches.match( e.request ));
    }
    const respuesta = caches.open( CACHE_STATIC_NAME).then( cache=>{ // busca y abre la cache con el nombre CACHE_STATIC_NAME = static-v3
        //va al internet y obtenga el nuevo recurso o respuesta
        fetch( e.request ).then( newRes =>{ // a su vez cuando retorna, hacemos un fetch de lo que se encuentra en el hosting, eso se almacena en la cache = CACHE_STATIC_NAME
            //actuliza el cache
            cache.put( e.request, newRes );
        }); //un fetch se hace despues del return
        return cache.match( e.request ); // cuando lo abras, retorna con la peticion que pide la persona
    });

    e.respondWith(respuesta);*/

    // 5. CACHE & NETWORKS R A C E: es una competencia para ver cual responde mas rapida

    const respuesta =  new Promise( ((resolve, reject) => {
        //bandera para saber cual de las dos fue rechazada

        let rechazada = false;

        const falloUnaVez = ()=>{
            if(rechazada){
                //cuando entra aqui es porque ni en internet ni en cache pudieron responder
                if( /\.(png|jpg)$/i.test( e.request.url )){ // cuando venga una image y no importa key sensitive
                    //si entra quiere decir que es uan imagen que tengo que retornar
                    resolve( caches.match( CACHE_PATH_NAME+'img/no-img.jpg') );
                }else{
                    //aqui se puede mostrar como pagina web no se encontró
                    reject('No se encontro respuesta');
                }
            }else{
                rechazada = true;
            }
        }
        fetch( e.request ).then( res => {
             res.ok ? resolve(res): falloUnaVez(); //si el registro no se encontro llama a la funcion
        }).catch( falloUnaVez); //cuando no tenemos internet, ojo sin parentesis

        caches.match( e.request).then( res=>{
            res ? resolve( res ): falloUnaVez();
        }).catch( falloUnaVez );
    }));
    e.respondWith(respuesta);

})

