function getEntradas() {

  var url = `${config.urlBackend}/blog`;
  
  fetch(url)
    .then((response) => response.json())
    .then((data) => {  
      var entradasDOM = document.getElementById("entradas");
      var entradaDOM = document.getElementById("entrada");        
        //iterar por todas las entradas y rellenar la plantilla con la informacion de cada excursiom
      for(var entrada of data){
        var entradaTemp = entradaDOM.cloneNode(true);

        entradaTemp.querySelector("#titulo-entrada").innerHTML = entrada.titulo_entrada;
        entradaTemp.querySelector("#titulo-entrada").href = `./blog/entrada_blog.html?id=${entrada.id_entrada}`;            
        entradaTemp.querySelector("#imagen-principal").src = entrada.url_imagen_principal;            
        entradaTemp.querySelector("#url-entrada").href = `./blog/entrada_blog.html?id=${entrada.id_entrada}`;           
        entradaTemp.querySelector("#descripcion-entrada").innerHTML = entrada.descripcion_entrada;            
        entradaTemp.querySelector("#leer-mas").href = `./blog/entrada_blog.html?id=${entrada.id_entrada}`;
        
        entradasDOM.appendChild(entradaTemp)
      }
      //elimar plantilla
      entradaDOM.remove()
    });
}
  