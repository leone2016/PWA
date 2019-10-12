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
        setTimeout( ()=>{
            // resolve ( numero +1)
            reject ( "error en sumar rapido")
        }, 300)
    }))
}


let cosas = [  sumarLento( 5), sumarRapido(10)];
Promise.race( cosas )
    .then( respuesta => console.log(respuesta))
    .catch( console.log);
