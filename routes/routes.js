const express = require('express');
const router = express.Router();
const AuthRoutes = require('./authRoutes/authRoutes');
const IssuesRoutes = require('./issuesRoutes/issuesRoutes');
const UsersRoutes = require('./usersRoutes/usersRoutes');
const MessagesRoutes = require('./messagesRoutes/messagesRoutes');
/** Auth and Users Routes */
router.use('/', AuthRoutes);

/** Users Routes */
router.use('/users', UsersRoutes);

/** Issues Routes */
router.use('/issues', IssuesRoutes);


/** Issues Routes */
router.use('/messages', MessagesRoutes);

module.exports = router;