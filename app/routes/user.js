var db = require("../sqlconnector");
const dbcon = db.connect();
const bcrypt = require("bcrypt");
const validator = require("validator");
var crypto = require("crypto");
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  //autenticacion gmail
  auth: {
    user: "excursionesibice@gmail.com",
    //password creada con la verificacion en dos pasos y como contraseña de aplicacion
    pass: "pkglddfmgmiwolot",
  },
});


//Resetea la contraseña dependiendo del token que se le envie. primero mira si el token existe en la bbdd, y si existe hassea la nueva contraseña del usuario
//y hace un update en la base de datos de la contraseña al usuario con el reset token mandado. y quita el reset token para que no se pueda volver a utilizar
const resetPassword = (req, res) => {

    const { token, password } = req.body;
  
    const query = `SELECT * FROM usuarios where reset_password_token="${token}"`;
    dbcon.query(query, function (err, result, fields) {
      if (err) throw err;
  
      if (result.length === 0) {
        return res.status(400).send({ message: "Token invalido" });
      }
  
      const hashedPassword = bcrypt.hashSync(password,12);
  
      const queryUpdate = `UPDATE usuarios SET password="${hashedPassword}" WHERE reset_password_token="${token}"`;
      dbcon.query(queryUpdate, function (err, result, fields) {
        if (err) throw err;
  
        const queryUpdateToken = `UPDATE usuarios SET reset_password_token="" WHERE reset_password_token="${token}"`;
        dbcon.query(queryUpdateToken, function (err, result, fields) {
          if (err) throw err;
        })
  
        return res.status(200).send({ message: "Contraseña cambiada" });
      });
    });
  }

// restear contraseña. instalar modulo crypto,  crear un campo en la base de datos llamado rest_password_token. coge email, ve si existe, si existe, genera un uuid como 
// identificador para resetear la contraseña y le pone al usuario con ese email la propiedad restpasswordotoken con el uuid generado, y manda un correo con el link a la pagina 
// de reset contraseña con el token 
const confirmResetPassword = (req, res) => {
    const { email } = req.body;
  
    const query = `SELECT * FROM usuarios where email="${email}"`;
    dbcon.query(query, function (err, result, fields) {
      if (err) throw err;
      if (result.length === 0) {
        return res.status(400).send({ message: "Email no encontrado" });
      }
  
      const token = crypto.randomUUID();
  
      const queryUpdate = `UPDATE usuarios SET reset_password_token="${token}" WHERE email="${email}"`;
      dbcon.query(queryUpdate, function (err, result, fields) {
        var mailOptions = {
          from: `excursionesibice@gmail.com`,
          to: email,
          subject: "Solicitud cambio contraseña - Excursiones Íbice",
          text:
            "Accede a este enlace para cambiar la contraseña: https://excursiones-ibice.up.railway.app/user/recordar-pass.html?token=" +
            token,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
            return res.status(200).send({ message: "Email reseteo enviado" });
          }
        });
      });
    });
  }

//LOGIN
const login = (req, res) => {
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
  }

//REGISTER COMPROBAMOS LOS CAMPOS Y SI EL NOMBRE O EL CORREO ESTAN EN LA BBDD
const register = async (req, res) => {
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
  
    //CON BCRYPT TE HASHEA LA CONTRASEÑA AL GUARDARLA EN LA BASE DE DATOS 
    const hashedPassword = bcrypt.hashSync(password, 12);
  
    var query = `INSERT INTO usuarios (email, password, nombre_usuario, membresia, tipo_usuario, reset_password_token) VALUES ('${email}','${hashedPassword}','${nombre_usuario}','usuario','usuario','token')`;
    dbcon.query(query, function (err, result, fields) {
  
      if (err) throw err;
  
      res.status(200).send({});
    });
}

//ESTABLECER SESION
const session =  (req, res) => {
    const response = {
      logged: req.session.user ? true : false,
      user: req.session.user,
    };
    return res.status(200).json(response);
}

//DESCONECTARE DE LA WEB
const logout = (req, res) => {
    req.session.user = null;
    return res.status(200).send({});
  }

//SELECCIONAR AL USUARIO POR ID
const currentUser = (req, res) => {
    var query = `SELECT * FROM usuarios WHERE  id_usuario=${req.session.user.id}`;
    dbcon.query(query, function (err, result, fields) {
      if (err) throw err;
  
      if (result.length === 0) return res.status(401).send({});
      res.status(200).send(result[0]);
    });
  }

//DESDE PERFIL CAMBIAR NOMBRE DE USUARIO O CORREO
const updateUser = (req, res) => {
    const id_usuario = req.session.user.id;
    const { nombre_usuario, email } = req.body;
    var query = `UPDATE usuarios SET nombre_usuario="${nombre_usuario}" , email="${email}" WHERE id_usuario=${id_usuario}`;
    console.log(query);
    dbcon.query(query, function (err, result, fields) {
  
      if (err) throw err;
  
      res.status(200).send({});
    });
  }

module.exports = {resetPassword, confirmResetPassword, login, register, session, 
    logout, currentUser, updateUser}