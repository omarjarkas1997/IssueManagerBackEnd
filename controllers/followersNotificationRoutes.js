const FollowersNotification = require('../models/followers-notifications');


createNewNotification = async (req, res, next) => {
    const { issuerId, followersId } = req.body;
    if (issuerId && followersId) {
        FollowersNotification.create(req.body, (err, result) =>{
            console.log(result);
            res.json(result); 
        });
    } else {
        var error = new Error('Required feilds are missing!');
        error.status = 422; /** Unprocessable entity */
        next(error);
    }
}

/** GET: all conversation in the DB */
getUserTodo = (req, res, next) => {
    try {
        const { userID } = req.params;
        if (userID) {
            Todo.find({ followersId: { "$in": [userID]} }).exec((err, result) => {
                if (err) {
                    console.log("ERROR in the FINDONE method in the createNewTodo");
                }
                res.json(result);
            });
        } else {
            var error = new Error('Required feilds are missing!');
            error.status = 422; /** Unprocessable entity */
            next(error);
        }
    } catch (error) {
        next(error);
    }
}




module.exports = {
    createNewNotification
}