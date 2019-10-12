/*
peticion get

 */
// https://reqres.in/api/users

fetch('https://reqres.in/api/users')
    .then(  res=>res.json())
    .then(resObj => {
        console.log(resObj.page)
        console.log(resObj.per_page)
    })
