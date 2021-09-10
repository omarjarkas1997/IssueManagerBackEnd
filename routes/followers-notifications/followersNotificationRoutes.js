const router = require('express').Router();
const followerNotificationController = require('../../controllers/followersNotificationRoutes');



/** get new notification */
router.get('/:userID', followerNotificationController.createNewNotification);


/** Create new notification */
router.post('/create-new', followerNotificationController.createNewNotification);



module.exports = router;