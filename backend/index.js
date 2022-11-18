var db = require("./sqlconnector.js")

// //Con el módulo de http se puede crear un servidor

// var http = require('http'); 
// var dateTime = require('./funciones/datetime');

// http.createServer(function (req, res) {
//     //Incluir una cabecera HTTP con el tipo correcto de contenido
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write("Hello World! <br/><br/> The date and time are currently: " + dateTime.myDateTime());
//     res.end();
//   }).listen(8080); 

const express = require('express')
const cors = require('cors')
const app = express()
const port = 2000
const dbcon = db.connect()

app.use(cors())
//servir estaticamente la carpeta public
app.use(express.static("public"))

app.get('/api/excursiones/:id', (req, res) => {
  const id= req.params['id']
  const query = `SELECT * FROM excursiones WHERE id_excursion=${id}`
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err
    if (result.length===0){
      res.status(404).send("NOT FOUND")
      return
    }   
    res.json(result[0])
  });
})

app.get('/api/excursiones', (req, res) => {
  const query = `SELECT * FROM excursiones`
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err
    
    res.json(result)
  });
})
//servir estaticamente el frontend
app.use("/js",express.static("../frontend/js"))
app.use("/css",express.static("../frontend/css"))
app.use("/media",express.static("../frontend/media"))
app.use("/",express.static("../frontend/html"))

app.listen(port, () => {
  console.log(`App escuchando en el puerto ${port}`)
})