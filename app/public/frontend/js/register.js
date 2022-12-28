async function registrarse(event){    
    
    const body = {
       nombre_usuario: event.target.username.value,
       email: event.target.email.value, 
       password: event.target.password.value,        
    }

    var url = `${config.urlBackend}/register`;

    const res = await fetch(url,{method:"post", body:JSON.stringify(body), headers:{"Content-Type":"application/json"}}) 

    if(res.status === 200) window.location.href = "http://localhost:2000/login/"

    return false

}

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
	e.preventDefault();	
	
    var isError = checkInputs();

    if(!isError) registrarse(e);    
});

function checkInputs() {
	// trim para borrar los espacios en blanco
    var error = false;
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
	
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
	
	if(passwordValue === '') {
		setErrorFor(password, 'La contraseña no puede estar vacía');
        error = true
	} else {
		setSuccessFor(password);
	}
	
	if(password2Value === '') {
		setErrorFor(password2, 'Tienes que confirmar la contraseña');
        error = true
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'La contraseña no coincide');
        error = true
	} else{
		setSuccessFor(password2);
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