//PROYECTO
var opciones = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

function getExcursiones() {
  var url = `${config.urlBackend}/excursiones`;
  const infoUsuarioExcursiones = fetch(
    `${config.urlBackend}/usuario/excursiones/info`
  );
  

  const infoExcursiones = fetch(url);
  Promise.all([infoExcursiones, infoUsuarioExcursiones])
    .then((res) => Promise.all([res[0].json(), res[1].json()]))
    .then((res) => {
      var data = res[0];
      var infoUsuario = res[1];

      //coger solo los 6 primeras excursiones
      data = data.slice(0, 6);

      var popularesDOM = document.getElementById("populares");
      var otonoDOM = document.getElementById("excursion-otono");
      var fichaDOM = document.getElementById("ficha");
      //iterar por todas las excursiones y rellenar la plantilla con lla informacion de cada excursiom
      for (var excursion of data) {
        var fichaTemp = fichaDOM.cloneNode(true);
            //logica botones
            var botonContainer = fichaTemp.querySelector("#button-container")
            const user = JSON.parse(localStorage.getItem("user"));
            //if(localStorage.getItem("user") && (user.rol === "user")){

              if(localStorage.getItem("user") && (user.rol === "usuario")){
              
              var botonHecha = fichaTemp.querySelector("#boton-hecha")
              var botonGuardar = fichaTemp.querySelector("#boton-guardar")
              botonHecha.id = "botonHecha_"+excursion.id_excursion
              botonGuardar.id = "botonGuardar_"+excursion.id_excursion
            
              if (infoUsuario.hechas.includes(excursion.id_excursion)) {          
                botonHecha.onclick = eliminarExcursionHecha(excursion.id_excursion, botonHecha.id);          
                botonHecha.style.backgroundColor = "#41ff33"
              } else {          
                botonHecha.onclick = añadirExcursionHecha(excursion.id_excursion, botonHecha.id);       
                botonHecha.style.backgroundColor = "inherit"
              }       
              if (infoUsuario.guardadas.includes(excursion.id_excursion)) {          
                botonGuardar.onclick = eliminarExcursionGuardada(excursion.id_excursion, botonGuardar.id);        
                botonGuardar.style.backgroundColor = "#FF0000"
              } else {          
                botonGuardar.onclick = añadirExcursionGuardada(excursion.id_excursion, botonGuardar.id);        
                botonGuardar.style.backgroundColor = "inherit"
              }
            }else {              
              //if(JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")) === "admin")
              //document.getElementById("button-container").remove();
              botonContainer.remove()
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
        //si es una de las tres primeras la pones en popular, de la 3 a la 6 en otoño
        if (data.indexOf(excursion) < 3) popularesDOM.appendChild(fichaTemp);
        else otonoDOM.appendChild(fichaTemp);
      }
      //elimar plantilla
      fichaDOM.remove();
    });
}

function filtrarExcursiones() {
  const destino = document.getElementById("lugares").value;
  const mes = document.getElementById("meses").value;
  var url = `${config.url}/listado_excursiones.html?`;
  if (destino && destino.length > 0) {
    url += `&destino=${destino}`;
  }
  if (mes && mes.length > 0) {
    url += `&mes=${mes}`;
  }

  //Cambiar de URL
  window.location = url;
}

//funcion que se repite en todas las pags con excursiones para q se de mg o hechas
  function eliminarExcursionGuardada(id,idBoton) {
    return function()
    {var url = `${config.urlBackend}/usuario/excursiones-guardadas`;
    fetch(url, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id_excursion: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        var boton = document.getElementById(idBoton)     
        boton.style.backgroundColor = "inherit";
        boton.onclick =  añadirExcursionGuardada(id, boton.id);
          
        
      });}
  }
  function añadirExcursionGuardada(id, idBoton) {
    return function()
    {var url = `${config.urlBackend}/usuario/excursiones-guardadas`;
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id_excursion: id }),
    })
      .then((response) => response.json())
      .then((data) => {      
        var boton = document.getElementById(idBoton)      
        boton.style.backgroundColor = "#FF0000";
        boton.onclick = 
          eliminarExcursionGuardada(id, boton.id);
          
        
      });}
  }
  function añadirExcursionHecha(id, idBoton) {
    return function()
    {var url = `${config.urlBackend}/usuario/excursiones-hechas`;
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id_excursion: id }),
    })
      .then((response) => response.json())    
      .then((data) => {
        var boton = document.getElementById(idBoton)      
        boton.style.backgroundColor = "#41ff33";
        boton.onclick = 
          eliminarExcursionHecha(id, boton.id);
          
        
      });
    }
  }
  function eliminarExcursionHecha(id, idBoton) {
    return function()
    {var url = `${config.urlBackend}/usuario/excursiones-hechas`;
    fetch(url, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id_excursion: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        var boton = document.getElementById(idBoton)      
        boton.style.backgroundColor = "inherit";
        boton.onclick = 
          añadirExcursionHecha(id, boton.id);
          
      
      });}
  }


