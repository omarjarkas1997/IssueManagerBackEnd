const express = require('express');
const Issue = require('../models/issues');
const router = express.Router();
const AuthRoutes = require('./authRoutes/authRoutes');
const IssuesRoutes = require('./issuesRoutes/issuesRoutes');


/** Auth and Users Routes */
router.use('/', AuthRoutes);

/** Issues Routes */
router.use('/issues', IssuesRoutes)



module.exports = router;