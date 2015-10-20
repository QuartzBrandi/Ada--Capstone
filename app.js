var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./config/db');
var Restaurant = require('./app/models/restaurant');
var User = require('./app/models/user');

var routes = require('./routes/index');
var restaurants = require('./routes/restaurants');
var users = require('./routes/users');

var multer = require('multer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public/images/uploads'));

// var upload = multer({ dest: './public/images/uploads/'}).single('photoupload')

var mime = require('mime');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))
  }
});

var upload = multer({ storage: storage }).single('photoupload');

app.post('/api/photo', function (req, res) {
  console.log("THIS IS IT", req);
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      console.log("ERROR", err)
      console.log("req", req)
      return
    } else {

    console.log("req", req)
    console.log("res", res)
    console.log("NO ERROR")
    return res.json({ a: 1 });
    // Everything went fine
    }
  })
})

// app.use(multer({ dest: './public/images/uploads/',
//     rename: function (fieldname, filename) {
//         return filename+Date.now();
//     },
//     onFileUploadStart: function (file) {
//         console.log(file.originalname + ' is starting ...');
//     },
//     onFileUploadComplete: function (file) {
//         console.log(file.fieldname + ' uploaded to  ' + file.path)
//     }
// }).single('photo'));

app.use('/', routes);
app.use('/api/restaurants', restaurants);
app.use('/api/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
