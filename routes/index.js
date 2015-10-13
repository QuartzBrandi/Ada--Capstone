var express = require('express');
var router = express.Router();

var root_dir = require('../root_dir.js');

var request = require('request');
var env = require('node-env-file');
env('./config/.env');

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res) {
  res.sendFile(root_dir.root + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

router.get('*', function(req, res) {
  res.redirect('/');
});

module.exports = router;
