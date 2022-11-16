var mysql = require('mysql');

//Con el módulo de http se puede crear un servidor

var http = require('http'); 
var dateTime = require('./funciones/datetime');

http.createServer(function (req, res) {
    //Incluir una cabecera HTTP con el tipo correcto de contenido
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("Hello World! <br/><br/> The date and time are currently: " + dateTime.myDateTime());
    res.end();
  }).listen(8080); 
