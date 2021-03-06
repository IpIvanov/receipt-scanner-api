var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'receipt-scanner-api'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://receipt-user:receipt-user3@ds159112.mlab.com:59112/heroku_lmg4nh8l'
  },

  test: {
    root: rootPath,
    app: {
      name: 'receipt-scanner-api'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://receipt-user:receipt-user3@ds159112.mlab.com:59112/heroku_lmg4nh8l'
  },

  production: {
    root: rootPath,
    app: {
      name: 'receipt-scanner-api'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://receipt-user:receipt-user3@ds159112.mlab.com:59112/heroku_lmg4nh8l'
  }
};

module.exports = config[env];
