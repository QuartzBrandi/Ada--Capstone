var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  username: String,
  images: [{
    restaurant: String,
    menuitem: String,
    url: String
  }]
})

module.exports = mongoose.model('user', userSchema);
