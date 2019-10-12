


self.addEventListener('fetch', event=>{
    // const offline = new Response(`Bienvenido a mi pagina web
    // disculpa, pero para usarla, necesitas internet`);
  //   const offline = new Response(`
  // <h1> off line</h1>
  //   `, {
  //       headers:{ 'COntent-Type': 'text/html'}
  //   });
    const offline = fetch('pages/offline.html');
    const resp = fetch( event.request).catch(()=>  offline);
    event.respondWith( resp ); //regresa lo que se esta pidiendo, esto lo hace sw
});
