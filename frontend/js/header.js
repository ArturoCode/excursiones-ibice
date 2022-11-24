window.addEventListener("load", () => {
  usuarioLoggeado();
});
function usuarioLoggeado() {
  var user = localStorage.getItem("user");

  if (user) {
    console.log(user);
    user = JSON.parse(user);
    document.getElementById("header-nombre-usuario").style.display = "block";
    document.getElementById("iniciar-sesion").style.display = "none";
    document.getElementById("registrarse").style.display = "none";
    document.getElementById("perfil").style.display = "block";
    document.getElementById("cerrar-sesion").style.display = "block";
    document.getElementById("header-nombre-usuario").innerHTML = user.nombre;
    document.getElementsByClassName("dropdown-divider").style.display= "none";
  }
}

function cerrarSesion() {
    
  var url = `${config.urlBackend}/desconectarse`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
        console.log("aa")
      localStorage.removeItem("user");
      window.location.href = `${config.url}/index.html`
    });

}
