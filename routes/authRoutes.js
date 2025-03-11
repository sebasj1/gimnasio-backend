const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleWare = require("../middlewares/authMiddleWare");

router.post("/registro", authController.register);
router.post("/login", authController.login);

router.get("/protegido", authMiddleWare, (req, res) => {
  res.status(200).send(`Hola user : ${req.userId}`);
}); //en el mw decide si pasa o no
module.exports = router;
