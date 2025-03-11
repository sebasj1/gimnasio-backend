// CRUD turno
const db = require("../db/db");

exports.getTurn = (req, res) => {
   try {const sql = "SELECT * FROM turno WHERE id_usuario= ?";
 
    db.query(sql, [req.params.id], (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "No se ha podido buscar los horarios" });
      if (result.length == 0)
        return res
          .status(404)
          .json({ message: "No tiene horarios registrados" });
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.createTurn = (req, res) => {
  try {
    const sql = "INSERT INTO turno SET ?";
    const newTurn = req.body;
    db.query(sql, newTurn, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "No se ha podido crear el horario" });
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteTurn = (req, res) => {
  try {
    const sql = "DELETE FROM turno WHERE id_usuario= ?";
    db.query(sql, [req.params.id], (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "No se ha podido eliminar el horario" });
      if (result.affectedRows == 0)
        return res.status(404).json({ message: "No existe horarios" });
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
};
