const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    authorID: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});


const ConversationSchema = new mongoose.Schema({
    members: {
        type: [String],
        required: true,
        trim: true,
    },
    messages: [MessageSchema]
});






var Conversation = mongoose.model('Conversation', ConversationSchema);


module.exports = Conversation;



// const mongoose = require('mongoose');


// const UserMessageSchema = new mongoose.Schema({
//     recipientID: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     senderID: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     message: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });


// var UserMessage = mongoose.model('UserMessage', UserMessageSchema);


// module.exports = UserMessage;