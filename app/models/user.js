var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  username: String,
  images: [{
    restaurant: String,
    restaurant_id: String,
    menu: String,
    menu_section: String,
    menu_subsection: String,
    menu_item: String,
    url: String
  }]
})

module.exports = mongoose.model('user', userSchema);
