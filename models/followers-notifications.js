'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FollowersNotificationSchema = new Schema({
    issuerId:{
        type: String,
        required: true,
        trim: true,
    },
    followersId:{
        type: [String],
        required: true,
        trim: true,
    },
});


var FollowersNotification = mongoose.model('FollowersNotificationSchema', FollowersNotificationSchema);

module.exports = FollowersNotification;