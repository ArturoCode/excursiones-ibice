async function iniciarSesion(event) {

  const body = {
    email: event.target.email.value,
    password: event.target.password.value,
  };

  var url = `${config.urlBackend}/login`;

  const res = await fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  if (res.status === 200) {
    await getSession();
    window.location.href = "https://proyecto-final-production-36eb.up.railway.app/index.html";
  }

  return false;
}

async function getSession() {
  var url = `${config.urlBackend}/sesion`;

  await fetch(url)
    .catch((err) => console.log(err)) 
    .then((res) => res.json())
    .then((data) => {    
      localStorage.setItem("user", JSON.stringify(data.user));
    });
}

const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', e => {
	e.preventDefault();	
	
    var isError = checkInputs();

    if(!isError) iniciarSesion(e);    
});

function checkInputs() {
	// trim para borrar los espacios en blanco que pueda haber
    var error = false;	
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();		
	
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
