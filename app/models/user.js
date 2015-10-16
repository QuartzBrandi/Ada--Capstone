var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  images: [{
    restaurant: String,
    menuitem: String,
    url: String
  }]
})

module.exports = mongoose.model('User', userSchema);
