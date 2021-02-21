const Conversation = require('../models/UserMessages');
const UserMessage = require('../models/UserMessages');
const convoFunctions = require('../helper/convoFunctions');

// UserMessage.watch().on('change', data => {
//     console.log("The change is ");
//     console.log(data);
// });


/** Create a new conversation between two parties */
newConversation = (req, res, next) => {
    try {
        const { recipientID } = req.params;
        const { authorID, body } = req.body;
        if (authorID && recipientID && body) {
            convoFunctions.createConvoOrAddMessageREST(authorID, recipientID, body, res, next);
        } else {
            var error = new Error('Required feilds are missing!');
            error.status = 422; /** Unprocessable entity */
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

/** GET: all conversation in the DB */
getAllConversations = (req, res, next) => {
    try {
        UserMessage.find({}, (err, convo) => {
            res.json(convo);
        });
    } catch (error) {
        next(error);
    }
}


/** GET: all conversation in the DB */
getAllUserConversations = (req, res, next) => {
    try {
        const { userID } = req.params;
        if (userID) {
            UserMessage.find({ members: userID }, (err, convo) => {
                res.json(convo);
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

/** GET: all conversation in the DB */
getConversation = (req, res, next) => {
    try {
        const { recipientID, senderID } = req.params;
        if (recipientID && senderID) {
            const newConvo = {
                members: [senderID, recipientID],
                messages: []
            };
            UserMessage.findOne({ members: { $all: [recipientID, senderID] } }, (err, convo) => {
                if (err) {
                    return next(err);
                }
                if (convo) {
                    res.json(convo);
                } else {
                    res.json(newConvo);
                }
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

/** 
 * This is when open a new contact and you want to create and return an conversation
 * with no body in it
 */
getConversationOrCreateAnEmptyConversation = (req, res, next) => {
    try {
        const { recipientID } = req.params;
        const { authorID } = req.body;
        console.log(req.body);
        if (authorID && recipientID) {
            convoFunctions.createOrGetConvo(authorID, recipientID, res, next);
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
    newConversation,
    getAllConversations,
    getAllUserConversations,
    getConversation,
    getConversationOrCreateAnEmptyConversation
}