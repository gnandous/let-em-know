// ******************************* INFORMATION ***************************//

// ***********************************************************************//
//
// ** UserModel.js - Implements Model
// ** @return   User model.
//
// ***********************************************************************//

// ********************************** START ******************************//


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var crypto = require('crypto');

var User = new Schema({

  firstname: String,
  lastname: String,
  avatar: String,
  pseudo: {
    type: String,
    required: true
  },
  token:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: String

});

// Model::Statics Methods implements

User.statics.ifexist = function(data, callback){
  this.findOne({ email: data.email }, function(err, user){
    callback(err, user);
  });
}

User.statics.generateToken = function(){
  return(crypto.randomBytes(16).toString('hex'));
}

// Model::Methods implements

User.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err){
      return callback(err, null);
    }
    else
      return callback(null, isMatch);
  });
}

module.exports = mongoose.model('User', User);
