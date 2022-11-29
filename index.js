var db = require("./sqlconnector.js");
var session = require("express-session");

const validator = require("validator");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
//EN CONFIG.JS
const port = process.env.PORT || 2000;
//import {port} from './config.js'
const dbcon = db.connect();

var MySQLStore = require("express-mysql-session")(session);

var options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "excursiones-ibice",
};

var sessionStore = new MySQLStore(options);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    //60 diasx24hx60minx60secsx1000miliseg
    cookie: { secure: false, maxAge: 60 * 24 * 60 * 60 * 1000 },
  })
);

app.use(cors());
app.use(express.json());
//parsea contentType urlencoded(como se pasa el body)
app.use(express.urlencoded({ extended: true }));
//servir estaticamente la carpeta public
app.use(express.static("public"));

//-EXCURSIONES-

app.get("/api/excursiones/:id", (req, res) => {
  const id = req.params["id"];
  const query = `SELECT * FROM excursiones WHERE id_excursion=${id}`;
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).send("NOT FOUND");
      return;
    }
    res.json(result[0]);
  });
});

app.get("/api/excursiones", (req, res) => {
  const mes = req.query["mes"];
  const destino = req.query["destino"];
  //SIEMPRE HAY CONDICION TRUE
  var query = `SELECT * FROM excursiones WHERE 1=1 `;
  if (mes) {
    const now = new Date();
    if (mes === "noviembre") {
      query += ` AND fecha_inicio BETWEEN CAST('${now.getFullYear()}-11-1' AS DATE) AND CAST('${now.getFullYear()}-11-30' AS DATE) `;
    } else if (mes === "septiembre") {
      query += ` AND fecha_inicio BETWEEN CAST('${now.getFullYear()}-09-1' AS DATE) AND CAST('${now.getFullYear()}-09-30' AS DATE) `;
    } else if (mes === "octubre") {
      query += ` AND fecha_inicio BETWEEN CAST('${now.getFullYear()}-10-1' AS DATE) AND CAST('${now.getFullYear()}-10-31' AS DATE) `;
    } else if (mes === "diciembre") {
      query += ` AND fecha_inicio BETWEEN CAST('${now.getFullYear()}-12-1' AS DATE) AND CAST('${now.getFullYear()}-12-31' AS DATE) `;
    }
  }
  if (destino) {
    query += `AND destino = '${destino}'`;
  }
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err;

    res.json(result);
  });
});

//BLOG

app.get("/api/blog/:id", (req, res) => {
  const id = req.params["id"];
  const query = `SELECT * FROM blog WHERE id_entrada=${id}`;
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).send("NOT FOUND");
      return;
    }
    res.json(result[0]);
  });
});

app.get("/api/blog", (req, res) => {
  const query = `SELECT * FROM blog`;
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err;

    res.json(result);
  });
});

//CONTACTO

var nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

app.post("/api/contacto", (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;
  var emailIntroducido = email;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    //autenticacion gmail
    auth: {
      user: "excursionesibice@gmail.com",
      //
      pass: "pkglddfmgmiwolot",
    },
  });

  var mailOptions = {
    from: `excursionesibice@gmail.com`,
    to: "excursionesibice@gmail.com",
    subject: asunto,
    text:
      "El mensaje es: " +
      mensaje +
      ". Te lo ha mandado desde: " +
      emailIntroducido +
      "(" +
      nombre +
      ").",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  var mailOptionsUsuario = {
    from: `excursionesibice@gmail.com`,
    to: emailIntroducido,
    subject: "Solicitud de contacto - Excursiones Íbice",
    text:
      "Un resumen de la solicitud: Asunto: " +
      asunto +
      " Con este mensaje: " +
      mensaje,
  };

  transporter.sendMail(mailOptionsUsuario, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return res.status(200).send("OK");
});

//RECORDAR CONTRASEÑA

//No se puede desencriptar un hash

//La unica manera es mandar un enlace personalizado a un update de la contraseña con dos campos formulario cuando el id es tal?
//Mirar como se hace el update de los datos_usuario y hacer una pagina que sea añadir nuevas contraseña como el de recordar contraseña

