const express = require('express');
const router = express.Router();
const AuthRoutes = require('./authRoutes/authRoutes');
const IssuesRoutes = require('./issuesRoutes/issuesRoutes');
const UsersRoutes = require('./usersRoutes/usersRoutes');

/** Auth and Users Routes */
router.use('/', AuthRoutes);

/** Users Routes */
router.use('/users', UsersRoutes);

/** Issues Routes */
router.use('/issues', IssuesRoutes);

module.exports = router;