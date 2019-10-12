function sumarUno(numero, callback ){

    setTimeout( function () {
       callback( numero + 1);

    }, 800)
}

sumarUno(6, function ( nuevoValor ) {

    sumarUno(nuevoValor, function (nuevovalor2) {
        sumarUno(nuevoValor, function (nuevovalor3) {
            console.log(nuevovalor3);
        } )
    } )
})
