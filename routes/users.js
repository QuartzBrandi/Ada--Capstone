var express = require('express');
var router = express.Router();

var api = require('../app/controllers/users');

router.post('/login', function(req, res, next) {
  return api.userController.login(req, res);
});

module.exports = router;
