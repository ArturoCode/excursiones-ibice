async function registrarse(event){
    event.preventDefault()
    
    const body = {
       nombre_usuario: event.target.nombre_usuario.value,
       email: event.target.email.value, 
       password: event.target.password.value,        
    }

    var url = `${config.urlBackend}/register`;

    const res = await fetch(url,{method:"post", body:JSON.stringify(body), headers:{"Content-Type":"application/json"}}) 

    if(res.status === 200) window.location.href = "http://localhost:2000/user/login.html"

    return false

}