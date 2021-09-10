const express = require('express');
const router = express.Router();
const AuthRoutes = require('./authRoutes/authRoutes');
const IssuesRoutes = require('./issuesRoutes/issuesRoutes');
const UsersRoutes = require('./usersRoutes/usersRoutes');
const MessagesRoutes = require('./messagesRoutes/messagesRoutes');
const TodoRouters = require('./todoRoutes/todoRoutes');
const FollowersNotificationRouter = require('./followers-notifications/followersNotificationRoutes');


/** Auth and Users Routes */
router.use('/', AuthRoutes);

/** Users Routes */
router.use('/users', UsersRoutes);

/** Issues Routes */
router.use('/issues', IssuesRoutes);


/** Conversation Routes */
router.use('/conversation', MessagesRoutes);


/** Todo Routes */
router.use('/todo', TodoRouters);


/** Followers Notification Routes */
router.use('/followers-notification', FollowersNotificationRouter);

module.exports = router;