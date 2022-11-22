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
//parsea contentType urlencoded(como se pasa el body)
app.use(express.urlencoded({extended:true}))
//servir estaticamente la carpeta public
app.use(express.static("public"))

//EXCURSIONES

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
  const mes = req.query['mes']
  const destino = req.query['destino']
  //SIEMPRE HAY CONDICION TRUE
  var query = `SELECT * FROM excursiones WHERE 1=1 `
  if(mes){
    const now = new Date()
    if(mes==="noviembre"){
      query+=` AND fecha_inicio BETWEEN CAST('${now.getFullYear()}-11-1' AS DATE) AND CAST('${now.getFullYear()}-11-30' AS DATE) `
    }else if(mes==="septiembre"){
      query+=` AND fecha_inicio BETWEEN CAST('${now.getFullYear()}-09-1' AS DATE) AND CAST('${now.getFullYear()}-09-30' AS DATE) `

    }else if(mes==="octubre"){
      query+=` AND fecha_inicio BETWEEN CAST('${now.getFullYear()}-10-1' AS DATE) AND CAST('${now.getFullYear()}-10-31' AS DATE) `

    }else if(mes==="diciembre"){
      query+=` AND fecha_inicio BETWEEN CAST('${now.getFullYear()}-12-1' AS DATE) AND CAST('${now.getFullYear()}-12-31' AS DATE) `

    }
  }
  if(destino){    
    query+= `AND destino = "${destino}"`
  }
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err
    
    res.json(result)
  });
})


//BLOG

app.get('/api/blog/:id', (req, res) => {
  const id= req.params['id']
  const query = `SELECT * FROM blog WHERE id_entrada=${id}`
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err
    if (result.length===0){
      res.status(404).send("NOT FOUND")
      return
    }   
    res.json(result[0])
  });
})

app.get('/api/blog', (req, res) => {
  const query = `SELECT * FROM blog`
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err
    
    res.json(result)
  });
})

//CONTACTO

var nodemailer = require('nodemailer');
const bodyParser = require("body-parser")

app.post('/api/contacto', (req, res) => {

  const {nombre, email, asunto, mensaje} = req.body

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    //autenticacion gmail
    auth: {
      user: 'acalvoconpelo@gmail.com',
      pass: 'eoowrypcrwsvgeki'
    }
  });

  var mailOptions = {
    from: 'acalvoconpelo@gmail.com',
    to: 'acalvoconpelo@gmail.com',
    subject: asunto,
    text: mensaje
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
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
