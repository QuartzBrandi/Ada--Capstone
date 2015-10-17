"use strict";

// Simple HTTP requests.
var request = require('request');

// For environment files.
var env = require('node-env-file');
env('config/.env');

// To help use MongoDB.
var mongoose = require('mongoose');
var Restaurant = require('../models/restaurant');

// Used for Google API calls.
function replaceSpacesWithPlusSign(theString) {
  var anArray = theString.split(" ");
  var newString = anArray.join("+");
  return newString;
};

exports.restaurantController = {
  // GET /api/restaurants/search?name=xxx&location=xxx
  // TODO: Should add own authentication so it's a private API.
  search: function(req, res) {
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

  // GET /api/restaurants/select (also send query params for the restaurant object)
  select: function(req, res) {
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
          return res.status(200).json(restaurant);
        }
      });
    });
  },

  // GET /api/restaurants/menu?name=xxx
  menu: function(req, res) {
    console.log("GOT HERE");
  },

  // GET /api/restaurants/menu/images?restaurant=xxx&menuitem=xxx
  imageSearch: function(req, res) {
    var url =
      "https://www.googleapis.com/customsearch/v1?q=";
    console.log('got here')
    console.log(req)
    googleImage(req.query.restaurant, req.query.menuitem);
  }
};
