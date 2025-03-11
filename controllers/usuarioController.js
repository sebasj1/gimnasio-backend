// CRUD usuarios
const db = require("../db/db");

exports.getAllUsers = (req, res) => {
  try {
    const sql = "SELECT * FROM usuario";
    db.query(sql, (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ error: "No se ha podido realizar la busqueda" });
      res.json(results);
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.getUserById = (req, res) => {
  try {
    const sql = "SELECT * FROM usuario WHERE id_usuario= ?";
    db.query(sql, [req.params.id], (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: "No se ha podido buscar usuario" });
      if (result.length == 0)
        return res.status(404).json({ error: "No existe el usuario" });
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
};
exports.getUserByIdRefresh = (req, res) => {
  try {
    const sql = "SELECT * FROM usuario WHERE id_usuario= ?";
    db.query(sql, [req.params.id], (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: "No se ha podido buscar usuario" });
      if (result.length == 0)
        return res.status(404).json({ error: "No existe el usuario" });

      return res.json({ ...result[0], password: "" });
    });
  } catch (error) {
    throw new Error(error);
  }
};
exports.getUserByEmailOrDNI = (email, numero_documento) => {
  try {
    return new Promise((res, rej) => {
      const sql = "SELECT * FROM usuario WHERE email = ? or numero_documento=?";
      db.query(sql, [email, numero_documento], (err, result) => {
        if (err) {
          rej(err);
        }
        if (result.length > 0) {
          res(true);
        } else {
          res(false);
        }
      });
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.getUserByEmailToSesion = (req, res, callback) => {
  try {
    const sql = "SELECT * FROM usuario WHERE email = ? LIMIT 1";
    db.query(sql, [req.body.email], (err, result) => {
      if (err) {
        res.status(500).json({ error: "No se ha podido buscar usuario" });
        return callback(null, false); // Pasamos null y false indicando que hubo un error
      }
      if (result.length == 0) {
        return callback(null, false); // Pasamos null y false indicando que no se encontró el usuario
      }

      // Pasamos el resultado al callback sin enviar la respuesta aún
      return callback(result[0], true); // Devolvemos solo el primer usuario
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.createUser = async (req, res, callback) => {
  try {
    if (
      await this.getUserByEmailOrDNI(req.body.email, req.body.numero_documento)
    ) {
      res.status(400).json({
        error: "Ya existe un usuario con ese email o número de documento",
      });

      return callback(false);
    } else {
      const sql = "INSERT INTO usuario SET ?";
      const newUser = req.body;
      db.query(sql, newUser, (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ error: "No se ha podido registrar el usuario", err });
          return callback(false);
        }
        res
          .status(201)
          .json({ message: "Usuario registrado correctamente", user: result });
        return callback(true);
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateUser = (req, res) => {
  try {
    const sql = "UPDATE usuario SET ? WHERE id_usuario = ?";
    const updatedUser = req.body;
    db.query(sql, [updatedUser, req.params.id], (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "No se ha podido actualizar usuario" });
      if (result.affectedRows == 0)
        return res.status(404).json({ message: "No existe el usuario" });
      res.json({ message: "Usuario actualizado correctamente" });
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteUser = (req, res) => {
  try {
    const sql = "DELETE FROM usuario WHERE id_usuario= ?";
    db.query(sql, [req.params.id], (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: "No se ha podido eliminar usuario" });
      if (result.affectedRows == 0)
        return res.status(404).json({ error: "No existe el usuario" });

      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
};
