var session = require("express-session");
var crypto = require("crypto");
var db = require("./sqlconnector");

//rutas y datos
const dbcon = db.connect();
const excursionRoutes = require("./routes/excursion")
const blogRoutes = require("./routes/blog")
const contactRoutes = require("./routes/contact")
const userRoutes = require("./routes/user")
const validator = require("validator");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
//EN CONFIG.JS
const port = process.env.PORT || 2000;

var MySQLStore = require("express-mysql-session")(session);

var dbHost = process.env.MYSQLHOST || "localhost"
var dbUser = process.env.MYSQLUSER || "root"
var dbPassword = process.env.MYSQLPASSWORD || ""
var dbPort = process.env.MYSQLPORT || "3306"
var dbName = process.env.MYSQLDATABASE || "excursiones-ibice"

var options = {
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPassword,
  database: dbName,
};

//SESION MYSQL
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

//SELECCIONAR EXCURSION POR ID
app.get("/api/excursiones/:id", excursionRoutes.getExcursionById);

//SELECCIONAR EXCURSIONES POR MES Y DESTINO (SELECT DE DESTINO Y MES)
app.get("/api/excursiones", excursionRoutes.searchExcursions);

//SELECCIONAR BLOG POR ID
app.get("/api/blog/:id", blogRoutes.getBlogById);

//SELECCIONAR BLOG 
app.get("/api/blog", blogRoutes.getBlog);

//RESERVA. CON EL NODEMAILER COGEMOS LA SOLICITUD DE CONTACTO ESCRITA EN LA WEB, QUE NOS LLEGA A NOSOTROS Y OTRO EMAIL AL CORREO DE LA PERSONA QUE NOS LO ENVIA 
app.post("/api/reserva", reservaRoutes.reserva);

//CONTACTO.HTML , CON EL NODEMAILER COGEMOS LA SOLICITUD DE CONTACTO ESCRITA EN LA WEB, QUE NOS LLEGA A NOSOTROS Y OTRO EMAIL AL CORREO DE LA PERSONA QUE NOS LO ENVIA 
app.post("/api/contacto", contactRoutes.contact);

//Resetea la contraseña dependiendo del token que se le envie. primero mira si el token existe en la bbdd, y si existe hashea la nueva contraseña del usuario
//y hace un update en la base de datos de la contraseña al usuario con el reset token mandado. y quita el reset token para que no se pueda volver a utilizar

//NOTA: El token no se puede utilizar mas de una vez, si usas ese link personalizado con el token, te dará error

app.put("/api/usuario/reset-password", userRoutes.resetPassword );

// Restear contraseña. instalar modulo crypto,  crear un campo en la base de datos llamado rest_password_token. coge email, ve si existe, si existe, genera un uuid como 
// identificador para resetear la contraseña y le pone al usuario con ese email la propiedad restpasswordotoken con el uuid generado, y manda un correo con el link a la pagina 
// de reset contraseña con el token 

//NOTA: El token no se puede utilizar mas de una vez, si usas ese link personalizado con el token, te dará error
app.post("/api/usuario/reset-password", userRoutes.confirmResetPassword);

//LOGIN
app.post("/api/login", userRoutes.login);

//REGISTER COMPROBAMOS LOS CAMPOS Y SI EL NOMBRE O EL CORREO ESTAN EN LA BBDD
app.post("/api/register", userRoutes.register);

//ESTABLECER SESION
app.get("/api/sesion", userRoutes.session);

//DESCONECTARSE DE LA WEB
app.get("/api/desconectarse", userRoutes.logout);

//SELECCIONAR AL USUARIO POR ID
app.get("/api/current-user", userRoutes.currentUser);

//DESDE PERFIL CAMBIAR NOMBRE DE USUARIO O CORREO
app.put("/api/usuario", userRoutes.updateUser);

//INSERTAR EXCURSION GUARDADA
app.post("/api/usuario/excursiones-guardadas", excursionRoutes.insertSavedExcursion);

