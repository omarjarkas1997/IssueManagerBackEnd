const router = require('express').Router();
const messagesFunctions = require('../../controllers/messageController');




// Conversation /

/** Create one conversation or an empty object */
router.get('/user/:recipientID/:senderID', messagesFunctions.getConversation);

/** Create a new message with id params as sender */
router.post('/create/:recipientID', messagesFunctions.newConversation);


/** Get new conversation or create it with empty messages if it doesn't exist */
router.post('/createEmpty/:recipientID', messagesFunctions.getConversationOrCreateAnEmptyConversation);

/** Create a new message with id params as sender */
router.get('/user/:userID', messagesFunctions.getAllUserConversations);

/** Get two parties conversation */
router.get('/all', messagesFunctions.getAllConversations);


module.exports = router;