var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantSchema = new Schema({
  name: String,
  address: {
    street_address: String,
    city: String,
    state: String,
    zip_code: String,
    country: String
  },
  address_full: String,
  menus: [{
    menu_name: String,
    sections: [{
      section_name: String,
      subsections: [{
        subsection_name: String,
        items: [{
          item: String,
          images: [{
            origin: String,
            suborigin: String,
            user: String,
            user_id: String,
            url: String,
            file: String,
            date_created: Date,
            date_modified: Date
          }]
        }]
      }]
    }]
  }],
  menu_origin: String,
  last_updated: Date
});

module.exports = mongoose.model('restaurant', restaurantSchema);
