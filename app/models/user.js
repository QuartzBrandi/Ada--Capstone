var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  google_id_token: String,
  username: String,
  images: [{
    restaurant: String,
    menuitem: String,
    url: String
  }]
})

module.exports = mongoose.model('User', userSchema);
