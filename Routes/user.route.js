const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller');


router.get('/', userController.getuser);
router.post('/create', userController.create);
router.put('/update', userController.update);
router.delete('/delete', userController.delete);

module.exports = router;