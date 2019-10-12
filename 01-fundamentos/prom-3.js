function sumarLento(numero) {

   return new Promise ( ((resolve, reject) => {


        setTimeout( ()=>{
                resolve(numero +1);
                // reject("Sumar lento falló");
        }, 800)
    }))
}


let sumarRapido = (numero)=>{
    return new Promise( ((resolve, reject) => {
        setTimeout( ()=>{ resolve ( numero +1)}, 300)
    }))
}


// sumarLento(5).then( console.log );
// sumarRapido(10).then( console.log );

let cosas = [  sumarLento( 5), sumarRapido(10), true, 'hola mundo'];
Promise.all( cosas )
    .then( respuesta => console.log(respuesta))
    .catch( console.log);
