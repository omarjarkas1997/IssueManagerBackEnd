const User = require('../models/User');

module.exports.getAllUsers = async (req,res,next) => {
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
            var adjustedUsers = [];
            users.forEach(user => {
                var adjustedUser = {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                };
                adjustedUsers.push(adjustedUser);
            })
            res.json(adjustedUsers);
        });
    } catch (error) {
        next(error);
    }
}

module.exports.getOneUser = async (req,res, next) => {
    try {
        const {email, id } = req.body;
        if(email) {
            User.findOne({email, email}, (err, user) => {
                if(err){
                    return next(err);
                }
                if(user){
                    res.json({
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    });
                } else {
                    const error = new Error('User not Found');
                    error.status = 404;
                    next(error);
                }
            });
        } else if (id) {
            const user = await records.getUsersById(req.body.id);
            res.json({user})
        } else {
            var err = new Error("No username or id in the req body!");
        }
    } catch (error) {
        next(error);
    }
}