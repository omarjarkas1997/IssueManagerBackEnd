const mongoose = require('mongoose');


const UserMessageSchema = new mongoose.Schema({
    recipientID: {
        type: String,
        required: true,
        trim: true,
    },
    senderID: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


var UserMessage = mongoose.model('UserMessage', UserMessageSchema);


module.exports = UserMessage;