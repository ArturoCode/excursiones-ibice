var opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  

  function getExcursiones() {

    var urlParams = new URLSearchParams(window.location.search)
    var mes = urlParams.get("mes")
    var destino = urlParams.get("destino")
    var url = `${config.urlBackend}/excursiones?`;
    const infoUsuarioExcursiones = fetch(
      `${config.urlBackend}/usuario/excursiones/info`
    );
    if(mes) url+=`&mes=${mes}`
    if(destino) url+=`&destino=${destino}`

    const infoExcursiones = fetch(url);
    Promise.all([infoExcursiones, infoUsuarioExcursiones])
    .then((res) => Promise.all([res[0].json(), res[1].json()]))
      .then((res) => {
        var data = res[0];
        var infoUsuario = res[1];
        var fichaDOM = document.getElementById("ficha");
        var excursiones = document.getElementById("listado-excursiones");
        //iterar por todas las excursiones y rellenar la plantilla con lla informacion de cada excursiom
        for(var excursion of data){          
            var fichaTemp = fichaDOM.cloneNode(true);
            var botonContainer = fichaTemp.querySelector("#button-container")
            const user = JSON.parse(localStorage.getItem("user"));     

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
            }else{
              botonContainer.remove()
            }  
            fichaTemp.querySelector("#imagenf").src = excursion.url_imagen_principal;
            fichaTemp.querySelector("#url-excursion").href = `./excursiones/detalles_excursion.html?id=${excursion.id_excursion}`;
            fichaTemp.querySelector("#nombre-excursion").innerHTML = excursion.nombre_excursion;
            fichaTemp.querySelector("#nombre-excursion").href = `./excursiones/detalles_excursion.html?id=${excursion.id_excursion}`;
            fichaTemp.querySelector("#fecha").innerHTML = new Date(
                excursion.fecha_inicio
              ).toLocaleDateString("es-ES", opciones);              
            fichaTemp.querySelector("#hora-salida").innerHTML = excursion.hora_salida;
            fichaTemp.querySelector("#hora-regreso").innerHTML = excursion.hora_regreso;
            fichaTemp.querySelector("#destino").innerHTML = excursion.destino;  
            fichaTemp.querySelector("#precio").innerHTML = excursion.precio+" €";

            excursiones.appendChild(fichaTemp);


        }
        //elimar plantilla
        fichaDOM.remove()

        
      
    });
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
        boton.style.backgroundColor = "#41ff33";
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



  