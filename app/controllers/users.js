"use strict";

// Simple HTTP requests.
var request = require('request');

// For environment files.
var env = require('node-env-file');
env('config/.env');

// To use MongoDB.
var mongoose = require('mongoose');
var User = require('../models/user');

var config = require('../../config');

// function checkUser(id_token) {
//   var environment = process.env.NODE_ENV == "production" ? config.production : config.development;
//   mongoose.connect(environment.database);
//   var db = mongoose.connection;
//   console.log(id_token);
//   db.on('error', console.error.bind(console, 'connection error:'));
//   db.once('open', function (callback) {
//     User.findOne({ google_id_token: id_token }, function(err, user) {
//       var new_user = new User;
//       new_user.google_id_token = id_token;
//
//       if (!user) {
//         new_user.save(function(err) {
//           db.close();
//           console.log("User not in database.");
//           return response.status(200).json({"IT WORKED": "1"});
//         });
//       }
//       else {
//         db.close();
//         console.log('User in database.');
//         return response.status(200).json({"IT WORKED": "2"});
//       }
//     });
//   });
// }

exports.userController = {
  login: function(req, res) {

    console.log("req:)", req)
    // checks validity of google id_token
    console.log("the controller")
    var id_token = req.body.idtoken;
    var url = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + id_token;
    request(url, function (error, response, body) {
      var jsonBody = JSON.parse(body);
      // returns a 200 status code if valid
      // checks to make sure the client id matches
      if (response.statusCode == 200 && process.env.GOOGLE_OAUTH_CLIENT_ID == jsonBody.aud) {
        // checkUser(id_token, response);
        var environment = process.env.NODE_ENV == "production" ? config.production : config.development;
        mongoose.connect(environment.database);
        var db = mongoose.connection;
        console.log(id_token);
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function (callback) {
          User.findOne({ google_id_token: id_token }, function(err, user) {
            var new_user = new User;
            new_user.google_id_token = id_token;

            if (!user) {
              new_user.save(function(err) {
                db.close();
                console.log("User not in database.");
                return res.status(200).json({"IT WORKED": "1"});
              });
            }
            else {
              db.close();
              console.log('User in database.');
              return res.status(200).json({"IT WORKED": "2"});
            }
          });
        });

      } else {
        console.log("ERROR");
      }
    });
  },

  user: function(req, res) {
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
};