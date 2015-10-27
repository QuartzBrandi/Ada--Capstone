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
var database = require('../../database_config.js');
var databaseLocation = process.env.NODE_ENV == "production" ? database.production.database : database.development.database;

var mongoose = require('mongoose');
var User = require('../models/user');


function checkUser(res, id_token, email) {
  // var environment = process.env.NODE_ENV == "production" ? config.production : config.development;
  // mongoose.connect(environment.database);
  mongoose.connect(databaseLocation);
  var db = mongoose.connection;
  console.log(id_token);
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function (callback) {
    User.findOne({ email: email }, function(err, user) {
      var new_user = new User;
      // new_user.google_id_token = id_token;
      new_user.email = email;
      // TODO: hella unsecure, need to figure out how to make more secure

      if (!user) {
        new_user.save(function(err) {
          db.close();
          console.log("User not in database.");
          console.log(new_user);
          console.log(new_user.email)
          return res.status(200).json(new_user);
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
    var email = req.query.email;
    var url = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + id_token;
    request(url, function (error, response, body) {
      var jsonBody = JSON.parse(body);
      // returns a 200 status code if valid
      // checks to make sure the client id matches
      if (response.statusCode == 200 && process.env.GOOGLE_OAUTH_CLIENT_ID == jsonBody.aud) {
        checkUser(res, id_token, email);
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
  },
};
