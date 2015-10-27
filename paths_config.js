// For environment files.
if (process.env.NODE_ENV != "production") {
  var env = require('node-env-file');
  env('./.env');
}

module.exports = {
  development: {
    database: "mongodb://localhost/visualmenu",
    // website: "http://ada-capstone-production.elasticbeanstalk.com/"
    website: "http://www.picto-menu.com/"
  },
  production: {
    database: "mongodb://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASS + "@ds045644.mongolab.com:45644/capstone-project",
    website: "http://localhost:3000/"
  }
}
