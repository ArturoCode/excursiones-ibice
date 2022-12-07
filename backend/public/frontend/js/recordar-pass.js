var urlParams = new URLSearchParams(window.location.search);
var token = urlParams.get("token");
const containerPeticion = document.getElementById("contenido-peticion");
const containerReseteo = document.getElementById("contenido-reseteo");
var email;
//si hay token en la url se muestra el formulario para resetar la contraseña, y si no hay token se muestra el formulario para la peticion de envio de email para
//el reseteo de la contraseña
if (token) {
  containerPeticion.remove();
  const form = document.getElementById("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    var isError = checkInputsReset();

    if (!isError) resetContraseña(e.target.password.value);
  });
} else {
  containerReseteo.remove();
  const form = document.getElementById("form");
  email = document.getElementById("email");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    var isError = checkInputs();

    if (!isError) recordarContrasena(e);
  });
}

function resetContraseña(password) {
  const body = {
    token,
    password,
  };

  var url = `${config.urlBackend}/usuario/reset-password`;
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());

    document.getElementById("mensaje-ok-reset").style.display = "block";
}

async function recordarContrasena(event) {
  const body = {
    email: event.target.email.value,
  };

  var url = `${config.urlBackend}/usuario/reset-password`;

  const res = await fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  if (res.status === 200)
    document.getElementById("mensaje-ok").style.display = "block";

  return false;
}

function checkInputsReset() {
  true;
}

function checkInputs() {
  // trim para borrar los espacios en blanco
  var error = false;
  const emailValue = email.value.trim();

  if (emailValue === "") {
    setErrorFor(email, "El email no puede estar en blanco");
    error = true;
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Email no válido");
    error = true;
  } else {
    setSuccessFor(email);
  }
  return error;
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control-input error";
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control-input success";
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