app.post("/api/recordar-contrasena", (req, res) => {
  const { nombre_usuario, email } = req.body;
  var emailIntroducido = email;

  const query = `SELECT * FROM usuarios WHERE nombre_usuario='${nombre_usuario}' AND email='${email}'`;
  
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0) {
      console.log("Usuario y mail no encontrados")
    }
    //res.json(result);
    console.log("Esto es la variable result:");
    console.log(result)

    console.log("Esto es la contraseña hasheada:");
    console.log(result[0].password)

    const hashedPassword = bcrypt.hashSync("holamundo", 12);
    var contrasena = "";

   if (bcrypt.compare(hashedPassword, result[0].password)){
    return console.log("Comprobación de contraseña - hecha");
   }else{
    return console.log("No se pudo comprobar la contraseña");
   }
  });

  var transporter = nodemailer.createTransport({
    service: "gmail",
    //autenticacion gmail
    auth: {
      user: "excursionesibice@gmail.com",
      //
      pass: "pkglddfmgmiwolot",
    },
  });
  contrasena = "holamundo"

  var mailOptions = {
    from: `excursionesibice@gmail.com`,
    to: emailIntroducido,
    subject: "Recuerda tu contraseña",
    text:
      "Tu contraseña es: " +
      contrasena +
      ".",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  var mailOptionsUsuario = {
    from: `excursionesibice@gmail.com`,
    to: `excursionesibice@gmail.com`,
    subject: "Solicitud de contraseña - Excursiones Íbice",
    text:
      "Un resumen de la solicitud: Contraseña: " +
      contrasena +
      ".",
  };

  transporter.sendMail(mailOptionsUsuario, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return res.status(200).send("OK");
});

//LOGIN
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  dbcon.query(
    `SELECT * FROM usuarios WHERE email = '${email}'`,
    async function (err, result, fields) {
      if (err) throw err;

      if (result.length === 0) {
        return res
          .status(400)
          .send({ field: "email", message: "No existe este email" });
      }
      const equalPassword = await bcrypt.compare(password, result[0].password);
      if (!equalPassword) {
        return res
          .status(400)
          .send({ field: "password", message: "Contraseña invalida" });
      }
      req.session.user = {
        id: result[0].id_usuario,
        nombre: result[0].nombre_usuario,
        email: result[0].email,
        rol: result[0].tipo_usuario,
      };
      res.status(200).send({});
    }
  );
});

//REGISTER

app.post("/api/register", async (req, res) => {
  const { nombre_usuario, email, password } = req.body;
  if (!nombre_usuario || nombre_usuario.length === 0) {
    return res.status(400).send({
      field: "nombre_usuario",
      message: "El nombre de usuario es obligatorio",
    });
  }
  if (!email || email.length === 0) {
    return res
      .status(400)
      .send({ field: "email", message: "El email es obligatorio" });
  } else if (!validator.isEmail(email)) {
    return res.status(400).send({ field: "email", message: "Email invalido" });
  }

  if (!password || password.length === 0) {
    return res
      .status(400)
      .send({ field: "password", message: "La contraseña es obligatorio" });
  }
  var failed = false;

  failed = await new Promise((resolve, reject) => {
    dbcon.query(
      `SELECT * FROM usuarios WHERE email = '${email}'`,
      function (err, result, fields) {
        if (err) throw err;

        if (result.length > 0) {
          res
            .status(400)
            .send({ field: "email", message: "Ya existe ese email" });
          resolve(true);
        }
        resolve(false);
      }
    );
  });
  if (failed) return;

  failed = await new Promise((resolve, reject) => {
    dbcon.query(
      `SELECT * FROM usuarios WHERE nombre_usuario = '${nombre_usuario}'`,
      function (err, result, fields) {
        if (err) throw err;

        if (result.length > 0) {
          res.status(400).send({
            field: "nombre_usuario",
            message: "Ya existe este nombre de usuario",
          });
          resolve(true);
        }
        resolve(false);
      }
    );
  });
  //si intentas llamar al res.send despues de haber hecho uno da un error
  if (failed) return;

  const hashedPassword = bcrypt.hashSync(password, 12);

  var query = `INSERT INTO usuarios (email, password, nombre_usuario, membresia, tipo_usuario) VALUES ('${email}','${hashedPassword}','${nombre_usuario}','usuario','usuario')`;
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err;

    res.status(200).send({});
  });
});

app.get("/api/sesion", (req, res) => {
  const response = {
    logged: req.session.user ? true : false,
    user: req.session.user,
  };
  return res.status(200).json(response);
});

