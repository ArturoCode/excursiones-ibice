function getEntrada() {
    //objeto que te parsea los queryParams(te lo pasa por la url) y con el id haces la peticion
    var urlParams = new URLSearchParams(window.location.search)
    var id = urlParams.get("id")       

    var url = `${config.urlBackend}/blog/${id}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {

        document.getElementById("titulo-entrada").innerHTML = data.titulo_entrada;

        var textoArray = data.texto_entrada.split("(fin-parrafo)");
        var imagesArray = data.url_imagen.split(",");
        
        var secciones = document.getElementById("secciones-blog");
        var seccion1 = document.getElementById("seccion1");
        var seccion2 = document.getElementById("seccion2");
        //poner texto izq o derecha 
        for (var i = 0; i < textoArray.length; i++) {
          var textoTemporal;
          if (i % 2 === 0) textoTemporal = seccion1.cloneNode(true);
          else textoTemporal = seccion2.cloneNode(true);
          textoTemporal.getElementsByTagName("p")[0].innerHTML =
          textoArray[i];
          textoTemporal.getElementsByTagName("img")[0].src =
            imagesArray[i];
          
          secciones.appendChild(textoTemporal);
        }
  
        seccion1.remove();
        seccion2.remove();
  
      });
  }
  