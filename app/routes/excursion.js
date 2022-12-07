var db = require("../sqlconnector");
const dbcon = db.connect();

//SELECCIONAR EXCURSION POR ID
const getExcursionById = (req, res) => {
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
}

//SELECCIONAR EXCURSIONES POR MES Y DESTINO (SELECT DE DESTINO Y MES)
const searchExcursions = (req, res) => {
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
}

//INSERTAR EXCURSION GUARDADA
const insertSavedExcursion = (req, res) => {
    const id_usuario = req.session.user.id;
    const { id_excursion } = req.body;
    var query = `INSERT INTO excursiones_guardadas (id_usuario, id_excursion) VALUES (${id_usuario},${id_excursion})`;
    dbcon.query(query, function (err, result, fields) {
      if (err) throw err;
  
      res.status(200).send({});
    });
}

//ELIMINAR EXCURSION GUARDADA
const deleteSavedExcursion = (req, res) => {
    const id_usuario = req.session.user.id;
    const { id_excursion } = req.body;
    var query = `DELETE FROM excursiones_guardadas WHERE id_usuario=${id_usuario} AND id_excursion=${id_excursion} `;
    dbcon.query(query, function (err, result, fields) {
      if (err) throw err;
  
      res.status(200).send({});
    });
}

//SELECCIONAR EXCURSIONES GUARDADAS
const getSavedExcursion =  (req, res) => {
    const id_usuario = req.session.user.id;
    var query = `SELECT * FROM excursiones_guardadas RIGHT JOIN excursiones ON excursiones_guardadas.id_excursion=excursiones.id_excursion WHERE id_usuario=${id_usuario} `;
    dbcon.query(query, function (err, result, fields) {
      if (err) throw err;
      res.status(200).send(result);
    });
}

//INSERTAR EXCURSION HECHA 
const insertDoneExcursion =   (req, res) => {
    const id_usuario = req.session.user.id;
    const { id_excursion } = req.body;
    var query = `INSERT INTO excursiones_hechas (id_usuario, id_excursion) VALUES (${id_usuario},${id_excursion})`;
    dbcon.query(query, function (err, result, fields) {
      if (err) throw err;
  
      res.status(200).send({});
    });
}

//ELIMINAR EXCURSION HECHA
const deleteDoneExcursion = (req, res) => {
    const id_usuario = req.session.user.id;
    const { id_excursion } = req.body;
    var query = `DELETE FROM excursiones_hechas WHERE id_usuario=${id_usuario} AND id_excursion=${id_excursion} `;
    dbcon.query(query, function (err, result, fields) {
      if (err) throw err;
  
      res.status(200).send({});
    });
}

//SELECCIONAR EXCURSIONES HECHAS
const getDoneExcursion = (req, res) => {
    const id_usuario = req.session.user.id;
    var query = `SELECT * FROM excursiones_hechas RIGHT JOIN excursiones ON excursiones_hechas.id_excursion=excursiones.id_excursion WHERE id_usuario=${id_usuario}`;
    dbcon.query(query, function (err, result, fields) {
      if (err) throw err;
  
      res.status(200).send(result);
    });
  }

//SELECCIONAR EXCURSIONES HECHAS Y GUARDADAS SEGUN TU USUARIO PARA MOSTRARLAS EN TU PERFIL
const getSavedDone = async (req, res) => {
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
  }

//ACTUALIZAR EXCURSIONES DESDE PERFIL ADMIN
const updateExcursion = (req, res) => {
    if (!req.session.user || req.session.user.rol !== "admin") {
      return res.status(403).send({ message: "no autorizado" });
    }
  
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
  
    fecha_inicio = fecha_inicio.replace("Z", "");
    fecha_fin = fecha_fin.replace("Z", "");
  
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
  }

//INSERTAR EXCURSIONES DESDE PERFIL ADMIN
const insertExcursion = (req, res) => {   
    if (!req.session.user || req.session.user.rol !== "admin") {
      return res.status(403).send({ message: "no autorizado" });
    }
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
  
    fecha_inicio = fecha_inicio.replace("Z", "");
    fecha_fin = fecha_fin.replace("Z", "");
  
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
  }

//ELIMINAR EXCURSIONES DESDE PERFIL ADMIN
const deleteExcursion = (req, res) => {
    if (!req.session.user || req.session.user.rol !== "admin") {
      return res.status(403).send({ message: "no autorizado" });
    }
    const id = req.query["id_excursion"];
    const query = `DELETE FROM excursiones WHERE id_excursion=${id}`;
    dbcon.query(query, function (err, result, fields) {
      if (err) throw err;
  
      res.status(200).send({});
    });
  }

module.exports = {getExcursionById, searchExcursions, insertSavedExcursion, deleteSavedExcursion, getSavedExcursion, insertDoneExcursion, deleteDoneExcursion, getDoneExcursion,
    getSavedDone, updateExcursion, insertExcursion, deleteExcursion}