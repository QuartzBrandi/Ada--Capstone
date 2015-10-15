var express = require('express');
var router = express.Router();
var api = require('../app/controllers/api');

// TODO: Is there a better way to do this?
// (Get a string from the root directory.)
var root_dir = require('../root_dir.js');

// single page app (angular will change things on the front-end)
router.get('/', function(req, res, next) {
  res.sendFile(root_dir.root + '/public/index.html');
});

// search for restaurant (query "name" & "location")
router.get('/api/search', function(req, res, next) {
  return api.apiController.restaurantSearch(req, res);
});

// search for restaurant (query "name" & "location")
router.get('/api/images', function(req, res, next) {
  return api.apiController.imageSearch(req, res);
});

// redirects if user tries to go anywhere else
router.get('*', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
