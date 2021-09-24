const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller');
const {decode} = require('../middleware/jwt')

router.get('/', decode,userController.getuser);
router.post('/create', userController.create);
router.post('/login', userController.login);
router.put('/update', userController.update);
router.delete('/delete', userController.delete);

module.exports = router;