app.get("/api/desconectarse", (req, res) => {
  req.session.user = null;
  return res.status(200).send({});
});

//usuario
app.get("/api/current-user", (req, res) => {
  var query = `SELECT * FROM usuarios WHERE  id_usuario=${req.session.user.id}`;
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0) return res.status(401).send({});
    res.status(200).send(result[0]);
  });
});

//update user

app.put("/api/usuario", (req, res) => {
  const id_usuario = req.session.user.id;
  const { nombre_usuario, email } = req.body;
  var query = `UPDATE usuarios SET nombre_usuario="${nombre_usuario}" , email="${email}" WHERE id_usuario=${id_usuario}`;
  console.log(query);
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err;

    res.status(200).send({});
  });
});
//MG Y HECHAS

app.post("/api/usuario/excursiones-guardadas", (req, res) => {
  const id_usuario = req.session.user.id;
  const { id_excursion } = req.body;
  var query = `INSERT INTO excursiones_guardadas (id_usuario, id_excursion) VALUES (${id_usuario},${id_excursion})`;
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err;

    res.status(200).send({});
  });
});

app.delete("/api/usuario/excursiones-guardadas", (req, res) => {
  const id_usuario = req.session.user.id;
  const { id_excursion } = req.body;
  var query = `DELETE FROM excursiones_guardadas WHERE id_usuario=${id_usuario} AND id_excursion=${id_excursion} `;
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err;

    res.status(200).send({});
  });
});

app.get("/api/usuario/excursiones-guardadas", (req, res) => {
  const id_usuario = req.session.user.id;
  var query = `SELECT * FROM excursiones_guardadas RIGHT JOIN excursiones ON excursiones_guardadas.id_excursion=excursiones.id_excursion WHERE id_usuario=${id_usuario} `;
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err;
    res.status(200).send(result);
  });
});

app.post("/api/usuario/excursiones-hechas", (req, res) => {
  const id_usuario = req.session.user.id;
  const { id_excursion } = req.body;
  var query = `INSERT INTO excursiones_hechas (id_usuario, id_excursion) VALUES (${id_usuario},${id_excursion})`;
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err;

    res.status(200).send({});
  });
});

app.delete("/api/usuario/excursiones-hechas", (req, res) => {
  const id_usuario = req.session.user.id;
  const { id_excursion } = req.body;
  var query = `DELETE FROM excursiones_hechas WHERE id_usuario=${id_usuario} AND id_excursion=${id_excursion} `;
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err;

    res.status(200).send({});
  });
});

app.get("/api/usuario/excursiones-hechas", (req, res) => {
  const id_usuario = req.session.user.id;
  var query = `SELECT * FROM excursiones_hechas RIGHT JOIN excursiones ON excursiones_hechas.id_excursion=excursiones.id_excursion WHERE id_usuario=${id_usuario}`;
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err;

    res.status(200).send(result);
  });
});

app.get("/api/usuario/excursiones/info", async (req, res) => {
  if (!req.session.user) {
    return res.status(200).send({ hechas: [], guardadas: [] });
  }
  hechas = await new Promise((resolve, reject) => {
    dbcon.query(
      `SELECT * FROM excursiones_hechas WHERE id_usuario = ${req.session.user.id}`,
      function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      }
    );
  });
  guardadas = await new Promise((resolve, reject) => {
    dbcon.query(
      `SELECT * FROM excursiones_guardadas WHERE id_usuario = ${req.session.user.id}`,
      function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      }
    );
  });
  res.status(200).send({
    guardadas: guardadas.map((a) => a.id_excursion),
    hechas: hechas.map((a) => a.id_excursion),
  });
});