//ELIMINAR EXCURSION GUARDADA
app.delete("/api/usuario/excursiones-guardadas", excursionRoutes.deleteSavedExcursion);

//SELECCIONAR EXCURSIONES GUARDADAS
app.get("/api/usuario/excursiones-guardadas", excursionRoutes.getSavedExcursion);

//INSERTAR EXCURSION HECHA 
app.post("/api/usuario/excursiones-hechas", excursionRoutes.insertDoneExcursion);

//ELIMINAR EXCURSION HECHA
app.delete("/api/usuario/excursiones-hechas", excursionRoutes.deleteDoneExcursion);

//SELECCIONAR EXCURSIONES HECHAS
app.get("/api/usuario/excursiones-hechas", excursionRoutes.getDoneExcursion);

//SELECCIONAR EXCURSIONES HECHAS Y GUARDADAS SEGUN TU USUARIO PARA MOSTRARLAS EN TU PERFIL
app.get("/api/usuario/excursiones/info", excursionRoutes.getSavedDone);

//ACTUALIZAR EXCURSIONES DESDE PERFIL ADMIN
app.put("/api/excursiones", excursionRoutes.updateExcursion);

//INSERTAR EXCURSIONES DESDE PERFIL ADMIN
app.post("/api/excursiones", excursionRoutes.insertExcursion);

//ELIMINAR EXCURSIONES DESDE PERFIL ADMIN
app.delete("/api/excursiones", excursionRoutes.deleteExcursion);

//ACTUALIZAR BLOG DESDE PERFIL ADMIN
app.put("/api/blog", blogRoutes.updateBlog);

//INSERTAR BLOG DESDE PERFIL ADMIN
app.post("/api/blog", blogRoutes.insertBlog);

//ELIMINAR BLOG DESDE PERFIL ADMIN
app.delete("/api/blog", blogRoutes.deleteBlog);

//SUBIDA DE ARCHIVOS

const path = require("path")
const multer = require("multer")

// View Engine Setup
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
	
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// Carpeta de destino
		cb(null, "./public/images")
	},
  //file.originalname - coje el nombre del archivo original
  //también puedes personalizarlo como:
  //cb(null, file.fieldname + "-" + Date.now()+".jpg")
	filename: function (req, file, cb) {
	cb(null, file.originalname)
	}
})

//Máximo tamaño: 1MB
const maxSize = 1 * 1000 * 1000;
	
var upload = multer({
	storage: storage,
	limits: { fileSize: maxSize },
	fileFilter: function (req, file, cb){
	
		// Tipos de archivos que se puede subir
		var filetypes = /jpeg|jpg|png/;
		var mimetype = filetypes.test(file.mimetype);

		var extname = filetypes.test(path.extname(
					file.originalname).toLowerCase());
		
		if (mimetype && extname) {
			return cb(null, true);
		}
	
		console.log("Error: Solo se pueden subir archivos" + filetypes);
	}

// nombre del artibuto del archivo
}).single("archivo");	
	
app.post("/subir-archivos",function (req, res, next) {
		
	//Funcion para no subir en el caso de errores
	upload(req,res,function(err) {

		if(err) {
			//Error: Si ocupa más de 1MB, por ejemplo
			console.log(err)
		}
		else {
			console.log("Imagen subida")
		}
	})
})
	
app.listen(8080,function(error) {
	if(error) throw error
		console.log("Subida de archivos (puerto 8080)")
})

//servir estaticamente el frontend
app.use("/js", express.static("public/frontend/js"));
app.use("/css", express.static("public/frontend/css"));
app.use("/media", express.static("public/frontend/media"));
app.use("/", express.static("public/frontend/html"));

//VER SI ESTA EL PUERTO FUNCIONANDO
app.listen(port, () => {
  console.log(`Servidor`, process.pid, `escuchando en el puerto ${port}`);
});

module.exports = app;
