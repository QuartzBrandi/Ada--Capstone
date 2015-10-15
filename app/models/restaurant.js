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

mongoose.connect('mongodb://localhost/visualmenu');
// mongoose.db.dropDatabase();

// mongoose.connection.collections['visualmenu'].drop( function(err) {
//     console.log('collection dropped');
// });

mongoose.connection.on('open', function(){
  mongoose.connection.db.dropDatabase(function (err) {
    console.log('db dropped');
    // process.exit(0);
    mongoose.connection.close();

  });
});

//
// var Restaurant = mongoose.model('Restaurant', {
//   name: String,
//   location: {
//     address: String,
//     last_updated: Date
//   },
//   menu: {
//     items: [{
//       name: String,
//       images: [{
//         origin: String,
//         url: String,
//         date_created: Date,
//         date_modified: Date
//       }],
//       date_created: Date,
//       date_modified: Date
//     }],
//     last_updated: Date
//   }
// });
//
// var restaurants = []
//
// restaurants.push({
//   name: "HELLO",
//   location: {
//     address: "555 HELLO ST. WA, Seattle"
//   }
// });
//
// restaurants.push({
//   name: "GOODBYE",
//   location: {
//     address: "666 GOODBYE ST. WA, Seattle"
//   }
// });
//
// Restaurant.collection.insert(restaurants, function(err, r) {
//   console.log(err);
//   console.log(r);
//
  // mongoose.connection.close();
// });
