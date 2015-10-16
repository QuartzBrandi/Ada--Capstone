var express = require('express');
var router = express.Router();

// TODO: Is there a better way to do this?
  // (Get a string of the project root directory.)
var root_dir = require('../root_dir.js');

// single page app
// (self note: angular will change things on the front-end)
router.get('/', function(req, res, next) {
  res.sendFile(root_dir.root + '/public/index.html');
});

module.exports = router;
