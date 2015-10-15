var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/visualmenu');

mongoose.connection.on('open', function(){
  mongoose.connection.db.dropDatabase(function (err) {
    console.log('Database dropped successfully.');

    var Restaurant = mongoose.model('restaurant', {
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

    restaurants.push({
      name: "HELLO",
      location: {
        address: "555 HELLO ST. WA, Seattle"
      }
    });

    restaurants.push({
      name: "GOODBYE",
      location: {
        address: "666 GOODBYE ST. WA, Seattle"
      }
    });

    restaurants.push({
      name: "YES",
      location: {
        address: "777 YO AVE. WA, SEATTLE"
      }
    });

    Restaurant.collection.insert(restaurants, function(err, res) {
      console.log("Error:", err);
      console.log("Result:", res);

      mongoose.connection.close();
    });
  });
});
