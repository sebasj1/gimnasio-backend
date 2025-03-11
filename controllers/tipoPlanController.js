// CRUD rutina
const db = require("../db/db");

exports.getAllPlans = (req, res) => {
  try {
    const sql = "SELECT * FROM plan";
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

exports.getPlanById = (req, res) => {
  try {
    const sql = "SELECT * FROM plan WHERE id_rutina = ?";
    db.query(sql, [req.params.id], (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: "No se ha podido buscar la rutina" });
      if (result.length == 0)
        return res.status(404).json({ error: "No existe la rutina" });
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.createPlan = (req, res) => {
  try {
    const sql = "INSERT INTO plan SET ?";
    const newRoutine = req.body;
    db.query(sql, newRoutine, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: "No se ha podido crear la rutina" });
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.updatePlan = (req, res) => {
  try {
    const sql = "UPDATE plan SET ? WHERE id_rutina = ?";
    const updatedUser = req.body;
    db.query(sql, [updatedUser, req.params.id], (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: "No se ha podido actualizar la rutina" });
      if (result.affectedRows == 0)
        return res.status(404).json({ error: "No existe la rutina" });
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.deletePlan = (req, res) => {
  try {
    const sql = "DELETE FROM plan WHERE id_rutina= ?";
    db.query(sql, [req.params.planid], (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: "No se ha podido eliminar la rutina" });
      if (result.affectedRows == 0)
        return res.status(404).json({ error: "No existe la rutina" });
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
};
