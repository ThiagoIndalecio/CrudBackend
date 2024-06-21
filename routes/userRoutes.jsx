const express = require('express');
const userController = require('../controllers/userController.jsx');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/list', userController.list);
router.put('/delete',userController.deleteUser)
router.post('/buscar',userController.buscar)
router.post('/update',userController.update)

module.exports = router;