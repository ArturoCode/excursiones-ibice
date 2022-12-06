var mysql = require('mysql');

const db_host = process.env.DB_HOST || "localhost"
const db_user = process.env.DB_USER || "root"
const db_password = process.env.DB_PASSWORD || ""
const db_name = process.env.DB_NAME || "excursiones-ibice"

function connect(){
    var connection = mysql.createConnection({
        host: db_host,
        user: db_user,
        password: db_password,
        database: db_name
    });  
    connection.connect(function(err) {
        if (err) throw err;
        console.log("¡Conectado a la base de datos!");        
    });
    return connection  
}


module.exports = {connect} 
 