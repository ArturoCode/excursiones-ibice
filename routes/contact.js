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

//CONTACTO.HTML , CON EL NODEMAILER COGEMOS LA SOLICITUD DE CONTACTO ESCRITA EN LA WEB, QUE NOS LLEGA A NOSOTROS Y OTRO EMAIL AL CORREO DE LA PERSONA QUE NOS LO ENVIA 
const contact = (req, res) => {

    const { nombre, email, asunto, mensaje } = req.body;
  
    var emailIntroducido = email;
  
    var mailOptions = {
      from: `excursionesibice@gmail.com`,
      to: "excursionesibice@gmail.com",
      subject: asunto,
      text:
        "El mensaje es: " +
        mensaje +
        ". Te lo ha mandado desde: " +
        emailIntroducido +
        " (" +
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
        "Un resumen de la solicitud que has realizado: Asunto: " +
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
}

module.exports = {contact}