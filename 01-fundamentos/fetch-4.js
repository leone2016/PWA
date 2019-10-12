//lectura imagen blob

let img = document.querySelector('img')
fetch( 'superman.png')
    .then( res => res.blob() )
    .then( imagen => {
        var imgPath = URL.createObjectURL( imagen );
        img.src = imgPath
        }
    )
