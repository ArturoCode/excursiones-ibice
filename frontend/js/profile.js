//PROYECTO
var opciones = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

window.addEventListener("load", () => {
  removeFormExcursion();
  getUsuarioLoggeado();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.rol === "admin") {
    document.getElementById("viajes-realizados").remove();
    document.getElementById("lista-deseos").remove();
    document.getElementById("promociones").remove();
    //BORRAR EL FOOTER DE LOS USUARIOS PARA TENER EL DE PERFIL ADMIN
    //document.getElementById("footer-usuario").remove();
    getExcursiones();
    document
      .getElementById("update-excursion")
      .addEventListener("submit", (event) => {
        event.preventDefault();

        updateExcursion(event);
      });
      document
      .getElementById("add-excursion")
      .addEventListener("submit", (event) => {
        event.preventDefault();

        addExcursion(event);
      });
    document
      .getElementById("eliminar-excursion")
      .addEventListener("click", () => {
        eliminarExcursion();
      });
  } else {
    document.getElementById("admin").remove();
    getExcursionesHechas();
    getExcursionesGuardadas();
  }

  document.getElementById("editar-usuario").addEventListener("click", () => {
    mostrarUpdate();
  });
  document.getElementById("boton-cancelar").addEventListener("click", () => {
    cancelarUpdate();
  });
  document.getElementById("boton-cambiar").addEventListener("click", () => {
    const error = checkInputs();
    if (!error) {
      updateUsario();
    }
  });
});

function eliminarExcursion() {
  var select = document.getElementById("select-excursiones");
  if (select.value !== "-1") {
    var url = `${config.urlBackend}/excursiones?id_excursion=${currentExcursion.id_excursion}`;
    fetch(url, { method: "delete" }).then((res) => {});
  }
  document.getElementById("mensaje-delete").innerHTML="Se ha eliminado la excursión"
}

function updateExcursion(event) {
  var url = `${config.urlBackend}/excursiones`;
  var body = {
    id_excursion: currentExcursion.id_excursion,
    nombre_excursion: event.currentTarget.nombre_excursion.value,
    url_imagen_principal: event.currentTarget.url_imagen_principal.value,
    fecha_inicio: event.currentTarget.fecha_inicio.value,
    fecha_fin: event.currentTarget.fecha_fin.value,
    nivel: event.currentTarget.nivel.value,
    transporte: event.currentTarget.transporte.value,
    destino: event.currentTarget.destino.value,
    hora_salida: event.currentTarget.hora_salida.value,
    hora_regreso: event.currentTarget.hora_regreso.value,
    lugar_salida: event.currentTarget.lugar_salida.value,
    precio: event.currentTarget.precio.value,
    descripcion: event.currentTarget.descripcion.value,
    material: event.currentTarget.material.value,
    tiempo_atmosferico: event.currentTarget.tiempo_atmosferico.value,
    detalles: event.currentTarget.detalles.value,
    url_imagen: event.currentTarget.url_imagen.value,
  };

  fetch(url, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => {});

  document.getElementById("mensaje-update").innerHTML="Se ha actualizado la excursión"
}

function addExcursion(event) {
  var url = `${config.urlBackend}/excursiones`;
  var body = {
    id_excursion: currentExcursion.id_excursion,
    nombre_excursion: event.currentTarget.nombre_excursion.value,
    url_imagen_principal: event.currentTarget.url_imagen_principal.value,
    fecha_inicio: event.currentTarget.fecha_inicio.value,
    fecha_fin: event.currentTarget.fecha_fin.value,
    nivel: event.currentTarget.nivel.value,
    transporte: event.currentTarget.transporte.value,
    destino: event.currentTarget.destino.value,
    hora_salida: event.currentTarget.hora_salida.value,
    hora_regreso: event.currentTarget.hora_regreso.value,
    lugar_salida: event.currentTarget.lugar_salida.value,
    precio: event.currentTarget.precio.value,
    descripcion: event.currentTarget.descripcion.value,
    material: event.currentTarget.material.value,
    tiempo_atmosferico: event.currentTarget.tiempo_atmosferico.value,
    detalles: event.currentTarget.detalles.value,
    url_imagen: event.currentTarget.url_imagen.value,
  };

  fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => {});

  document.getElementById("mensaje-add").innerHTML="Se ha añadido la excursión"
}

