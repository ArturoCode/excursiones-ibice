var opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  
  function getExcursion() {
    //objeto que te parsea los queryParams(te lo pasa por la url) y con el id haces la peticion
    var urlParams = new URLSearchParams(window.location.search)
    var id = urlParams.get("id")       

    var url = `${config.urlBackend}/excursiones/${id}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        
        document.getElementById("nombre-excursion").innerHTML = data.nombre_excursion;
        document.getElementById("imagenf").src = data.url_imagen_principal;
        //Cambiar el formato de las fechas creando un objeto date con la fecha y cambiandolo a la fecha formato españa
        document.getElementById("fecha-inicio").innerHTML = new Date(
          data.fecha_inicio
        ).toLocaleDateString("es-ES", opciones);
        document.getElementById("fecha-final").innerHTML = new Date(
          data.fecha_fin
        ).toLocaleDateString("es-ES", opciones);

        document.getElementById("nivel").innerHTML = data.nivel;
        document.getElementById("transporte").innerHTML = data.transporte;
        document.getElementById("destino").innerHTML = data.destino;
        document.getElementById("hora-salida").innerHTML = data.hora_salida;
        document.getElementById("hora-regreso").innerHTML = data.hora_regreso;
        document.getElementById("punto-salida").innerHTML = data.lugar_salida;
        document.getElementById("precio").innerHTML = data.precio+" €";
  
        var descripcionArray = data.descripcion.split("(fin-parrafo)");
        var imagesArray = data.url_imagen.split(",");
        var descripciones = document.getElementById("descripciones");
        var descripcion1 = document.getElementById("descripcion1");
        var descripcion2 = document.getElementById("descripcion2");
        //poner texto izq o derecha 
        for (var i = 0; i < descripcionArray.length; i++) {
          var descripcionTemporal;
          if (i % 2 === 0) descripcionTemporal = descripcion1.cloneNode(true);
          else descripcionTemporal = descripcion2.cloneNode(true);
          descripcionTemporal.getElementsByTagName("p")[0].innerHTML =
            descripcionArray[i];
          descripcionTemporal.getElementsByTagName("img")[0].src =
            imagesArray[i];
          
          descripciones.appendChild(descripcionTemporal);
        }
  
        descripcion1.remove();
        descripcion2.remove();
  
        document.getElementById("info-material").innerHTML = data.material;
        document.getElementById("info-atmosferico").innerHTML =
          data.tiempo_atmosferico;
        document.getElementById("info-detalles").innerHTML = data.detalles;
      });
  }
  