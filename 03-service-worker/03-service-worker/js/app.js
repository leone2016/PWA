

// Detectar si podemos usar Service Workers
if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('sw.js')
        .then( reg => {
      // esto es solo por aprendizaje
      // se trata de engañar al navegador cuando no hay conexion a internet

      //     ;  setTimeout(()=>{
      //           reg.sync.register('posteo-gatos');
      //           console.log('se enviaron fotos de gatos al server');
      //       }, 6000);
            Notification.requestPermission().then( res =>{
                console.log(res);
                res.showNotification('Hola Mundo');
            });
    });


}
//
// fetch('https://reqres.in/api/users')
//     .then( res => res.text())
//     .then( console.log );
