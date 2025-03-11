const express = require('express');
const router = express.Router();
const mensajeController = require('../controllers/mensajeController');

router.get('/', mensajeController.getAllMessages);
router.get('/:id', mensajeController.getMessageById);
router.post('/', mensajeController.createMessage);
router.put('/:id', mensajeController.updateMessage);
router.delete('/:id', mensajeController.deleteMessage);

module.exports = router;
