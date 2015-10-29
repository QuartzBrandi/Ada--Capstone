var express = require('express');
var router = express.Router();

// TODO: Is there a better way to do this?
// (Get a string of the project root directory.)
var root_dir = require('../root_dir.js');

//
// var multer = require('multer');
// var upload = multer({ dest: './public/images/uploads'});
//
// router.post('/uploads', upload.single('file'), function(req,res,next){
//   console.log("Server: got file ");
//   return res.json({ a: 1 });
// });


// var multer = require('multer');
// var mime = require('mime');
//
// // TODO: Whitelist certain extensions (jpg, png).
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/images/uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))
//   }
// });
//
// var upload = multer({ storage: storage }).single('file');
// if (process.env.NODE_ENV != "production") {
  var env = require('node-env-file');
  env('./.env');
// }

var multer = require('multer');
var mime = require('mime');
var s3 = require('multer-s3');

// if (process.env.NODE_ENV != "production") {
var accessKeyId = process.env.AWS_ACCESS_KEY;
var secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  var upload = multer({
    storage: s3({
      dirname: 'photos/uploads',
      bucket: 'ada-capstone-menu-photos',
      secretAccessKey: "" + secretAccessKey,
      accessKeyId: "" + accessKeyId,
      region: 'us-west-2',
      filename: function (req, file, cb) {
        console.log("GOT HERE1")

        cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))
      }
    })
  }).single('file');

  // console.log("GOT HERE2")
// } else {
//   // TODO: Whitelist certain extensions (jpg, png).
//   var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/images/uploads/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))
//     }
//   });
//
//   var upload = multer({ storage: storage });
// }

// var upload = multer({ storage: storage });

router.post('/api/photo', function (req, res, next) {
  console.log("THANG", typeof(accessKeyId))
  console.log("THNT", accessKeyId)

  // console.log("THIS IS IT", req);

  // upload.single('file')

  console.log("GOT HERE 4")
  // console.log('req', req)


// console.log("got here 4.5")
//
  console.log("req", req.file)
//
//   return res.json(req.file);

  upload(req, res, function (err) {
    console.log("GOT HERE 5")
    if (err) {
      // an error occurred when uploading
      console.log("ERROR", err)
      console.log("ERROR")
      return
    } else {

    // console.log("req", req)
    // console.log("res", res)
    console.log("NO ERROR")
    // console.log("the thing", req.file.filename)
    return res.json(req.file);
    // Everything went fine
    }
  })
})

// var multer = require('multer');
// var mime = require('mime');
//
// // TODO: Whitelist certain extensions (jpg, png).
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/images/uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))
//   }
// });
//
// var upload = multer({ storage: storage }).single('photoupload');
//
// router.post('/api/photo', function (req, res) {
//   console.log("THIS IS IT", req);
//   upload(req, res, function (err) {
//     if (err) {
//       // an error occurred when uploading
//       console.log("ERROR", err)
//       // console.log("req", req)
//       return
//     } else {
//
//     console.log("req", req)
//     // console.log("res", res)
//     console.log("NO ERROR")
//     return res.json({ a: 1 });
//     // Everything went fine
//     }
//   })
// })

// single page app
// note-to-self: angular will add /#/ for its routes
router.get('/', function(req, res, next) {
  res.sendFile(root_dir.root + '/public/index.html');
});

module.exports = router;
