const router = require('express').Router();
const authController = require('../../controllers/authControllers');
const jwtFunctions = require('../../controllers/jwtControllers');


/** Create new User */
router.post('/register', authController.createNewUser);

/** User Login */
router.post('/login', authController.login);

/** Revoke Token */
router.get('/users/revoke-token', verifyToken, (req, res) => {
    res.cookie("logged", JSON.stringify(true), { maxAge: 1000 }, {signed: true});     
    res.json({ token : "Helo"});
});




module.exports = router;