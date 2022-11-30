async function recordarContrasena(event){
    
    const body = {
		nombre_usuario: event.target.username.value,
		email: event.target.email.value, 
    }

    var url = `${config.urlBackend}/recordar-contrasena`;

    const res = await fetch(url,{method:"post", body:JSON.stringify(body), headers:{"Content-Type":"application/json"}}) 

    if(res.status === 200) document.getElementById("mensaje-ok").style.display = "block"

    return false

}

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');

form.addEventListener('submit', e => {
	e.preventDefault();	
	
    var isError = checkInputs();

    if(!isError) recordarContrasena(e);    
});

function checkInputs() {
	// trim to remove the whitespaces
    var error = false;
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	
	if(usernameValue === '') {
		setErrorFor(username, 'El usuario no puede estar en blanco');
        error = true
	} else {
		setSuccessFor(username);
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