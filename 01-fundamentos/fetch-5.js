

fetch('https://reqres.in/api/users/1')
    .then(  res=>{
        res.clone().json().then( console.log)
        res.json().then( console.log)
    })

                        
