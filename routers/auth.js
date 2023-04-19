// express importing
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
// creating user account route
router.post('/register' , userController.register);

//  login user 
router.post('/login' , userController.login);

// export for global use

module.exports = router;
