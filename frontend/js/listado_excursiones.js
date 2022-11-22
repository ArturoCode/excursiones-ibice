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

    if(mes) url+=`&mes=${mes}`
    if(destino) url+=`&destino=${destino}`

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        var fichaDOM = document.getElementById("ficha");
        var excursiones = document.getElementById("excursiones");
        //iterar por todas las excursiones y rellenar la plantilla con lla informacion de cada excursiom
        for(var excursion of data){
            var fichaTemp = fichaDOM.cloneNode(true);
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
  