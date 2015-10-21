"use strict";

// For HTTP requests.
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

function createAddressObject(addressString) {
  // TODO: Doing a lot of assuming in this function!
  // Come back and write some checks/validations.
  var addressArray     = addressString.split(',');
  var stateAndZipArray = addressArray[addressArray.length-2].trim().split(' ');

  var addressObject = {};

  addressObject['country']        = addressArray[addressArray.length-1].trim();
  addressObject['state']          = stateAndZipArray[0];
  addressObject['zip_code']       = stateAndZipArray[1];
  addressObject['city']           = addressArray[addressArray.length-3].trim();
  addressObject['street_address'] = addressArray.slice(0, addressArray.length-3)
                                    .join(',');

  return addressObject;
  // callback(addressObject);
};

function findMenu(restaurant, callback) {
  console.log("findmenu");
  var url = "https://api.locu.com/v2/venue/search/";
  // TODO: Make this query a bit more specific.
  var bodyQuery = {
      "api_key": process.env.LOCU_API_KEY,
      "fields": [
        "name",
        "location",
        "menus"
      ],
      "venue_queries": [
        {
          "name": restaurant.name,
          "location": {
            "locality": restaurant.address.city
          },
          "menus": { "$present": true }
        }
      ]
    };

  request.post({url: url, body: JSON.stringify(bodyQuery)}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var bodyParsed = JSON.parse(body);
      console.log("body", bodyParsed.venues);
      if (bodyParsed.venues.length > 0) {
        var venues = bodyParsed.venues;
        var venue = venues[0];

        // TODO: Put a 'loading' animation via html/javascript/css.
        // TODO: Make this recurisve?
        // OMG This is possibly the most repeative thing I've written so far.
        for (var m = 0; m < venue.menus.length; m++) {
          var menu = venue.menus[m];
          var menuObject = {};
          menuObject['menu_name'] = menu.menu_name;
          menuObject['sections'] = [];
          for (var s = 0; s < menu.sections.length; s++) {
            var section = menu.sections[s];
            var sectionObject = {};
            sectionObject['section_name'] = section.section_name;
            sectionObject['subsections'] = [];
            for (var ss = 0; ss < section.subsections.length; ss++) {
              var subsection = section.subsections[ss];
              var subsectionObject = {};
              subsectionObject['subsection_name'] = subsection.subsection_name;
              subsectionObject['items'] = [];
              for (var c = 0; c < subsection.contents.length; c++) {
                var item = subsection.contents[c];
                if (item.name) {
                  var itemObject = {};
                  itemObject['item'] = item.name;
                  subsectionObject.items.push(itemObject);
                }
              }
              sectionObject.subsections.push(subsectionObject);
            }
            menuObject.sections.push(sectionObject);
          }
          restaurant.menus.push(menuObject);
        }

        restaurant['menu_origin'] = "LOCU";
        restaurant.save(function(err) {
          callback(restaurant);
        });
      } else {
        // TODO: Raise and error or something.
        // no menu for that restaurant
        restaurant.save(function(err) {
          callback(restaurant);
        });
      }
    }
  });
}

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
    var selectedRestaurant = req.query;
    var name    = selectedRestaurant.name;
    var address = createAddressObject(selectedRestaurant.address);

    mongoose.connect('mongodb://localhost/visualmenu');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
      Restaurant.findOne(
        {
          'name': name,
          'address.city': address.city
        },
        function(err, restaurant) {
          if (!restaurant) {
            // create new restaurant & return restaurant
            var new_restaurant = new Restaurant;
            new_restaurant.name    = name;
            new_restaurant.address = address;
            findMenu(new_restaurant, function(restaurant) {
              db.close();
              return res.status(200).json(restaurant);
            });
          }
          else {
            // return restaurant in database
            db.close();
            return res.status(200).json(restaurant);
          }
        }
      );
    });
  },

  // GET /api/restaurants/menu?name=xxx&address=xxx
  menu: function(req, res) {
    var name = req.query.name;
    var address = req.query.address;
    var url = "https://api.locu.com/v2/venue/search/"
      // "https://api.locu.com/v2/venue/search/" +
      // "?name=" + name +
      // "&locality=" + address.city +
      // "&api_key=" + process.env.LOCU_API_KEY;
    var body = {
        "api_key": process.env.LOCU_API_KEY,
        "fields": [
          "name",
          "location",
          "menus"
        ],
        "venue_queries": [
          {
            "name": name,
            "location": {
              "locality": address.city,
              "postal_code": address.zip_code
            }
          }
        ]
      }

    // request.post({url: url, body: body}, function (error, response, body) {
    request.post(url, function (error, response, body) {
      console.log("1");
      if (!error && response.statusCode == 200) {
        console.log("2");
        // var bodyParsed = JSON.parse(body);
        // var resultsUnformatted = bodyParsed.results;
        // var results = [];
        //
        // for (var i = 0; i < resultsUnformatted.length; i++) {
        //   var result = {};
        //   result["name"] = resultsUnformatted[i]["name"];
        //   result["address"] = resultsUnformatted[i]["formatted_address"];
        //   results.push(result);
        // }

        return res.status(200).json({"done":"done"});
      }
      console.log("3");
    });
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
