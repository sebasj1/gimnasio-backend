const express = require('express');
const router = express.Router();
const rutinaController = require('../controllers/rutinaController');

router.get('/', rutinaController.getAllRoutines);
router.get('/:id', rutinaController.getRoutineById);
router.post('/', rutinaController.createRoutine);
router.put('/:id', rutinaController.updateRoutine);
router.delete('/:id', rutinaController.deleteRoutine);

module.exports = router;
