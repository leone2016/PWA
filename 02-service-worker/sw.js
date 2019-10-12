self.addEventListener('fetch', event =>{
    // console.log(event);
    //==BLOQUEA UNA PETICION, EN ESTE CASO  style.css
    // if( event.request.url.includes('style.css')){
    //     event.respondWith( null);
    // }else{
    //     event.respondWith( fetch( event.request ));

    //==CAMBIAR COLOR DE LETRAS Y FONDO
    // if ( event.request.url.includes('style.css') ){
    //     let respuesta = new Response(`
    //             body{
    //                 background-color: red !important;
    //                 color: pink;
    //             }
    //     `, {
    //         headers:{
    //             'Content-Type': 'text/css'
    //         }
    //     });
    //
    //     event.respondWith(respuesta);
    // }

});