app.put("/api/excursiones", (req, res) => {
  let {
    id_excursion,
    nombre_excursion,
    url_imagen_principal,
    fecha_inicio,
    fecha_fin,
    nivel,
    transporte,
    destino,
    hora_salida,
    hora_regreso,
    lugar_salida,
    precio,
    descripcion,
    material,
    tiempo_atmosferico,
    detalles,
    url_imagen,
  } = req.body;

  fecha_inicio = fecha_inicio.replace("Z", "")
  fecha_fin = fecha_fin.replace("Z", "")

  var query = `UPDATE excursiones SET 
      nombre_excursion='${nombre_excursion}',
      url_imagen_principal='${url_imagen_principal}',
      fecha_inicio=DATE('${fecha_inicio}'),
      fecha_fin=DATE('${fecha_fin}'),
      nivel='${nivel}',
      transporte='${transporte}',
      destino='${destino}',
      hora_salida='${hora_salida}',
      hora_regreso='${hora_regreso}',
      lugar_salida='${lugar_salida}',
      precio=${precio},
      descripcion='${descripcion}',
      material='${material}',
      tiempo_atmosferico='${tiempo_atmosferico}',            
      detalles='${detalles}',
      url_imagen='${url_imagen}'

      WHERE id_excursion=${id_excursion}
  `;

  dbcon.query(query, function (err, result, fields) {
    if (err) throw err;

    res.status(200).send({});
  });
});

app.post("/api/excursiones", (req, res) => {
  let {
    id_excursion,
    nombre_excursion,
    url_imagen_principal,
    fecha_inicio,
    fecha_fin,
    nivel,
    transporte,
    destino,
    hora_salida,
    hora_regreso,
    lugar_salida,
    precio,
    descripcion,
    material,
    tiempo_atmosferico,
    detalles,
    url_imagen,
  } = req.body;
  
  fecha_inicio = fecha_inicio.replace("Z", "")
  fecha_fin = fecha_fin.replace("Z", "")

  var query = `INSERT INTO excursiones SET 
      nombre_excursion='${nombre_excursion}',
      url_imagen_principal='${url_imagen_principal}',
      fecha_inicio=DATE('${fecha_inicio}'),
      fecha_fin=DATE('${fecha_fin}'),
      nivel='${nivel}',
      transporte='${transporte}',
      destino='${destino}',
      hora_salida='${hora_salida}',
      hora_regreso='${hora_regreso}',
      lugar_salida='${lugar_salida}',
      precio=${precio},
      descripcion='${descripcion}',
      material='${material}',
      tiempo_atmosferico='${tiempo_atmosferico}',            
      detalles='${detalles}',
      url_imagen='${url_imagen}'
  `;

  dbcon.query(query, function (err, result, fields) {
    if (err) throw err;

    res.status(200).send({});
  });
});

app.delete("/api/excursiones", (req, res) => {
  const id = req.query["id_excursion"];
  const query = `DELETE FROM excursiones WHERE id_excursion=${id}`;
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err;

    res.status(200).send({});
  });
});

//PERFIL BLOG

app.put("/api/blog", (req, res) => {
  let {
    id_entrada,
    titulo_entrada,
    url_imagen_principal,    
    descripcion_entrada,    
    url_imagen,
    texto_entrada
  } = req.body;

  var query = `UPDATE blog SET    
      titulo_entrada='${titulo_entrada}',
      url_imagen_principal='${url_imagen_principal}',      
      descripcion_entrada='${descripcion_entrada}',      
      url_imagen='${url_imagen}',
      texto_entrada='${texto_entrada}'
      WHERE id_entrada=${id_entrada}
  `;

  dbcon.query(query, function (err, result, fields) {
    if (err) throw err;

    res.status(200).send({});
  });
});

app.post("/api/blog", (req, res) => {
  let {
    id_entrada,
    titulo_entrada,
    url_imagen_principal,    
    descripcion_entrada,    
    url_imagen,
    texto_entrada
  } = req.body;

  var query = `INSERT INTO blog SET       
      titulo_entrada='${titulo_entrada}',
      url_imagen_principal='${url_imagen_principal}',      
      descripcion_entrada='${descripcion_entrada}',      
      url_imagen='${url_imagen}',
      texto_entrada='${texto_entrada}'      
  `;

  dbcon.query(query, function (err, result, fields) {
    if (err) throw err;

    res.status(200).send({});
  });
});
app.delete("/api/blog", (req, res) => {
  const id = req.query["id_entrada"];
  const query = `DELETE FROM blog WHERE id_entrada=${id}`;
  dbcon.query(query, function (err, result, fields) {
    if (err) throw err;

    res.status(200).send({});
  });
});
//servir estaticamente el frontend
app.use("/js", express.static("../frontend/js"));
app.use("/css", express.static("../frontend/css"));
app.use("/media", express.static("../frontend/media"));
app.use("/", express.static("../frontend/html"));

app.listen(port, () => {
  console.log(`App escuchando en el puerto ${port}`);
});

