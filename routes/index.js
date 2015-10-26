var express = require('express');
var router = express.Router();

// TODO: Is there a better way to do this?
// (Get a string of the project root directory.)
var root_dir = require('../root_dir.js');

var multer = require('multer');
var mime = require('mime');

// TODO: Whitelist certain extensions (jpg, png).
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))
  }
});

var upload = multer({ storage: storage }).single('photoupload');

router.post('/api/photo', function (req, res) {
  console.log("THIS IS IT", req);
  upload(req, res, function (err) {
    if (err) {
      // an error occurred when uploading
      console.log("ERROR", err)
      // console.log("req", req)
      return
    } else {

    console.log("req", req)
    // console.log("res", res)
    console.log("NO ERROR")
    return res.json({ a: 1 });
    // Everything went fine
    }
  })
})

// single page app
// note-to-self: angular will add /#/ for its routes
router.get('/', function(req, res, next) {
  res.sendFile(root_dir.root + '/public/index.html');
});

module.exports = router;
