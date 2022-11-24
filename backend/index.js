var db = require("./sqlconnector.js");
var session = require("express-session");

const validator = require("validator");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const port = 2000;
const dbcon = db.connect();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
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
  console.log(req.body);
  const { nombre, email, asunto, mensaje } = req.body;
  var emailIntroducido = email;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    //autenticacion gmail
    auth: {
      user: "excursionesibice@gmail.com",
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
    subject: "Solicitud de contacto Excursiones Íbice",
    text:
      "Un resumen de tu solicitud: Asunto: " +
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
      const equalPassword = await bcrypt.compare(password, result[0].password)
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
  const response =  { logged: req.session.user ? true : false, user: req.session.user }
  return res
    .status(200)
    .json(response);
});

app.get("/api/desconectarse", (req, res) => {
  req.session.user = null
  return res
    .status(200)
    .send({});
});

//servir estaticamente el frontend
app.use("/js", express.static("../frontend/js"));
app.use("/css", express.static("../frontend/css"));
app.use("/media", express.static("../frontend/media"));
app.use("/", express.static("../frontend/html"));

app.listen(port, () => {
  console.log(`App escuchando en el puerto ${port}`);
});
