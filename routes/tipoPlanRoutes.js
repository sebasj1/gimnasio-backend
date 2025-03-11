const express = require("express");
const router = express.Router();
const tipoPlanController = require("../controllers/tipoPlanController");

router.get("/", tipoPlanController.getAllPlans);
router.get("/:id", tipoPlanController.getPlanById);
router.post("/", tipoPlanController.createPlan);
router.put("/:id", tipoPlanController.updatePlan);
router.delete("/:id", tipoPlanController.deletePlan);

module.exports = router;
