const { route } = require('../routes');

const router = require('express').Router();
const authController = require('../../controllers/authControllers');
const usersFunctions = require('../../controllers/usersController');

/** Get all Users */
router.get('/users', usersFunctions.getAllUsers);

/** Create new User */
router.post('/register', authController.createNewUser);

/** User Login */
router.post('/login', authController.login);

/** Get one user */
router.post('/user', usersFunctions.getOneUser);

module.exports = router;