
// Ciclo de vida del SW

self.addEventListener('install', event=>{
    // descargar assets
    // creamos cache

   console.log("SW: I N S T A L A N D O ");

   const instalacion = new Promise( (resolve, reject) => {

       setTimeout( ()=>{
           console.log('Sw: Instalaciones terminadas');
           self.skipWaiting();
           resolve();
       }, 1);
   })

    event.waitUntil(instalacion);
   // self.skipWaiting();
});


/*
    cuando el sw toma el control de la aplicacion
 */
self.addEventListener( 'activate', event=>{
    console.log('SW: activo y listo para controlar la app 2 ' );
})


/* 49
    fetch: Manejo de peticiones http
 */
self.addEventListener( 'fetch', event=>{
    //aplicar las estrategias del cache
    // se puede validar si el usuario necesita o no
    console.log('SW:', event.request.url);
    if ( event.request.url.includes('https://reqres.in')){
        const res = new Response(`{ok: false, mensaje: 'Hola mundo'}`); // esto es sumamente util cuando se trabaja sin conexion
        event.respondWith( res );
    }
})



