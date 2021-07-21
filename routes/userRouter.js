var express = require('express');
var router = express.Router();
var userController = require("../controllers/user.Controller");

//Register a user
router.post('/register', userController.registerUser);
//Login a user
router.post('/login', userController.loginUser);

//verify a token 
router.get('/verify', userController.verifiedToken);

module.exports = router;