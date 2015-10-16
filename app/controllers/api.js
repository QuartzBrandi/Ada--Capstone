"use strict";

var request = require('request');
var env = require('node-env-file');
env('config/.env');


var mongoose = require('mongoose');
var Restaurant = require('../models/restaurant');

function replaceSpacesWithPlusSign(theString) {
  var anArray = theString.split(" ");
  var newString = anArray.join("+");
  return newString;
};

exports.apiController = {
  // GET /api/search?name=xxx&location=xxx
  restaurantSearch: function(req, res) {
    var rawName = req.query.name;
    var name = replaceSpacesWithPlusSign(rawName);
    var location = req.query.location;
    var url =
      "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
      name + "+" + location + "&types=food&key=" +
      process.env.GOOGLE_BROWSER_API_KEY;

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var bodyParsed = JSON.parse(body);
        var resultsUnformatted = bodyParsed.results;
        var results = [];

        for (var i = 0; i < resultsUnformatted.length; i++) {
          var result = {};
          result["name"] = resultsUnformatted[i]["name"];
          result["address"] = resultsUnformatted[i]["formatted_address"];
          results.push(result);
        }

        return res.status(200).json(results);
      }
    });
  },

  // GET /api/search?name=xxx&location=xxx
  selectRestaurant: function(req, res) {
    // fetch the restaurant from mongodb
    // create the restaurant if it's not in the db
    var the_restaurant = req.query;
    delete the_restaurant['$$hashKey'];
    console.log("1", the_restaurant);

    mongoose.connect('mongodb://localhost/visualmenu');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
      var the_name = the_restaurant.name;
      Restaurant.findOne({ name: the_name, address: the_restaurant.address }, function(err, restaurant) {
        var eat_place = new Restaurant;
        eat_place.name = the_restaurant.name;
        eat_place.address = the_restaurant.address;

        console.log("err", err);
        console.log("2", restaurant);
        var test = restaurant;
        if (!test) {
          eat_place.save(function(err) {
            db.close();
            return res.status(200).json(the_restaurant);
          });
        }
        else {
          db.close();
          return res.status(200).json(the_restaurant);
        }
      });
    });
  },

  // GET /api/menu?restaurant=xxx

  // GET /api/images?restaurant=xxx&menuitem=xxx
  imageSearch: function(req, res) {
    console.log('got here')
    console.log(req)
    googleImage(req.query.restaurant, req.query.menuitem);
  }
};
