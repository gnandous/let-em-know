/**
 * Created by gladisk on 12/6/14.
 */
// ******************************* INFORMATION ***************************//

// ***********************************************************************//
//
// ** TalentModel.js - Implements Model
// ** @return   Talent model.
//
// ***********************************************************************//

// ********************************** START ******************************//

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Talent = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String
});

// Model::Statics Methods implements

Talent.statics.exist = function(newTalentName){
    this.findOne({ name: newTalentName }, function(err, talent){
        if (err)
            return false;
        return true;
    });
}
module.exports = mongoose.model('Talent', Talent);