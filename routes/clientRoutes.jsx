const express = require('express');
const clientController = require('../controllers/clientController.jsx');

const router = express.Router();

router.post('/register', clientController.register);
router.post('/update', clientController.alterar);
router.post('/buscar', clientController.buscar);
router.post('/delete', clientController.deleteClientById);
router.get('/list',clientController.list)


module.exports = router;