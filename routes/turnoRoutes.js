const express = require("express");
const router = express.Router();
const turnoController = require("../controllers/turnoController");
const authMiddleWare = require("../middlewares/authMiddleWare");

router.get("/:id", turnoController.getTurn);
router.post("/", authMiddleWare, turnoController.createTurn);
router.delete("/:id", authMiddleWare, turnoController.deleteTurn);

module.exports = router;
