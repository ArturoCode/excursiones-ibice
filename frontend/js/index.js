//PROYECTO
var opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  
  function getExcursiones() {
    var url = `${config.urlBackend}/excursiones`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //coger solo los 6 primeras excursiones
        data = data.slice(0,6)
        
        var popularesDOM = document.getElementById("populares");
        var otonoDOM = document.getElementById("excursion-otono");
        var fichaDOM = document.getElementById("ficha");
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
            //si es una de las tres primeras la pones en popular, de la 3 a la 6 en otoño           
            if(data.indexOf(excursion)<3) popularesDOM.appendChild(fichaTemp)
            else otonoDOM.appendChild(fichaTemp)
          }
        //elimar plantilla
        fichaDOM.remove()
        });
    }

  function filtrarExcursiones(){
    const destino = document.getElementById("lugares").value;
    const mes = document.getElementById("meses").value;
    var url = `${config.url}/listado_excursiones.html?`;
    if(destino && destino.length > 0){
      url += `&destino=${destino}`
    }
    if(mes && mes.length > 0){
      url += `&mes=${mes}`
    }
    
    //Cambiar de URL
    window.location=url

  }
  