"use strict";

var request = require('request');
var env = require('node-env-file');
// env('../../config/.env');
console.log(env('config/.env'));

function takeThemSpacesOut(theString) {
  var anArray = theString.split(" ");
  var newString = anArray.join("+");
  console.log(newString);
  return newString;
};

exports.apiController = {
  // GET /api/search?name=X
  restaurantSearch: function(req, res) {
    console.log(req.query)
    var rawName = req.query.name;
    console.log("raw name", rawName);
    var name = takeThemSpacesOut(rawName);
    console.log("name", name)
    var location = req.query.location;
    var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + name + "+" + location + "&types=food&key=" + process.env.GOOGLE_BROWSER_API_KEY;

    request(url, function (error, response, body) {
      console.log("Got here.")
      if (!error && response.statusCode == 200) {
        var bodyParsed = JSON.parse(body);
        var resultsUnformatted = bodyParsed.results;
        var results = []

        for (i = 0; i < resultsUnformatted.length; i++) {
          result = {}
          result["address"] = resultsUnformatted[i]["formatted_address"];
          result["name"] = resultsUnformatted[i]["name"];
          results.push(result);
        }

        console.log(results);
        // res.render(body.results);
        return res.status(200).json(results);
      }
    });
  }
};
