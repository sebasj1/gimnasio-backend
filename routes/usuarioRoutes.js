const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

const authMiddleWare = require("../middlewares/authMiddleWare");

router.get("/", usuarioController.getAllUsers);
router.get("/:id", usuarioController.getUserById);
router.get(
  "/refresh/:id",
  authMiddleWare,
  usuarioController.getUserByIdRefresh
);
router.post("/", usuarioController.createUser);
router.put("/:id", authMiddleWare, usuarioController.updateUser);
router.delete("/:id", authMiddleWare,usuarioController.deleteUser);

module.exports = router;