var excursionesMap = {};
var currentExcursion;
function getExcursiones() {
  var url = `${config.urlBackend}/excursiones`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      var select = document.getElementById("select-excursiones");
      select.selectedIndex = 0;

      const optionDefault = document.createElement("option");
      optionDefault.value = "-1";
      optionDefault.innerHTML = "Selecciona una excursión";
      select.appendChild(optionDefault);

      for (var excursion of data) {
        excursionesMap[excursion.id_excursion] = excursion;
        const option = document.createElement("option");
        option.value = excursion.id_excursion;
        option.innerHTML = `${excursion.id_excursion} - ${excursion.nombre_excursion}`;
        select.appendChild(option);
      }

      select.addEventListener("change", () => {
        if (select.value !== "-1") {
          currentExcursion = excursionesMap[select.value];
          updateFormExcursion(currentExcursion);
        } else {
          currentExcursion = {};
          removeFormExcursion();
        }
      });
    });
}

function removeFormExcursion() {
  var formExcursion = document.getElementById("update-excursion");

  formExcursion.querySelector("#url_imagen_principal").value = "";
  formExcursion.querySelector("#nombre_excursion").value = "";
  formExcursion.querySelector("#fecha_inicio").value = "";
  formExcursion.querySelector("#fecha_fin").value = "";
  formExcursion.querySelector("#nivel").value = "";
  formExcursion.querySelector("#transporte").value = "";
  formExcursion.querySelector("#destino").value = "";
  formExcursion.querySelector("#hora_salida").value = "";
  formExcursion.querySelector("#hora_regreso").value = "";
  formExcursion.querySelector("#lugar_salida").value = "";
  formExcursion.querySelector("#precio").value = "";
  formExcursion.querySelector("#descripcion").value = "";
  formExcursion.querySelector("#material").value = "";
  formExcursion.querySelector("#tiempo_atmosferico").value = "";
  formExcursion.querySelector("#detalles").value = "";
  formExcursion.querySelector("#url_imagen").value = "";
  
  var formAñadir = document.getElementById("add-excursion");

  formAñadir.querySelector("#url_imagen_principal").value = "";
  formAñadir.querySelector("#nombre_excursion").value = "";
  formAñadir.querySelector("#fecha_inicio").value = "";
  formAñadir.querySelector("#fecha_fin").value = "";
  formAñadir.querySelector("#nivel").value = "";
  formAñadir.querySelector("#transporte").value = "";
  formAñadir.querySelector("#destino").value = "";
  formAñadir.querySelector("#hora_salida").value = "";
  formAñadir.querySelector("#hora_regreso").value = "";
  formAñadir.querySelector("#lugar_salida").value = "";
  formAñadir.querySelector("#precio").value = "";
  formAñadir.querySelector("#descripcion").value = "";
  formAñadir.querySelector("#material").value = "";
  formAñadir.querySelector("#tiempo_atmosferico").value = "";
  formAñadir.querySelector("#detalles").value = "";
  formAñadir.querySelector("#url_imagen").value = "";

}

function updateFormExcursion(excursion) {
  var formExcursion = document.getElementById("update-excursion");

  formExcursion.querySelector("#url_imagen_principal").value =
    excursion.url_imagen_principal;
  formExcursion.querySelector("#nombre_excursion").value =
    excursion.nombre_excursion;
  formExcursion.querySelector("#fecha_inicio").value = excursion.fecha_inicio;
  formExcursion.querySelector("#fecha_fin").value = excursion.fecha_fin;
  formExcursion.querySelector("#nivel").value = excursion.nivel;
  formExcursion.querySelector("#transporte").value = excursion.transporte;
  formExcursion.querySelector("#destino").value = excursion.destino;
  formExcursion.querySelector("#hora_salida").value = excursion.hora_salida;
  formExcursion.querySelector("#hora_regreso").value = excursion.hora_regreso;
  formExcursion.querySelector("#lugar_salida").value = excursion.lugar_salida;
  formExcursion.querySelector("#precio").value = excursion.precio;
  formExcursion.querySelector("#descripcion").value = excursion.descripcion;
  formExcursion.querySelector("#material").value = excursion.material;
  formExcursion.querySelector("#tiempo_atmosferico").value =
    excursion.tiempo_atmosferico;
  formExcursion.querySelector("#detalles").value = excursion.detalles;
  formExcursion.querySelector("#url_imagen").value = excursion.url_imagen;
}

