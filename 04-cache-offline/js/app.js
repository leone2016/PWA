

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('sw.js');
}
// if( window.caches ){
//     // si trabaja con sw trabaja con caches
//     caches.open('prueba-1');
//     caches.open('prueba-2');
//     //valida si exite la cache prueba-3
//     caches.has( 'prueba-3').then( console.log );
//
//     // caches.delete('prueba-1').then( console.log);
//     /// para que sirve el cache
//
//     caches.open( 'caches-v1.1').then(cache=>{
//         // cache.add('index.html');
//         cache.addAll([ 'index.html', 'css/style.css', 'img/main.jpg']).then( ()=>{
//             // cache.delete('css/style.css');
//
//             //remplazar el index por otra cosa UPDATE
//             cache.put('index.html', new Response('Hola mundo'));
//         });
//
//         // cache.match('index.html').then(res=>{
//         //     res.text().then( console.log );
//         // });
//     });
//     caches.keys().then(res=> console.log(res));
//     caches.keys().then(console.log);
// };


