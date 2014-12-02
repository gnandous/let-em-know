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

var User = new Schema({

  firstname: String,
  lastname: String,
  avatar: String,
  pseudo: String,
  email: String,
  password: String

});

// Model::Statics Methods implements

User.statics.ifexist = function(data, callback){
  this.findOne({ email: data.email }, function(err, user){
    callback(err, user);
  });
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
