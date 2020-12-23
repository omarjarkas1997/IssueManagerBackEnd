const router = require('express').Router();
const issuesControllers = require('../../controllers/issuesControllers');


/** Get all issues */
router.get('/', issuesControllers.getIssues);

/** Get issues logged by specified user */
router.get('/logged/:id', issuesControllers.getIssueLoggedByUser);

/** Get issues followed by specified user */
router.get('/followed/:id', issuesControllers.getIssuesFollowedByUser);

/** Create new issue */
router.post('/new-issue', issuesControllers.createNewIssue);

/** Update Status */
router.put('/update-status', issuesControllers.updateIssueStatus);

/** Update Status */
router.put('/update-severity', issuesControllers.updateIssueSeverity);

/** Get Issue by name */
router.get('/issue-name', issuesControllers.getIssueByName);





module.exports = router;