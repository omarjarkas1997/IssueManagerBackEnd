const User = require('../models/User');
const jwtFunctions = require('./jwtControllers');

/** Create a New User Account */
createNewUser = async (req, res, next)=>{
    try {
        
        const { email, password, firstName, lastName } = req.body;
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
                    const token = jwtFunctions.generateJwtToken(user._id, user.firstName, user.lastName);
                    const returnedUser = {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        profileImage: user.profileImage,
                        token: token
                    };
                    res.cookie('currentUser', JSON.stringify(returnedUser), { maxAge: 1000 * 60 * 20 });
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
}

/** Authentication user email on database */
login = async (req, res, next)=>{
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
}

/** Get: All Users   */
getAllUsers = async (req,res,next) => {
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
}



module.exports = {
    createNewUser,
    login,
    getAllUsers
}


