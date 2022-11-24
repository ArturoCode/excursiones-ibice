
async function enviarMailContacto(event){
    event.preventDefault()
    
    const body = {
       nombre: event.target.nombre.value,
       email: event.target.email.value, 
       asunto: event.target.asunto.value, 
       mensaje: event.target.mensaje.value,  
    }

    var url = `${config.urlBackend}/contacto`;

    const res = await fetch(url,{method:"post", body:JSON.stringify(body), headers:{"Content-Type":"application/json"}}) 

    if(res.status === 200) document.getElementById("mensaje-ok").style.display = "block"

    return false

}