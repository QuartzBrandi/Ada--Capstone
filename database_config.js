// For environment files.
if (process.env.NODE_ENV != "production") {
  var env = require('node-env-file');
  env('./.env');
}

module.exports = {
  development: {
    // database: "mongodb://localhost/visualmenu"
    database: "mongodb://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASS + "@ds045644.mongolab.com:45644/capstone-project"
  },
  production: {
    database: "mongodb://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASS + "@ds045644.mongolab.com:45644/capstone-project"
  }
}
