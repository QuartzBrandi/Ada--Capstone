"use strict";

// For simple HTTP requests.
var request = require('request');

// For environment files.
if (process.env.NODE_ENV != "production") {
  var env = require('node-env-file');
  env('./.env');
}
// For environemnt variables/constants. TODO: Figure out how to actually do this.
// var config = require('../../config');

// To use MongoDB.
var database = require('../../paths_config.js');
var databaseLocation = process.env.NODE_ENV == "production" ? database.production.database : database.development.database;

var mongoose = require('mongoose');
var User = require('../models/user');

function connectToMongoDB(callMeBack) {
  mongoose.connect(databaseLocation);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection Error:'));
  db.once('open', function (callback) {
    callMeBack(db);
  });
}

function checkUser(res, google_id) {
  // var environment = process.env.NODE_ENV == "production" ? config.production : config.development;
  // mongoose.connect(environment.database);
  mongoose.connect(databaseLocation);
  var db = mongoose.connection;
  console.log(google_id);
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function (callback) {
    User.findOne({ google_id: google_id }, function(err, user) {

      if (!user) {
        var newUser = new User;
        newUser.google_id = google_id;
        newUser.save(function(err) {
          db.close();
          console.log("User not in database.");
          console.log(newUser);
          return res.status(200).json(newUser);
        });
      }

      else {
        db.close();
        console.log('User in database.');
        console.log(user);
        return res.status(200).json(user);
      }
    });
  });
}

exports.userController = {
  login: function(req, res) {
    // checks validity of google id_token
    var id_token = req.query.id_token;
    // var email = req.query.email;
    var url = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + id_token;
    request(url, function (error, response, body) {
      var jsonBody = JSON.parse(body);
      console.log(jsonBody);
      // returns a 200 status code if valid
      // checks to make sure the client id matches
      if (response.statusCode == 200 && process.env.GOOGLE_OAUTH_CLIENT_ID == jsonBody.aud) {
        checkUser(res, jsonBody.sub);
      } else {
        console.log("ERROR");
      }
    });
  },

  update: function(req, res) {
    var theUser = req.body;
    connectToMongoDB(function(db) {
      User.findOne({ google_id: theUser.google_id }, function(err, user) {

        if (!user) {
          // TODO: Some kind of error handling.
          // WHY/HOW ARE YOU HERE?
          db.close();
          return res.status(200).json({"nope": "nope"});
        }

        else {
          user.username = theUser.username;
          user.save(function(err) {
            console.log(user.username + " updated.");
            db.close();
            return res.status(200).json(user);
          });
        }
      });
    });
  },

  user: function(req, res) {
    // fetch the restaurant from mongodb
    // create the restaurant if it's not in the db
    var the_restaurant = req.query;
    delete the_restaurant['$$hashKey'];
    console.log("1", the_restaurant);

    mongoose.connect(databaseLocation);
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
  }
};
