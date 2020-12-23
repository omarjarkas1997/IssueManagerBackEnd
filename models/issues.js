'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var IssueSchema = new Schema({
    IssueLogger: {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        profileImage: {
          type: String,
          default: 'profile-images/default-profile-picture.jpeg'
        }
    },
    issueName:{
        type: String,
        required: true,
        trim: true,
    },
    impact: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        required: true,
    },
    severity: {
        type: String,
        required: true,
    },
    personResponsible: {
        type: Object,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    /** Deadline set to 7 week by default */
    followupDate: {
        type: Date,
        default: new Date(+new Date() + 7*24*60*60*1000)
    },
    /** Deadline set to 2 weeks by default */
    deadlineDate: {
        type: Date,
        default: new Date(+new Date() + 14*24*60*60*1000)
    },
    description: {
        type: String,
        trim: true
    }    
});


IssueSchema.statics.findStatus = function(status, callback) {
    // this == issue
    return this.find({status: status}, callback);
}

IssueSchema.statics.findSeverity = function(severity, callback) {
    // this == issue
    return this.find({severity: severity}, callback);
}

IssueSchema.statics.findIssuesByUserId = function(id, callback) {
    // this == issue
    return this.find({'issueLogger.id': id}, callback);
}

// return the set of status of the same kind of a particular user
IssueSchema.methods.findStatusOfUserIssues = function(status, callback) {
    // this == document not animal
    // we must specific animal
    return this.model('Issue').find({status: status}, callback);
}

var Issue = mongoose.model('Issue', IssueSchema);

module.exports = Issue;