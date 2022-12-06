var mysql = require('mysql');
function connect(){
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "excursiones-ibice"
    });  
    connection.connect(function(err) {
        if (err) throw err;
        console.log("¡Conectado a la base de datos!");        
    });
    return connection  
}


module.exports = {connect} 
 