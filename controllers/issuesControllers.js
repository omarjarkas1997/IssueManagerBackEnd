const Issue = require('../models/issues');
const jwtFunctions = require('./jwtControllers');

createNewIssue = async (req, res, next) => {
    const { issueName, impact, status, severity, personResponsible, followupDate, deadlineDate, description } = req.body;
    const tokenDecodedObject = JSON.parse(JSON.stringify(jwtFunctions.parseJwt(req.headers.authorization, next)));
    if (tokenDecodedObject.id && tokenDecodedObject.firstName && tokenDecodedObject.lastName) {
        if(issueName){
            const newIssue = {
                IssueLogger: {
                    id: tokenDecodedObject.id
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

getAllIssue = async (req, res, next) => {
    try {
        Issue.find({}, (err, issues) => {
            if(err) {
                return next(err);
            }
            if(issues.length == 0){
                var err = new Error('No Issue found in the database yet.');
                err.status = 400;
                return next(err);
            }
            res.json(issues);
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createNewIssue,
    getAllIssue
}