function mostrarUpdate() {
  const elements = document.querySelectorAll("#info > .form-control-input");
  for (const element of elements) {
    element.classList.remove("no-display");
  }
  document.getElementById("boton-cambiar").classList.remove("no-display");
  document.getElementById("boton-cancelar").classList.remove("no-display");
  document.getElementById("nombre-usuario").classList.add("no-display");
  document.getElementById("email").classList.add("no-display");
  document.getElementById("editar-usuario").classList.add("no-display");
}
function cancelarUpdate() {
  const elements = document.querySelectorAll("#info > .form-control-input");
  for (const element of elements) {
    element.classList.add("no-display");
  }
  document.getElementById("boton-cambiar").classList.add("no-display");
  document.getElementById("boton-cancelar").classList.add("no-display");
  document.getElementById("nombre-usuario").classList.remove("no-display");
  document.getElementById("email").classList.remove("no-display");
  document.getElementById("editar-usuario").classList.remove("no-display");
}
function updateUsario() {
  const body = {
    nombre_usuario: document.getElementById("username").value,
    email: document.getElementById("email-input").value,
  };
  var url = `${config.urlBackend}/usuario`;

  fetch(url, {
    method: "put",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {});
}

function getUsuarioLoggeado() {
  var url = `${config.urlBackend}/current-user`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#nombre-usuario").innerHTML = data.nombre_usuario;
      document.querySelector("#email").innerHTML = data.email;
      document.querySelector("#membresia").innerHTML = data.membresia;
    });
}

