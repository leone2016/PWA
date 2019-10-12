function sumarUno(numero, callback ){
    var promesa = new Promise(  (resolve, reject)=> {
        console.log(numero);
        if( numero >=7){
            reject('el número es muy alto');
        }
        setTimeout( function () {
            resolve( numero + 1);

        }, 800)
    })


    return promesa;
}

// sumarUno(5).then( nuevoNumero => {
//     console.log(nuevoNumero);
//     return  sumarUno( nuevoNumero);
//
// })
//     .then( nuevoNumero => {
//     console.log(nuevoNumero)
//     return  sumarUno( nuevoNumero);
// })
//     .then( nuevoNumero => {
//         console.log(nuevoNumero)
//     });

sumarUno(5)
    .then( sumarUno)
    .then( sumarUno)
    .then( nuevoNumero => {
        console.log(nuevoNumero)
    }).catch(error => {
        console.error('Error en promesa');
        console.error(error);
});
