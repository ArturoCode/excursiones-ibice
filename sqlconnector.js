var mysql = require('mysql');
var dbHost = process.env.MYSQLHOST || "localhost"
var dbUser = process.env.MYSQLUSER || "root"
var dbPassword = process.env.MYSQLPASSWORD || ""
var dbPort = process.env.MYSQLPORT || "3306"
var db = process.env.MYSQLDATABASE || "excursiones-ibice"

function connect(){
    var connection = mysql.createConnection({
        host: dbHost,
        user: dbUser,
        password: dbPassword,
        database: db,
        port: dbPort
    });  
    connection.connect(function(err) {
        if (err) throw err;
        console.log("¡Conectado a la base de datos!");        
    });
    return connection  
}


module.exports = {connect} 
 
 