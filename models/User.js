
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  profileImage: {
    type: String,
    default: 'profile-images/default-profile-picture.jpeg'
  }
});


UserSchema.statics.authenticate = (email, password, callback) => {
    User.findOne({email: email}).exec((error, user) => {
        console.log(user);
    });
}

const User = mongoose.model('User', UserSchema);

module.exports = User;