var mysql = require('mysql');
function connect(){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "excursiones-ibice"
    });  
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");        
    });
    return con   
}


module.exports = {connect} 
 