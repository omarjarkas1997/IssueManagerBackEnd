const express = require('express');
const router = express.Router();
const records = require('../records/records');
const registerFunction = require('../helper/registerFunctions');
const authController = require('../controllers/authControllers');
const jwtFunction = require('../controllers/jwtControllers');
const usersFunctions = require('../controllers/usersController');
/** Get all Users */
router.get('/users', usersFunctions.getAllUsers);

/** Create new User */
router.post('/register', authController.createNewUser);

/** User Login */
router.post('/login', authController.login);

/** Get one user */
router.post('/user', usersFunctions.getOneUser);



module.exports = router;