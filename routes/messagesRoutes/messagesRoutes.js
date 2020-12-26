const router = require('express').Router();
const messagesFunctions = require('../../controllers/messageController');


/** Get all sent messages */
router.get('/sent/:senderID', messagesFunctions.getAllSentMessages);

/** Get all recieved messages */
router.get('/recieved/:recipientID', messagesFunctions.getAllRecievedMessages);

/** Get two parties conversation */
router.get('/conversation/:senderID/:recipientID', messagesFunctions.getTwoPartiesConversation);

/** Create a new message with id params as sender */
router.post('/create/:senderID', messagesFunctions.createANewMessage);


module.exports = router;