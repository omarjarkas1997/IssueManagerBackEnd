const e = require('express');
const Issue = require('../models/issues');
const jwtFunctions = require('./jwtControllers');




/** GET: Issues all if status and severity not specified */
getIssues = async (req, res, next) => {
    try {
        const { status, severity } = req.query;
        if (status && severity) {
            Issue.find({ status: status, severity: severity }, (err, issues) => {
                if (err) {
                    return next(err);
                }
                if (issues.length == 0) {
                    return res.json([]);
                }
                res.json(issues);
            }).sort({ createdAt: -1 });;
        } else if (status) {
            Issue.find({ status: status }, (err, issues) => {
                if (err) {
                    return next(err);
                }
                if (issues.length == 0) {
                    return res.json([]);
                }
                res.json(issues);
            }).sort({ createdAt: -1 });;
        } else if (severity) {
            Issue.find({ severity: severity }, (err, issues) => {
                if (err) {
                    return next(err);
                }
                if (issues.length == 0) {
                    return res.json([]);
                }
                res.json(issues);
            }).sort({ createdAt: -1 });;
        } else {
            Issue.find({ status: { $ne: "closed" } }, (err, issues) => {
                if (err) {
                    return next(err);
                }
                if (issues.length == 0) {
                    return res.json([]);
                }
                res.json(issues);
            }).sort({ createdAt: -1 });;
        }
    } catch (error) {
        next(error);
    }
}

