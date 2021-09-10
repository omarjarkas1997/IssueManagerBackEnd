const router = require('express').Router();
const jwtFunctions = require('../../controllers/jwtControllers');
const User = require('../../models/User');


/** Get all users */
router.get('/all-users', jwtFunctions.verifyTokenAdmin, async (req,res,next) => {
    try {
        User.find({}, (err, users) => {
            if(err) {
                return next(err);
            }
            if(users.length == 0){
                var err = new Error('No users found in the database yet.');
                err.status = 400;
                return next(err);
            }
            res.json(users);
        });
    } catch (error) {
        next(error);
    }
});

/** Create new Admin */
router.post('/register-admin', async (req, res, next)=>{
    try {
        console.log(req.body);
        
        const { id, email, password, firstName, lastName } = req.body;
        if(email && password && firstName && lastName) {
            /** Creating an object to insert in the DB */
            const UserDetails = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };
            /** Get users from DB */
            User.create(UserDetails, (err, user) => {
                if (err) {
                    const error = JSON.parse(JSON.stringify(err));
                    /** Getting code 11000 which signals email already exists */ 
                    const { code } = error;
                    console.log(code);
                    if (code === 11000){
                        const error = new Error("User already exists!");
                        error.status = 400;
                        return next(error);
                    } 
                    next(err);
                } else {
                    const token = jwtFunctions.generateJwtTokenAdmin('1234', user.firstName, user.lastName);
                    const returnedUser = {
                        // id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        profileImage: user.profileImage,
                        token: token
                    };
                    console.log(returnedUser);
                    res.cookie("currentUser", JSON.stringify(returnedUser), { maxAge: 1000 * 60 * 20 });
                    return res.json(returnedUser);
                }
            });
        } else {
            var err = new Error("Missing feild in the register form");
            err.status = 400;
            next(err);
        }
    } catch (error) {
        res.status = error.status;
        res.json({
            message: error.message
        });
    }
});

/** Create new User */
router.post('/register', async (req, res, next)=>{
    try {
        console.log(req.body);
        
        const { id, email, password, firstName, lastName } = req.body;
        if(email && password && firstName && lastName) {
            /** Creating an object to insert in the DB */
            const UserDetails = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };
            /** Get users from DB */
            User.create(UserDetails, (err, user) => {
                if (err) {
                    const error = JSON.parse(JSON.stringify(err));
                    /** Getting code 11000 which signals email already exists */ 
                    const { code } = error;
                    console.log(code);
                    if (code === 11000){
                        const error = new Error("User already exists!");
                        error.status = 400;
                        return next(error);
                    } 
                    next(err);
                } else {
                    const token = jwtFunctions.generateJwtToken('1234', user.firstName, user.lastName);
                    const returnedUser = {
                        // id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        profileImage: user.profileImage,
                        token: token
                    };
                    console.log(returnedUser);
                    res.cookie("currentUser", JSON.stringify(returnedUser), { maxAge: 1000 * 60 * 20 });
                    return res.json(returnedUser);
                }
            });
        } else {
            var err = new Error("Missing feild in the register form");
            err.status = 400;
            next(err);
        }
    } catch (error) {
        res.status = error.status;
        res.json({
            message: error.message
        });
    }
});

/** User Login */
router.post('/login', async (req, res, next)=>{
    try {
        const { email, password } = req.body;
        if(email && password) {
            /** Get users from DB */
            User.findOne({ email: email}, (err, user) => {
                if (err) {
                    next(err);
                } else if (user) {
                    if(user.password === password){
                        const token = jwtFunctions.generateJwtToken(user._id, user.firstName, user.lastName);
                        console.log(user);
                        const returnedUser = {
                            id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            profileImage: user.profileImage,
                            token: token
                        };
                        // 24 * 60 * 60 * 1000 --- 24 hours
                        res.cookie("currentUser", JSON.stringify(returnedUser), { maxAge: 1000 * 60 * 20 });
                        res.json(returnedUser);
                    } else {
                        var Err = new Error('Password incorrect');
                        Err.status = 401;
                        next(Err);
                    }
                } else {
                    var Err = new Error('User doesn\'t exist');
                    Err.status = 400;
                    next(Err);
                }
            });
        } else {
            var err = new Error("Missing feild in the register form");
            err.status = 400;
            next(err);
        }
    } catch (error) {
        res.status = error.status;
        res.json({
            message: error.message
        });
    }
});

/** Revoke Token */
router.get('/users/revoke-token', verifyToken, (req, res) => {
    res.cookie("logged", JSON.stringify(true), { maxAge: 1000 }, {signed: true});     
    res.json({ token : "Helo"});
});




module.exports = router;