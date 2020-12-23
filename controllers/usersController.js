const e = require('express');
const User = require('../models/User');

getAllUsers = async (req, res, next) => {
    try {
        User.find({}, (err, users) => {
            if (err) {
                return next(err);
            }
            if (users.length == 0) {
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
                    email: user.email,
                    profileImage: user.profileImage
                };
                adjustedUsers.push(adjustedUser);
            })
            res.json(adjustedUsers);
        });
    } catch (error) {
        next(error);
    }
}

getOneUser = async (req, res, next) => {
    try {
        const { email, id } = req.body;
        const idParams = req.params.id;
        if (email) {
            User.findOne({ email: email }, (err, user) => {
                if (err) {
                    return next(err);
                }
                if (user) {
                    res.json({
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        profileImage: user.profileImage
                    });
                } else {
                    const error = new Error('User not Found');
                    error.status = 404;
                    next(error);
                }
            });
        } else if (id) {
            User.findById(id, (err, user) => {
                if (err) {
                    return next(err);
                }
                if (user) {
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
        } else if (idParams) {
            User.findById(idParams, (err, user) => {
                if (err) {
                    return next(err);
                }
                if (user) {
                    res.json({
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        profileImage: user.profileImage
                    });
                } else {
                    const error = new Error('User not Found');
                    error.status = 404;
                    next(error);
                }
            });
        } else {
            var err = new Error("No username or id in the req body!");
            err.status = 401;
            next(err);
        }
    } catch (error) {
        next(error);
    }
}

updateProfileImage = async (req, res, next) => {
    try {
        const { id } = req.params;
        User.findById(id, (err, user) => {
            if (err) {
                next(err);
            }
            if (user) {
                user.profileImage = 'profile-images\\'+req.params.id+'-'+req.file.originalname;
                user.save();
                res.json(user);
            } else {
                var error = new Error('User not found!');
                error.status = 403;
                next(error);
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    updateProfileImage
}