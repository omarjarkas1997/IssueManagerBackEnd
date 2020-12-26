const UserMessage = require('../models/UserMessages');


UserMessage.watch().on('change', data => {
    console.log("The change is ");
    console.log(data);
});

/** GET: All messages of a single users */
getAllSentMessages = (req, res, next) => {
    try {
        const senderID = req.params.senderID;
        if (senderID) {
            UserMessage.find({ senderID: senderID }, (err, messages) => {
                if (err) {
                    return next(error);
                }
                return res.json(messages);
            }).sort({ createdAt: -1 });
        } else {
            var error = new Error('Required feilds are missing!');
            error.status = 422; /** Unprocessable entity */
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

/** GET: All messages of a single users */
getAllRecievedMessages = (req, res, next) => {
    try {
        const recipientID = req.params.recipientID;
        if (recipientID) {
            UserMessage.find({ recipientID: recipientID }, (err, messages) => {
                if (err) {
                    return next(error);
                }
                return res.json(messages);
            }).sort({ createdAt: -1 });
        } else {
            var error = new Error('Required feilds are missing!');
            error.status = 422; /** Unprocessable entity */
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

/** GET: All messages between two people */
getTwoPartiesConversation = (req, res, next) => {
    try {
        const recipientID = req.params.recipientID;
        const senderID = req.params.senderID;
        if (recipientID && senderID) {
            UserMessage.find({ recipientID: recipientID, senderID: senderID }, (err, messages) => {
                if (err) {
                    return next(error);
                }
                return res.json(messages);
            }).sort({ createdAt: -1 });
        } else {
            var error = new Error('Required feilds are missing!');
            error.status = 422; /** Unprocessable entity */
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

/** POST: Create a new message with a sender and a recipient */
createANewMessage = (req, res, next) => {
    try {
        const senderID = req.params.senderID;
        const recipientID = req.body.recipientID;
        const message = req.body.message;
        if (senderID && recipientID && message) {
            const newMessage = {
                recipientID: recipientID,
                senderID: senderID,
                message: message
            };
            UserMessage.create(newMessage, (err, messages) => {
                if (err) {
                    return next(error);
                }
                return res.json(messages);
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
    createANewMessage,
    getAllSentMessages,
    getAllRecievedMessages,
    getTwoPartiesConversation
}