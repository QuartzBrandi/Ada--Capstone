// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
//
// var restaurantSchema = new Schema({
//   name: String,
//   menu: [{ name: String, image: String }]
// })
//
// module.exports = mongoose.model('restaurants', restaurantSchema);


var mongoose = require('mongoose');
connect = mongoose.connect('mongodb://localhost/visualmenu');
var assert = require('assert');

// connect.connection.db.dropDatabase();

var Restaurant = mongoose.model('Restaurant', {
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

var restaurants = []

restaurants.push(new Restaurant({
  name: "HELLO",
  location: {
    address: "555 HELLO ST. WA, Seattle"
  }
}));

restaurants.push(new Restaurant({
  name: "GOODBYE",
  location: {
    address: "666 GOODBYE ST. WA, Seattle"
  }
}));

for (i = 0; i < restaurants.length; i++) {
  restaurants[i].save(function (err) {
    if (err) {
      console.log("Restaurant", i, ":", err);
    }
  });
}

// var CategoryModel = mongoose.model('Category');

// var data = [
//   { 'name' : 'Barcelona' },
//   { 'name' : 'Real Madrid' },
//   { 'name' : 'Valencia' }
// ];

// Restaurant.collection.insert(data, function(err, r) {
//   console.log(err);
//   console.log(r);
//
//   mongoose.connection.close();
// })

// exports.seedCategories = function seedCategories() {
//   Restaurant.find({}).exec(function (err, collection) {
//       if (collection.length === 0) {
//           Restaurant.create({ name: 'Hello' });
//           Restaurant.create({ name: 'Goodbye' });
//       }
//   });
// }


mongoose.connection.close();