function checkInputs() {
  // trim to remove the whitespaces
  var error = false;
  const username = document.getElementById("username");
  const email = document.getElementById("email-input");
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();

  if (usernameValue === "") {
    setErrorFor(username, "El usuario no puede estar en blanco");
    error = true;
  } else {
    setSuccessFor(username);
  }

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
function getExcursionesHechas() {
  var url = `${config.urlBackend}/usuario/excursiones-hechas`;

  const infoUsuarioExcursiones = fetch(
    `${config.urlBackend}/usuario/excursiones/info`
  );

  const infoExcursiones = fetch(url, { credentials: "include" });
  Promise.all([infoExcursiones, infoUsuarioExcursiones])
    .then((res) => Promise.all([res[0].json(), res[1].json()]))
    .then((res) => {
      var data = res[0];
      var infoUsuario = res[1];
      var excursionesHechas = document.getElementById("excursiones-hechas");
      var fichaDOM = excursionesHechas.querySelector("#ficha");
      //iterar por todas las excursiones y rellenar la plantilla con lla informacion de cada excursiom
      for (var excursion of data) {
        var fichaTemp = fichaDOM.cloneNode(true);
        var botonContainer = fichaTemp.querySelector("#button-container");
        if (localStorage.getItem("user")) {
          var botonHecha = fichaTemp.querySelector("#boton-hecha");
          var botonGuardar = fichaTemp.querySelector("#boton-guardar");
          botonHecha.id = "botonHecha_1_" + excursion.id_excursion;
          botonGuardar.id = "botonGuardar_1_" + excursion.id_excursion;

          if (infoUsuario.hechas.includes(excursion.id_excursion)) {
            botonHecha.onclick = eliminarExcursionHecha(
              excursion.id_excursion,
              botonHecha.id
            );
            botonHecha.style.backgroundColor = "#41ff33";
            console.log("a");
          } else {
            botonHecha.onclick = añadirExcursionHecha(
              excursion.id_excursion,
              botonHecha.id
            );
            botonHecha.style.backgroundColor = "inherit";
          }
          if (infoUsuario.guardadas.includes(excursion.id_excursion)) {
            botonGuardar.onclick = eliminarExcursionGuardada(
              excursion.id_excursion,
              botonGuardar.id
            );
            botonGuardar.style.backgroundColor = "#FF0000";
          } else {
            botonGuardar.onclick = añadirExcursionGuardada(
              excursion.id_excursion,
              botonGuardar.id
            );
            botonGuardar.style.backgroundColor = "inherit";
          }
        } else {
          botonContainer.remove();
        }
        fichaTemp.querySelector("#imagenf").src =
          excursion.url_imagen_principal;
        fichaTemp.querySelector(
          "#url-excursion"
        ).href = `./excursiones/detalles_excursion.html?id=${excursion.id_excursion}`;
        fichaTemp.querySelector("#nombre-excursion").innerHTML =
          excursion.nombre_excursion;
        fichaTemp.querySelector(
          "#nombre-excursion"
        ).href = `./excursiones/detalles_excursion.html?id=${excursion.id_excursion}`;
        fichaTemp.querySelector("#fecha").innerHTML = new Date(
          excursion.fecha_inicio
        ).toLocaleDateString("es-ES", opciones);
        fichaTemp.querySelector("#hora-salida").innerHTML =
          excursion.hora_salida;
        fichaTemp.querySelector("#hora-regreso").innerHTML =
          excursion.hora_regreso;
        fichaTemp.querySelector("#destino").innerHTML = excursion.destino;
        fichaTemp.querySelector("#precio").innerHTML = excursion.precio + " €";
        excursionesHechas.appendChild(fichaTemp);
      }
      //elimar plantilla
      fichaDOM.remove();
    });
}

function getExcursionesGuardadas() {
  const infoUsuarioExcursiones = fetch(
    `${config.urlBackend}/usuario/excursiones/info`
  );
  var url = `${config.urlBackend}/usuario/excursiones-guardadas`;
  const infoExcursiones = fetch(url, { credentials: "include" });
  Promise.all([infoExcursiones, infoUsuarioExcursiones])
    .then((res) => Promise.all([res[0].json(), res[1].json()]))
    .then((res) => {
      var data = res[0];
      var infoUsuario = res[1];
      var excursionesSeleccionadas = document.getElementById(
        "excursiones-guardadas"
      );
      var fichaDOM = excursionesSeleccionadas.querySelector("#ficha");
      //iterar por todas las excursiones y rellenar la plantilla con lla informacion de cada excursiom
      for (var excursion of data) {
        var fichaTemp = fichaDOM.cloneNode(true);
        var botonContainer = fichaTemp.querySelector("#button-container");
        if (localStorage.getItem("user")) {
          var botonHecha = fichaTemp.querySelector("#boton-hecha");
          var botonGuardar = fichaTemp.querySelector("#boton-guardar");
          botonHecha.id = "botonHecha_2_" + excursion.id_excursion;
          botonGuardar.id = "botonGuardar_2_" + excursion.id_excursion;

          if (infoUsuario.hechas.includes(excursion.id_excursion)) {
            botonHecha.onclick = eliminarExcursionHecha(
              excursion.id_excursion,
              botonHecha.id
            );
            botonHecha.style.backgroundColor = "#41ff33";
          } else {
            botonHecha.onclick = añadirExcursionHecha(
              excursion.id_excursion,
              botonHecha.id
            );
            botonHecha.style.backgroundColor = "inherit";
          }
          if (infoUsuario.guardadas.includes(excursion.id_excursion)) {
            botonGuardar.onclick = eliminarExcursionGuardada(
              excursion.id_excursion,
              botonGuardar.id
            );
            botonGuardar.style.backgroundColor = "#FF0000";
          } else {
            botonGuardar.onclick = añadirExcursionGuardada(
              excursion.id_excursion,
              botonGuardar.id
            );
            botonGuardar.style.backgroundColor = "inherit";
          }
        } else {
          botonContainer.remove();
        }
        fichaTemp.querySelector("#imagenf").src =
          excursion.url_imagen_principal;
        fichaTemp.querySelector(
          "#url-excursion"
        ).href = `./excursiones/detalles_excursion.html?id=${excursion.id_excursion}`;
        fichaTemp.querySelector("#nombre-excursion").innerHTML =
          excursion.nombre_excursion;
        fichaTemp.querySelector(
          "#nombre-excursion"
        ).href = `./excursiones/detalles_excursion.html?id=${excursion.id_excursion}`;
        fichaTemp.querySelector("#fecha").innerHTML = new Date(
          excursion.fecha_inicio
        ).toLocaleDateString("es-ES", opciones);
        fichaTemp.querySelector("#hora-salida").innerHTML =
          excursion.hora_salida;
        fichaTemp.querySelector("#hora-regreso").innerHTML =
          excursion.hora_regreso;
        fichaTemp.querySelector("#destino").innerHTML = excursion.destino;
        fichaTemp.querySelector("#precio").innerHTML = excursion.precio + " €";
        excursionesSeleccionadas.appendChild(fichaTemp);
      }
      //elimar plantilla
      fichaDOM.remove();
    });
}
function eliminarExcursionGuardada(id, idBoton) {
  return function () {
    var url = `${config.urlBackend}/usuario/excursiones-guardadas`;
    fetch(url, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id_excursion: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        var boton = document.getElementById(idBoton);
        boton.style.backgroundColor = "inherit";
        boton.onclick = añadirExcursionGuardada(id, boton.id);
      });
  };
}
function añadirExcursionGuardada(id, idBoton) {
  return function () {
    var url = `${config.urlBackend}/usuario/excursiones-guardadas`;
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id_excursion: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        var boton = document.getElementById(idBoton);
        boton.style.backgroundColor = "#41ff33";
        boton.onclick = eliminarExcursionGuardada(id, boton.id);
      });
  };
}
function añadirExcursionHecha(id, idBoton) {
  return function () {
    var url = `${config.urlBackend}/usuario/excursiones-hechas`;
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id_excursion: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        var boton = document.getElementById(idBoton);
        boton.style.backgroundColor = "#41ff33";
        boton.onclick = eliminarExcursionHecha(id, boton.id);
      });
  };
}
function eliminarExcursionHecha(id, idBoton) {
  return function () {
    var url = `${config.urlBackend}/usuario/excursiones-hechas`;
    fetch(url, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id_excursion: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        var boton = document.getElementById(idBoton);
        boton.style.backgroundColor = "inherit";
        boton.onclick = añadirExcursionHecha(id, boton.id);
      });
  };
}

