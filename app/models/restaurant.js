var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantSchema = new Schema({
  name: String,
  location: {
    address: String,
    last_updated: Date
  },
  menu: {
    items: [{
      name: String,
      images: [{
        origin: String,
        user: String,
        user_id: String,
        url: String,
        date_created: Date,
        date_modified: Date
      }],
      date_created: Date,
      date_modified: Date
    }],
    last_updated: Date
  }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
