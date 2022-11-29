var db = require("../sqlconnector");
const dbcon = db.connect();

//SELECCIONAR BLOG POR ID
const getBlogById = (req, res) => {
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
  }

//SELECCIONAR BLOG 
const getBlog = (req, res) => {
    const query = `SELECT * FROM blog`;
    dbcon.query(query, function (err, result, fields) {
      if (err) throw err;
  
      res.json(result);
    });
}

//ACTUALIZAR BLOG DESDE PERFIL ADMIN
const updateBlog = (req, res) => {
    if (!req.session.user || req.session.user.rol !== "admin") {
      return res.status(403).send({ message: "no autorizado" });
    }
    let {
      id_entrada,
      titulo_entrada,
      url_imagen_principal,
      descripcion_entrada,
      url_imagen,
      texto_entrada,
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
  }

//INSERTAR BLOG DESDE PERFIL ADMIN
const insertBlog = (req, res) => {
    if (!req.session.user || req.session.user.rol !== "admin") {
      return res.status(403).send({ message: "no autorizado" });
    }
    let {
      id_entrada,
      titulo_entrada,
      url_imagen_principal,
      descripcion_entrada,
      url_imagen,
      texto_entrada,
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
}

//ELIMINAR BLOG DESDE PERFIL ADMIN
const deleteBlog = (req, res) => {
    if (!req.session.user || req.session.user.rol !== "admin") {
      return res.status(403).send({ message: "no autorizado" });
    }
    const id = req.query["id_entrada"];
    const query = `DELETE FROM blog WHERE id_entrada=${id}`;
    dbcon.query(query, function (err, result, fields) {
      if (err) throw err;
  
      res.status(200).send({});
    });
}
module.exports = {getBlogById, getBlog, updateBlog, insertBlog, deleteBlog}