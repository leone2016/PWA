/*
peticion post
 */
// https://reqres.in/api/users


let usuario = {
    nombre: 'Leonardo',
    edad: 27
};


fetch('https://reqres.in/api', {
    method: 'POST', //PUT
    body: JSON.stringify(usuario), //data
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then( res=> res.json())
    .then( console.log)
    .catch( console.error)
