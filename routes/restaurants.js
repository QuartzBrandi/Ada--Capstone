var express = require('express');
var router = express.Router();

var api = require('../app/controllers/restaurants');

// search for restaurant (query "name" & "location")
// queries the Google API
// returns an array of objects (containing the name & address of the restaurant)
router.get('/search', function(req, res, next) {
  return api.restaurantController.search(req, res);
});

// select a specific restaurant
// queries database
// returns an object (of the restaurant)
router.get('/select', function(req, res, next) {
  return api.restaurantController.select(req, res);
});

router.get('/menu/update', function(req, res, next) {
  return api.restaurantController.menu(req, res);
});

router.get('/menuitem', function(req, res, next) {
  return api.restaurantController.menuitems(req, res);
})

// search for images (query "name" & "location")
// queries database & Google API(?)
// returns...
router.get('/menu/images', function(req, res, next) {
  return api.restaurantController.imageSearch(req, res);
});

// search for menu
// queries...
// returns an array of objects (containing menu items: name, url)
router.get('/menu', function(req, res, next) {
  return api.restaurantController.menu(req, res);
});

router.post('/menu/images', function(req, res, next) {
  console.log("READ", req)
  return api.restaurantController.associateImage(req, res);
});

module.exports = router;
