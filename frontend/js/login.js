async function iniciarSesion(event) {
  event.preventDefault();

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
    window.location.href = "http://localhost:2000/index.html";
  }

  return false;
}

function getSession() {
  var url = `${config.urlBackend}/sesion`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {    
      localStorage.setItem("user", JSON.stringify(data.user));
    });
}
