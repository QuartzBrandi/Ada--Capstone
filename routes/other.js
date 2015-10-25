var express = require('express');
var router = express.Router();

// redirects if user tries to go anywhere else
router.get('*', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
