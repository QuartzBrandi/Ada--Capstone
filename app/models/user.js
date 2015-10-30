var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  google_id: String,
  email: String,
  // name: String,
  username: String,
  images: [{
    restaurant: String,
    restaurant_id: String,
    menu: String,
    menu_index: Number,
    menu_section: String,
    menu_section_index: Number,
    menu_subsection: String,
    menu_subsection_index: Number,
    menu_item: String,
    menu_item_index: Number,
    url: String
  }]
})

module.exports = mongoose.model('user', userSchema);
