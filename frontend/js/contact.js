
async function enviarMailContacto(event){
    
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

const form = document.getElementById('form');
const nombreCompleto = document.getElementById('nombre');
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');

form.addEventListener('submit', e => {
	e.preventDefault();	
	
    var isError = checkInputs();

    if(!isError) enviarMailContacto(e);    
});

function checkInputs() {
	// trim to remove the whitespaces
    var error = false;
	const nameValue = nombreCompleto.value.trim();
	const emailValue = email.value.trim();
	const asuntoValue = asunto.value.trim();
	const messageValue = mensaje.value.trim();
	
	if(nameValue === '') {
		setErrorFor(nombreCompleto, 'El nombre no puede estar en blanco');
        error = true
	} else {
		setSuccessFor(nombreCompleto);
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'El email no puede estar en blanco');
        error = true
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Email no válido');
        error = true
	} else {
		setSuccessFor(email);
	}
	
	if(asuntoValue === '') {
		setErrorFor(asunto, 'Tiene que tener un asunto');
        error = true
	} else {
		setSuccessFor(asunto);
	}
	
	if(messageValue === '') {
		setErrorFor(mensaje, 'Tienes que escribir un mensaje');
        error = true
	} else {
		setSuccessFor(mensaje);
	}
    return error
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control-input error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control-input success';
}


	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}