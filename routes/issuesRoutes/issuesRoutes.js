const router = require('express').Router();
const issuesControllers = require('../../controllers/issuesControllers');

/** Get all issues */
router.get('/', issuesControllers.getAllIssue);

/** Create new issue */
router.post('/new-issue', issuesControllers.createNewIssue);


module.exports = router;