/** GET: issues logged by a specified user */
getIssueLoggedByUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, severity } = req.query;
        if (id) {
            if (status && severity) {
                Issue.find({ 'IssueLogger.id': id, status: status, severity: severity }, (err, issues) => {
                    if (err) {
                        return next(err);
                    }
                    if (issues.length == 0) {
                        return res.json([]);
                    }
                    res.json(issues);
                }).sort({ createdAt: -1 });;
            } else if (status) {
                Issue.find({ 'IssueLogger.id': id, status: status }, (err, issues) => {
                    if (err) {
                        return next(err);
                    }
                    if (issues.length == 0) {
                        return res.json([]);
                    }
                    res.json(issues);
                }).sort({ createdAt: -1 });;
            } else if (severity) {
                Issue.find({ 'IssueLogger.id': id, severity: severity, status: { $ne: "closed" } }, (err, issues) => {
                    if (err) {
                        return next(err);
                    }
                    if (issues.length == 0) {
                        return res.json([]);
                    }
                    res.json(issues);
                }).sort({ createdAt: -1 });;
            } else {
                Issue.find({ 'IssueLogger.id': id, status: { $ne: "closed" } }, (err, issues) => {
                    if (err) {
                        next(err);
                    }
                    if (issues.length == 0) {
                        return res.json([]);
                    } else if (issues) {
                        res.json(issues);
                    } else {
                        var error = new Error('Issue for specified logger not found in the db!');
                        error.status = 404;
                        next(error);
                    }
                }).sort({ createdAt: -1 });;
            }
        } else {
            var error = new Error('Router id paramter not found!');
            error.status = 404;
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

/** GET: issues logged by the user */
getIssuesFollowedByUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, severity } = req.query;
        if (id) {
            if (status && severity) {
                Issue.find({ 'personResponsible.id': id, status: status, severity: severity }, (err, issues) => {
                    if (err) {
                        return next(err);
                    }
                    if (issues.length == 0) {
                        return res.json([]);
                    }
                    res.json(issues);
                }).sort({ createdAt: -1 });;
            } else if (status) {
                Issue.find({ 'personResponsible.id': id, status: status }, (err, issues) => {
                    if (err) {
                        return next(err);
                    }
                    if (issues.length == 0) {
                        return res.json([]);
                    }
                    res.json(issues);
                }).sort({ createdAt: -1 });;
            } else if (severity) {
                Issue.find({ 'personResponsible.id': id, severity: severity, status: { $ne: "closed" } }, (err, issues) => {
                    if (err) {
                        return next(err);
                    }
                    if (issues.length == 0) {
                        return res.json([]);
                    }
                    console.log(issues);
                    res.json(issues);
                }).sort({ createdAt: -1 });;
            } else {
                Issue.find({ 'personResponsible.id': id, status: { $ne: "closed" } }, (err, issues) => {
                    if (err) {
                        next(err);
                    }
                    if (issues.length == 0) {
                        return res.json([]);
                    } else if (issues) {
                        res.json(issues);
                    } else {
                        var error = new Error('Issue for specified logger not found in the db!');
                        error.status = 404;
                        next(error);
                    }
                }).sort({ createdAt: -1 });
            }
        } else {
            var error = new Error('Router id paramter not found!');
            error.status = 404;
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

/** POST: Create a new issues */
createNewIssue = async (req, res, next) => {
    const { issueName, impact, status, severity, personResponsible, followupDate, deadlineDate, description } = req.body;
    const tokenDecodedObject = JSON.parse(JSON.stringify(jwtFunctions.parseJwt(req.headers.authorization, next)));
    if (tokenDecodedObject.id && tokenDecodedObject.firstName && tokenDecodedObject.lastName) {
        if (issueName) {
            const newIssue = {
                IssueLogger: {
                    id: tokenDecodedObject.id,
                    name: tokenDecodedObject.firstName + " " + tokenDecodedObject.lastName
                },
                issueName: issueName,
                impact: impact,
                status: status,
                severity: severity,
                personResponsible: personResponsible,
                followupDate: followupDate,
                deadlineDate: deadlineDate,
                description: description
            };
            Issue.create(newIssue, (err, issue) => {
                if (err) {
                    console.log("Im here");
                    return next(error);
                }
                res.json(issue);
            });
        } else {
            var error = new Error("Mandatory Issue Feilds are missing!");
            error.status = 406;
            next(error);
        }
    } else {
        var error = new Error("JWT not Found!");
        error.status = 401;
        next(error);
    }
}

/** UPDATE: status for a specified issues*/
updateIssueStatus = async (req, res, next) => {
    try {
        const { id, status } = req.body;
        if (id && status) {
            Issue.findById(id, (err, issue) => {
                if (err) {
                    next(err);
                }
                if (issue) {
                    const oldStatus = issue.status;
                    issue.status = status;
                    issue.save();
                    console.log("STATUS for issue ", id, ": changed from ", oldStatus, " to ", issue.status, ".");
                    res.json(issue);
                } else {
                    var error = new Error('Issue not found in the db!');
                    error.status = 404;
                    next(error);
                }
            });
        } else {
            var error = new Error('Feild missing in the request body!');
            error.status = 404;
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

/** UPDATE: severity for a specified issues*/
updateIssueSeverity = async (req, res, next) => {
    try {
        const { id, severity } = req.body;
        if (id && severity) {
            Issue.findById(id, (err, issue) => {
                if (err) {
                    next(err);
                }
                if (issue) {
                    const oldSeverity = issue.severity;
                    issue.severity = severity;
                    issue.save();
                    console.log("SEVERITY for issue ", id, ": changed from ", oldSeverity, " to ", issue.severity, ".");
                    res.json(issue);
                } else {
                    var error = new Error('Issue not found in the db!');
                    error.status = 404;
                    next(error);
                }
            });
        } else {
            var error = new Error('Feild missing in the request body!');
            error.status = 404;
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

/** GET: issue by name */

getIssueByName = async (req, res, next) => {
    try {
        const { name } = req.query;
        /** Search name against issueName, impact, severity, description and return 
         * a list of all matched 
         */
        if (name) {
            Issue.find({
                $or: [
                    { issueName: { $regex: new RegExp(name, "i") } },
                    { 'IssueLogger.name': { $regex: new RegExp(name, "i") } },
                    { impact: { $regex: new RegExp(name, "i") } },
                    { severity: { $regex: new RegExp(name, "i") } },
                    { description: { $regex: new RegExp(name, "i") } },
                ]
            }, (err, issues) => {
                if (err) {
                    next(err);
                }
                if (issues.length == 0) {
                    return res.json([]);
                }
                if (issues) {
                    res.json(issues);
                }
            });
        }
    } catch (error) {
        next(error);
    }
}


module.exports = {
    createNewIssue,
    getIssues,
    updateIssueStatus,
    updateIssueSeverity,
    getIssueLoggedByUser,
    getIssuesFollowedByUser,
    getIssueByName
}