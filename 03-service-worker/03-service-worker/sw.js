
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
       }, 1000)
   })

    event.waitUntil(instalacion);
   // self.skipWaiting();
});


/*
    cuando el sw toma el control de la aplicacion
 */
self.addEventListener( 'activate', event=>{
    console.log('SW: activo y listo para controlar la app 2');
})
