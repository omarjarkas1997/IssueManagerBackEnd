const UserMessage = require('../models/UserMessages');

/** Create a new convo between two parties with res.json */
createConvoOrAddMessageREST = (authorID, recipientID, body, res, next) => {
    /** To be appended to the an existing conversation */
    const newMessage = {
        authorID: authorID,
        body: body
    };
    /** To be added when there is no conversation between the two parties */
    const newConvo = {
        members: [authorID, recipientID],
        messages: [newMessage]
    };
    UserMessage.findOne({ members: { $all: [authorID, recipientID] } }, (err, convo) => {
        if (err) {
            return next(err);
        }
        if (convo) {
            convo.messages.push(newMessage);
            convo.save();
            return res.json(convo);
        } else {
            UserMessage.create(newConvo, (err, result) => {
                if (err) {
                    return next(err);
                }
                res.json(result);
            })
        }
    });
}

/** Create a new convo between two parties with res.json */
createOrGetConvo = (authorID, recipientID, res, next) => {
    /** To be added when there is no conversation between the two parties */
    const newConvo = {
        members: [authorID, recipientID],
        messages: []
    };
    UserMessage.findOne({ members: { $all: [authorID, recipientID] } }, (err, convo) => {
        if (err) {
            return next(err);
        }
        if (convo) {
            return res.json(convo);
        } else {
            UserMessage.create(newConvo, (err, result) => {
                if (err) {
                    return next(err);
                }
                res.json(result);
            });
        }
    });
}

/** Create a new convo between two parties with res.json */
createConvoOrAddMessage = (authorID, recipientID, body) => {
    /** To be appended to the an existing conversation */
    const newMessage = {
        authorID: authorID,
        body: body
    };
    /** To be added when there is no conversation between the two parties */
    const newConvo = {
        members: [authorID, recipientID],
        messages: [newMessage]
    };
    UserMessage.findOne({ members: { $all: [authorID, recipientID] } }, (err, convo) => {
        if (err) {
            console.log("ERROR in the FINDONE method in the Convofunction");
        }
        if (convo) {
            convo.messages.push(newMessage);
            convo.save();
            return convo;
        } else {
            UserMessage.create(newConvo, (err, result) => {
                if (err) {
                    console.log("ERROR in the CREATE method in the Convofunction");
                }
                return result;
            })
        }
    });
}

module.exports = {
    createConvoOrAddMessageREST,
    createConvoOrAddMessage,
    createOrGetConvo
}