"use strict";

var request = require('request');
var env = require('node-env-file');
env('config/.env');

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
    console.log("ARE YOU WORKING?")
    // console.log("req ", req);
    // console.log("res ", res);

    return res.status(200).json({"name": "yo", "address": "111"});
  },

  // GET /api/menu?restaurant=xxx

  // GET /api/images?restaurant=xxx&menuitem=xxx
  imageSearch: function(req, res) {
    console.log('got here')
    console.log(req)
    googleImage(req.query.restaurant, req.query.menuitem);
  }
};
