var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantSchema = new Schema({
  name: String,
  menu: [{ name: String, image: String }]
})

module.exports = mongoose.model('restaurants', restaurantSchema);
